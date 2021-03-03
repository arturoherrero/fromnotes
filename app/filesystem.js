const fs = require("fs")
const FILENAME = `${require("os").homedir()}/.fromnotes`

const readFile = () => fs.readFileSync(FILENAME)
const writeFile = (content) => fs.writeFile(FILENAME, content, () => {})

module.exports = { readFile, writeFile }
