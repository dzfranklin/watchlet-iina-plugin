#!/usr/bin/env bash
set -euo pipefail

# Script configuration
SCRIPT_NAME=$(basename "$0")
VERSION=""
UNDO_MODE=false
HELP_MODE=false

# Help function
show_help() {
    cat << EOF
Usage: $SCRIPT_NAME [VERSION]
       $SCRIPT_NAME --undo
       $SCRIPT_NAME --help

Create a new release with version bumping, building, and tagging.

ARGUMENTS:
    VERSION                 Version number in semver format (e.g., 1.2.3)

OPTIONS:
    -u, --undo             Undo the latest release commit if not pushed
    -h, --help             Show this help message

EOF
}

# Undo release function
undo_release() {
    echo "Undoing latest release commit..."

    # Get the latest commit message
    LATEST_COMMIT_MSG=$(git log -1 --pretty=format:"%s")

    # Check if it's a release commit
    if [[ ! "$LATEST_COMMIT_MSG" =~ ^Release\ v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
        echo "Error: Latest commit is not a release commit"
        exit 1
    fi

    # Extract version from commit message
    RELEASE_VERSION=${LATEST_COMMIT_MSG#"Release v"}

    # Check if the commit has been pushed
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse origin/main 2>/dev/null || echo "")

    if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
        echo "Error: Release commit has already been pushed to remote. Cannot undo."
        exit 1
    fi

    echo "Removing tag v$RELEASE_VERSION..."
    git tag -d "v$RELEASE_VERSION" 2>/dev/null || echo "Tag v$RELEASE_VERSION not found"

    echo "Resetting to previous commit..."
    git reset --hard HEAD~1

    echo "Checking out develop branch..."
    git checkout develop

    echo "Release v$RELEASE_VERSION has been undone successfully!"
    exit 0
}

# Parse arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -u|--undo)
            UNDO_MODE=true
            shift
            ;;
        -h|--help)
            HELP_MODE=true
            shift
            ;;
        -*)
            echo "Error: Unknown option $1"
            echo "Use --help for usage information."
            exit 1
            ;;
        *)
            if [ -z "$VERSION" ]; then
                VERSION="$1"
            else
                echo "Error: Too many arguments. Only one version number expected."
                echo "Use --help for usage information."
                exit 1
            fi
            shift
            ;;
    esac
done

# Handle modes
if [ "$HELP_MODE" = true ]; then
    show_help
    exit 0
fi

if [ "$UNDO_MODE" = true ]; then
    if [ -n "$VERSION" ]; then
        echo "Error: Cannot specify version when using --undo"
        exit 1
    fi
    undo_release
fi

# Validate version argument
if [ -z "$VERSION" ]; then
    echo "Error: Version number is required"
    echo "Use --help for usage information."
    exit 1
fi

if ! [[ "$VERSION" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    echo "Error: Version must be in format major.minor.patch (e.g., 1.2.3)"
    exit 1
fi

printf "\n--- Validating... ---\n\n"

echo "Checking current branch is develop..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "develop" ]; then
    echo "Error: Must be on develop branch. Currently on: $CURRENT_BRANCH"
    exit 1
fi

echo "Checking git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "Error: Git working directory is not clean. Please commit or stash your changes."
    exit 1
fi

PACKAGE_VERSION=$(node -p "require('./package.json').version")
INFO_VERSION=$(node -p "require('./Info.json').version")

if [ "$PACKAGE_VERSION" != "$INFO_VERSION" ]; then
    echo "Error: package.json version ($PACKAGE_VERSION) does not match Info.json version ($INFO_VERSION)"
    exit 1
fi

CURRENT_VERSION="$PACKAGE_VERSION"

echo "Validating version is greater than current..."
node -e "
function parseVersion(version) {
    const parts = version.split('.');
    if (parts.length !== 3) {
        throw new Error(\`Invalid version format: \${version}. Expected major.minor.patch\`);
    }

    const numbers = parts.map(Number);
    if (numbers.some(isNaN)) {
        throw new Error(\`Version components must be numbers: \${version}\`);
    }

    return numbers;
}

function isVersionGreater(newVer, currentVer) {
    for (let i = 0; i < 3; i++) {
        if (newVer[i] > currentVer[i]) return true;
        if (newVer[i] < currentVer[i]) return false;
    }
    return false;
}

try {
    const current = parseVersion('$CURRENT_VERSION');
    const newVersion = parseVersion('$VERSION');

    if (!isVersionGreater(newVersion, current)) {
        console.error('Error: New version ($VERSION) must be greater than current version ($CURRENT_VERSION)');
        process.exit(1);
    }
} catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
}
"

echo "Validating Info.json ghRepo and ghVersion..."
node -e "
const info = require('./Info.json');

if (typeof info.ghRepo !== 'string' || info.ghRepo.trim() === '') {
    console.error('Error: Info.json ghRepo must be a non-empty string');
    process.exit(1);
}

if (typeof info.ghVersion !== 'number' || !Number.isInteger(info.ghVersion)) {
    console.error('Error: Info.json ghVersion must be an integer');
    process.exit(1);
}
"

printf "\n--- Creating release... ---\n\n"

echo "Switching to main branch..."
git checkout main

echo "Starting merge with develop..."
git merge develop --no-ff --no-commit

echo "Updating package.json..."
node -e "
const pkg = require('./package.json');
pkg.version = '$VERSION';
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2) + '\n');
"
npx prettier --write package.json
git add package.json

echo "Updating Info.json..."
node -e "
const info = require('./Info.json');
info.version = '$VERSION';
info.ghVersion++;
require('fs').writeFileSync('./Info.json', JSON.stringify(info, null, 2) + '\n');
"
npx prettier --write Info.json
git add Info.json

echo "Building..."
npm ci
npm run build
git add -f dist/

if git status --porcelain | grep -q -v '^[MARC]'; then
    echo "Error: There are unstaged changes. This is probably a BUG in release.sh."
    git status --porcelain
    exit 1
fi

echo "Completing merge commit..."
git commit -m "Release v$VERSION"

echo "Creating tag..."
git tag "v$VERSION"

echo ""
echo "Release v$VERSION created successfully!"
echo "To publish, run: git push --follow-tags"
