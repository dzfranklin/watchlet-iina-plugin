# IINA Plugin Development Guide

## Project Overview
This is an IINA plugin called "Watchlet" built with TypeScript, React, and Parcel bundler.

## TypeScript Configuration
- TypeScript types for IINA's API are available at `node_modules/iina-plugin-definition/iina/index.d.ts`
- Current `tsconfig.json` configured for ES6 with no emit (Parcel handles compilation)
- TypeRoots include both `@types` and `iina-plugin-definition`

## IINA API Summary
The IINA plugin API (`iina-plugin-definition/iina/index.d.ts`) provides comprehensive TypeScript definitions for:

### Core APIs
- **Core**: Video playback control, window management, status monitoring
- **Event**: Event system for window, file, and playback events
- **Console**: Logging functionality (`log`, `warn`, `error`)
- **Menu**: Dynamic menu item creation and management
- **Utils**: File system utilities, external process execution, user dialogs

### UI Components
- **StandaloneWindow**: Independent plugin windows with React apps
- **Overlay**: Video overlay interface for on-screen displays  
- **SidebarView**: Sidebar integration within IINA's main window

### Media & Playback
- **Audio/Video/Subtitle**: Track management and playback control
- **Playlist**: Playlist manipulation and navigation
- **MPV**: Direct access to underlying MPV player properties

### System Integration
- **HTTP**: Network requests with promise-based API
- **File**: File system operations (read/write/list)
- **Preferences**: Plugin settings persistence
- **Global**: Multi-instance player management

## Development Requirements

### Permissions
Plugins must declare permissions in `Info.json`:
- `show-osd` - Display on-screen overlays
- `network-request` - HTTP requests
- `file-system` - File operations
- `video-overlay` - Video overlay access

### Module System
- No browser globals (`window`, `localStorage`)
- Custom timer functions: `setTimeout`, `setInterval` with string IDs

### Build Process
- Parcel bundler handles TypeScript compilation
- Multiple build targets: window, overlay, sidebar, global, entry
- ES6 target for compatibility with IINA's JavaScriptCore engine

## Development Workflow
1. Use TypeScript for type safety
2. Leverage React for UI components
3. Test using IINA's debugging tools:
   - Symlink plugin for development
   - Log Viewer for console output
   - Safari Web Inspector for UI debugging

## Project Structure
```
src/
  index.js     - Main plugin entry point
  global.js    - Global script
ui/
  window/      - Standalone window UI
  overlay/     - Video overlay UI  
  sidebar/     - Sidebar UI
  shared.scss  - Shared styles
```

## Key Considerations
- No standard web APIs - use IINA's custom alternatives
- Development benefits from TypeScript's IINA API definitions
