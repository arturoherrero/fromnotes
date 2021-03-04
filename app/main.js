const { app, BrowserWindow } = require("electron")

try {
  require("electron-reloader")(module)
} catch {} // eslint-disable-line no-empty

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 610,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  })

  mainWindow.loadFile(`${__dirname}/index.html`)
}

app.whenReady().then(createWindow)
