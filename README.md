# Fastcup Desktop

A lightweight Windows desktop application that opens [CS2 Fastcup](https://cs2.fastcup.net/) in its own Electron window.

## Run locally

Requires Node.js 22 or newer.

```bash
npm install
npm start
```

## Build the Windows installer

On Windows:

```bash
npm install
npm run dist
```

The NSIS installer is created in `release/`. It creates Start Menu and Desktop shortcuts and lets the user choose the installation directory.

This is an unofficial third-party desktop wrapper and is not affiliated with or endorsed by Fastcup. The app loads the live website and requires an internet connection.
