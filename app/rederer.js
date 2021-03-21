/* eslint-disable no-undef */
const textarea = document.querySelector("#textarea")

textarea.value = window.fileSystem.readFile()
textarea.setSelectionRange(0, 0)

const tabAction = () => {
  document.execCommand("insertText", false, "\t")
}

const enterAction = () => {
  const indentation_for = (line) => {
    if (line.length === 0) return ""

    const matchBulletOrTab = line.match(/^(\t*-\s|\t+).*/)

    if (matchBulletOrTab === null || matchBulletOrTab[0] === matchBulletOrTab[1]) {
      return ""
    } else {
      return matchBulletOrTab[1]
    }
  }

  event.preventDefault()
  const currentLineUntilCursor = textarea.value.substring(0, textarea.selectionStart).split("\n").slice(-1)[0]

  document.execCommand("insertText", false, `\n${indentation_for(currentLineUntilCursor)}`)
}

textarea.addEventListener("keydown", (event) => {
  // ⇥ Tab
  if (event.key === "Tab") { tabAction() }

  // ↵ Enter
  if (event.key === "Enter") { enterAction() }
})

textarea.addEventListener("keyup", (event) => {
  window.fileSystem.writeFile(event.target.value)
})
