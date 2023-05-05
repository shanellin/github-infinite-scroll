const path = require("path")
const axios = require("axios")
const fs = require("fs-extra")
const rimraf = require("rimraf")

const writeFile = (filepath, data, opts = "utf8") =>
  new Promise((res, rej) => {
    fs.writeFile(filepath, data, opts, (err) => {
      if (err) rej(err)
      else res()
    })
  })

const modifiers = {
  "*": "other",
  1: "one"
}

const sync = async () => {
  const requestUrl = process.argv[2]
  let { data } = await axios.get(requestUrl)
  data = data.filter(item => item.key)
  
  let transferData = { en: {}, zhHant: {}, zhHans: {} }
  data.forEach((item) => {
    transferData.en[item.key] = item.en
    transferData.zhHant[item.key] = item.zhHant
    transferData.zhHans[item.key] = item.zhHans
  })

  const outputFolder = path.resolve(__dirname, "..", "public", "locales")
  rimraf.sync(outputFolder)

  const keys = Object.keys(transferData)
  for (const item of keys) {
    let keyPath = path.resolve(__dirname, "..", "public", "locales", item)
    fs.ensureDirSync(keyPath)
    await writeFile(path.resolve(keyPath, `common.json`), JSON.stringify(transferData[item], null, 4))
  }
}

sync()
  .then(() => {
    console.log("Sync Complete")
  })
  .catch(console.log)
