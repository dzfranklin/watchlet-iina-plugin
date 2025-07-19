#!/bin/bash
set -euo pipefail

# Bash script used in claude post-change hooks
# Runs after Write, Edit, MultiEdit, or Bash operations
# If successful: Output only "All checks passed" to stdout.
# If unsuccessful: Output concise relevant info to stderr and exit with status 2.

# Function to run command and handle errors
run_cmd() {
    local cmd="$1"
    local max_lines="${2:-10}"
    local output
    local line_count

    if ! output=$(eval "$cmd" 2>&1); then
        echo "FAILURE: $cmd" >&2

        # Count lines and truncate if more than max_lines
        line_count=$(echo "$output" | wc -l)
        if [[ $line_count -gt $max_lines ]]; then
            echo "$output" | head -"$max_lines" >&2 || true
            echo "... (output truncated, $line_count total lines)" >&2
        else
            echo "$output" >&2
        fi

        exit 2
    fi
}

run_cmd "npx tsc"

run_cmd "npx eslint --fix ."

run_cmd "npx prettier --write ."

run_cmd "npm run build"

echo "All checks passed"
