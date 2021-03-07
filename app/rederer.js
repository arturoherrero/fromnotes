/* eslint-disable no-undef */
const textarea = document.querySelector("#textarea")

textarea.value = window.fileSystem.readFile()

const insertTab = () => {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd

  textarea.value = `${textarea.value.substring(0, start)}\t${textarea.value.substring(end)}`
  textarea.selectionStart = textarea.selectionEnd = start + 1
}

textarea.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    insertTab()
  }
})

textarea.addEventListener("keyup", (event) => {
  window.fileSystem.writeFile(event.target.value)
})
