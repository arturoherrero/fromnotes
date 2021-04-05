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

    const matchTab = line.match(/^(\t+).*/)

    if (matchTab === null || matchTab[0] === matchTab[1]) {
      return ""
    } else {
      return matchTab[1]
    }
  }

  event.preventDefault()
  const currentLineUntilCursor = textarea.value.substring(0, textarea.selectionStart).split("\n").slice(-1)[0]

  document.execCommand("insertText", false, `\n${indentation_for(currentLineUntilCursor)}`)
}

const moveAction = () => {
  textarea.__originalSelectionStart = textarea.selectionStart
  textarea.__originalSelectionEnd = textarea.selectionEnd
  textarea.__currentLineUntilCursor = textarea.value.substring(0, textarea.selectionStart).split("\n").slice(-1)[0]
  textarea.__currentLineAfterCursor = textarea.value.substring(textarea.selectionEnd, textarea.value.length).split("\n")[0]
  textarea.__previousLine = textarea.value.substring(0, textarea.selectionStart).split("\n").slice(-2)[0]
  textarea.__nextLine = textarea.value.substring(textarea.selectionEnd, textarea.value.length).split("\n")[1]

  textarea.setSelectionRange(textarea.selectionStart - textarea.__currentLineUntilCursor.length, textarea.selectionEnd + textarea.__currentLineAfterCursor.length + 1)
  textarea.__currentLine = window.getSelection().toString()
  document.execCommand("delete", false, null)
}

const upAction = () => {
  moveAction()
  textarea.setSelectionRange(textarea.selectionStart - textarea.__previousLine.length - 1, textarea.selectionStart - textarea.__previousLine.length - 1)
  document.execCommand("insertText", false, `${textarea.__currentLine}`)
  textarea.setSelectionRange(textarea.__originalSelectionStart - textarea.__previousLine.length - 1, textarea.__originalSelectionEnd - textarea.__previousLine.length - 1)
}

const downAction = () => {
  moveAction()
  textarea.setSelectionRange(textarea.selectionStart + textarea.__nextLine.length + 1, textarea.selectionStart + textarea.__nextLine.length + 1)
  document.execCommand("insertText", false, `${textarea.__currentLine}`)
  textarea.setSelectionRange(textarea.__originalSelectionStart + textarea.__nextLine.length + 1, textarea.__originalSelectionEnd + textarea.__nextLine.length + 1)
}

textarea.addEventListener("keydown", (event) => {
  // ⇥ Tab
  if (event.key === "Tab") { tabAction() }

  // ↵ Enter
  if (event.key === "Enter") { enterAction() }

  // ⌥ Option + ⌘ Command + ⇧ Up
  if (event.altKey && event.metaKey && event.key === "ArrowUp") { upAction() }

  // ⌥ Option + ⌘ Command + ⇩ Down
  if (event.altKey && event.metaKey && event.key === "ArrowDown") { downAction() }
})

textarea.addEventListener("keyup", (event) => {
  window.fileSystem.writeFile(event.target.value)
})
