const { app, BrowserWindow } = require("electron")

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 610,
    titleBarStyle: "hidden",
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile(`${__dirname}/index.html`)
}

app.whenReady().then(createWindow)
