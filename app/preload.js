const { contextBridge } = require("electron")
const { readFileSync, writeFile } = require("fs")
const FILENAME = `${require("os").homedir()}/.fromnotes`

contextBridge.exposeInMainWorld("fileSystem", {
  readFile: () => readFileSync(FILENAME, "utf-8"),
  writeFile: (content) => writeFile(FILENAME, content, "utf-8", () => {})
})
