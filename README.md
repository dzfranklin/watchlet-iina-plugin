# watchlet

A plugin for the IINA video player that manages episode progress metadata.

## Development

### Setup

```bash
npm install
npm run build

ln -s /Applications/IINA.app/Contents/MacOS/iina-plugin /usr/local/bin/iina-plugin
iina-plugin link .
```

Open IINA, go to Settings > Plugins, enable "Watchlet".
