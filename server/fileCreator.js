const fs = require("fs");
const shell = require('shelljs');
const appFile = "server/template/server/app.js"

// # # # # # # # # # # # # # # # # # # # # # # # # # #  T E M P L A T E S  # # # # # # # # # # # # # # # # # # # # # # # # # # # # // 

// Imports
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



// # # # # # # # # # # # # # # # # # # # # # # # # # #  C R E A T I O N  # # # # # # # # # # # # # # # # # # # # # # # # # # # # // 

fuc

function createAppFile(serverRequirements) {
  // Create directory
  fs.mkdirSync("server/template/server", { recursive: true }, () => { })

  // Write top file imports
  const standardModules = `const express = require("express") \nconst app = express(); \nconst port = ${serverRequirements.port};\n`
  fs.writeFileSync(appFile, standardModules, (err) => { if (err) console.log(err); })
  if (serverRequirements.bodyParser) { fs.appendFileSync(appFile, bodyParserModule) }
  if (serverRequirements.cors) { fs.appendFileSync(appFile, corsModule) }
  if (serverRequirements.mongoose) { fs.appendFileSync(appFile, mongooseModule) }
  addSpaces()

  // Modules
  // fs.appendFileSync(appFile, "// Modules\n")
  // addSpaces()

  // Middelwares
  if (hasMiddlewares(serverRequirements)) {
    fs.appendFileSync(appFile, "// Middelwares\n")
    if (serverRequirements.bodyParser) { fs.appendFileSync(appFile, bodyParserMiddelware) }
    if (serverRequirements.cors) { fs.appendFileSync(appFile, corsMiddelware) }
    addSpaces()
  }

  // DataBaseConection
  if (serverRequirements.mongoose) {
    fs.appendFileSync(appFile, mongooseConection)
    addSpaces()
  }

  // Port Listen
  fs.appendFileSync(appFile, "// Open port\n")
  fs.appendFileSync(appFile, `app.listen(${serverRequirements.port}, () => console.log("Listening on port " + port))`)
  addSpaces()

  // Methods
  fs.appendFileSync(appFile, "// ++++++++++++++++ HTTP METHODS +++++++++++++++++++ //")
  addSpaces()
  fs.appendFileSync(appFile, getMethod)
  addSpaces()

  // Add dependencies
  createPackageJson(serverRequirements)
}

function createPackageJson(serverRequirements) {
  shell.exec('cd server/template && git init && npm init -y')
  shell.exec('cd server/template && npm install express')

  if (serverRequirements.bodyParser) { shell.exec('cd server/template && npm install body-parser')  }
  if (serverRequirements.cors) { shell.exec('cd server/template && npm install cors')  }
  if (serverRequirements.mongoose) { shell.exec('cd server/template && npm install mongoose')  }
}


// # # # # # # # # # # # # # # # # # # # # # # # # # #  U T I L S  # # # # # # # # # # # # # # # # # # # # # # # # # # # # // 

function hasMiddlewares(serverRequirements) {
  return serverRequirements.bodyParser || serverRequirements.cors
}

function addSpaces() {
  const spaces = "\n\n"
  fs.appendFileSync(appFile, spaces)
}

module.exports = {
  createAppFile,
}
