/* eslint-disable no-undef */
const textarea = document.querySelector("#textarea")

textarea.innerHTML = window.fileSystem.readFile()

const insertTab = () => {
  const range = document.getSelection().getRangeAt(0)
  const tabNode = document.createElement("span")
  tabNode.appendChild(document.createTextNode("\t"))
  tabNode.className = "tab"

  range.insertNode(tabNode)
  range.setStartAfter(tabNode)
  range.setEndAfter(tabNode)
}

textarea.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    insertTab()
  }
})

textarea.addEventListener("keyup", (event) => {
  window.fileSystem.writeFile(event.target.innerHTML)
})
