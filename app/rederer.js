/* eslint-disable no-undef */
const textarea = document.querySelector("textarea")

textarea.value = window.fileSystem.readFile()

textarea.addEventListener("keyup", (event) => {
  window.fileSystem.writeFile(event.target.value)
})
