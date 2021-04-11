const { app, BrowserWindow, Menu } = require("electron")

try {
  require("electron-reloader")(module)
} catch {} // eslint-disable-line no-empty

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: `${__dirname}/preload.js`
    }
  })

  mainWindow.loadFile(`${__dirname}/index.html`)
}

const setMenu = () => {
  const menu = Menu.getApplicationMenu()
  menu.items.find(item => item.role === "filemenu").visible = false
  menu.items.find(item => item.role === "help").visible = false
  Menu.setApplicationMenu(menu)
}

app.setName("FromNotes")
app.whenReady()
  .then(createWindow)
  .then(setMenu)
