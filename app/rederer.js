const { readFile, writeFile } = require("./filesystem")

const textarea = document.querySelector("textarea") // eslint-disable-line no-undef

textarea.value = readFile()

textarea.addEventListener("keyup", (event) => {
  writeFile(event.target.value)
})
