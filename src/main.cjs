const { app, BrowserWindow, shell, session } = require("electron");
const path = require("node:path");

const FASTCUP_URL = "https://cs2.fastcup.net/";

function createWindow() {
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 900,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    title: "Fastcup",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      partition: "persist:fastcup"
    }
  });

  win.once("ready-to-show", () => win.show());
  win.loadURL(FASTCUP_URL);

  // Keep the website's own navigation and authentication flows inside the app.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https://") || url.startsWith("http://")) {
      return { action: "allow" };
    }
    shell.openExternal(url);
    return { action: "deny" };
  });

  win.webContents.on("will-navigate", (event, url) => {
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      event.preventDefault();
      shell.openExternal(url);
    }
  });

  return win;
}

app.whenReady().then(() => {
  app.setAppUserModelId("net.fastcup.desktop");

  // Open non-web protocols (for example, external application links) in Windows.
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    const allowed = new Set(["notifications", "media", "fullscreen"]);
    callback(allowed.has(permission));
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
