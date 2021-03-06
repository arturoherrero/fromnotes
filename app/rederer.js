/* eslint-disable no-undef */
const textarea = document.querySelector("#textarea")

textarea.innerHTML = window.fileSystem.readFile()

textarea.addEventListener("keyup", (event) => {
  window.fileSystem.writeFile(event.target.innerHTML)
})
