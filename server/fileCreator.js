const fs = require("fs");
const appFile = "template/server/app.js"

// User modules
const bodyParserModule = `const bodyParser = require("body-parser")\n`
const corsModule = `const Cors = require("cors")\n`
const mongooseModule = `const mongoose = require("mongoose")\n`


// User middelwares
const bodyParserMiddelware = `app.use(bodyParser.json()); \napp.use(bodyParser.urlencoded({ extended: false }))\n`
const corsMiddelware = `app.use(Cors());`

// MongoDB
const mongooseConection = `// DataBase connection 
let dbLink = "mongodb://localhost:27017/myData"
let timeOut = setInterval(() => {
  mongoose.connect(dbLink, { useNewUrlParser: true }, (err) => {
    if (err) {
      console.log("Encountered an error in Db Connection")
    } else {
      console.log("Succesfully connected with DB");
      clearInterval(timeOut)
    }
  })
}, 5000);
`

// Standard get method
let getMethod = `app.get("/", (req, res) => {
  res.send("Server is up and running! :D")
})`



function createAppFile(serverRequirements) {

    // Standard modules
    const standardModules = `const express = require("express") \nconst app = express(); \nconst port = ${serverRequirements.port};`


    fs.mkdirSync("server/template/server", { recursive: true }, () => { })

    fs.writeFileSync(appFile, standardModules, (err) => { if (err) console.log(err); })
    addSpaces()

    // Modules
    fs.appendFileSync(appFile, "// Modules\n")
    if (serverRequirements.bodyParser) { fs.appendFileSync(appFile, bodyParserModule) }
    if (serverRequirements.cors) { fs.appendFileSync(appFile, corsModule) }
    if (serverRequirements.mongoose) { fs.appendFileSync(appFile, mongooseModule) }
    addSpaces()

    // Midelwares
    fs.appendFileSync(appFile, "// Middelwares\n")
    if (serverRequirements.bodyParser) { fs.appendFileSync(appFile, bodyParserMiddelware) }
    if (serverRequirements.cors) { fs.appendFileSync(appFile, corsMiddelware) }
    addSpaces()

    // Routes
    fs.appendFileSync(appFile, "// Routes\n")
    addSpaces()

    // DataBaseConection
    if (serverRequirements.mongoose) {
        fs.appendFileSync(appFile, mongooseConection)
        addSpaces()
    }

    // Port Listen
    fs.appendFileSync(appFile, "// Routes\n")
    fs.appendFileSync(appFile, `app.listen(${serverRequirements.port}, () => console.log("Listening on port " + ${serverRequirements.port}))`)
    addSpaces()
    addSpaces()

    // Methods
    fs.appendFileSync(appFile, "// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //")
    addSpaces()
    fs.appendFileSync(appFile, getMethod)
    addSpaces()
}

function addSpaces() {
    const spaces = "\n\n"
    fs.appendFileSync(appFile, spaces)
}

module.exports = {
    createAppFile,
}
