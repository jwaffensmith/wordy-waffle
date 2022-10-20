const fs = require('fs')

const writeTextToFileAsync = async (filePath: string, content: string) => {
    await fs.writeFile(filePath, content, (err: String) => {
      if(err) throw err
    })
  }

module.exports = writeTextToFileAsync;