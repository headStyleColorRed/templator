const fs = require("fs");
const shell = require('shelljs');
const appFile = "server/template/server/app.js"
const validationStaticFile = require("./files/validationFile.js")
const mongoDBStaticFile = require("./files/mongoDBFile.js")
const dockerStaticFile = require("./files/dockerStaticFile.js")

// # # # # # # # # # # # # # # # # # # # # # # # # # #  T E M P L A T E S  # # # # # # # # # # # # # # # # # # # # # # # # # # # # // 

// Imports
const bodyParserModule = `const bodyParser = require("body-parser")\n`
const corsModule = `const Cors = require("cors")\n`
const dotenvModule = `require('dotenv').config()\n`
const mongooseModule = `const mongoose = require("mongoose")\n`


// User middelwares
const bodyParserMiddelware = `app.use(express.json()); \napp.use(express.urlencoded({ extended: false }))\n`
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

let usersMethods = `app.get("/getUsers", async (req, res) => {
	const users = await User.find();
	res.json(users);
});

app.get("/deleteUsers", async (req, res) => {
	const users = await User.deleteMany();
	res.json("Users deleted");
});
`



// # # # # # # # # # # # # # # # # # # # # # # # # # #  C R E A T I O N  # # # # # # # # # # # # # # # # # # # # # # # # # # # # // 

function createAppFile(serverRequirements) {
    // Create directory
    fs.mkdirSync("server/template/server", { recursive: true }, () => { })

    // Write top file imports
    const standardModules = `const express = require("express") \nconst app = express(); \nconst port = ${serverRequirements.port};\n`
    fs.writeFileSync(appFile, standardModules, (err) => { if (err) console.log(err); })
    if (serverRequirements.bodyParser) { fs.appendFileSync(appFile, bodyParserModule) }
    if (serverRequirements.cors) { fs.appendFileSync(appFile, corsModule) }
    if (serverRequirements.mongoose) { fs.appendFileSync(appFile, mongooseModule) }
    if (serverRequirements.dotenv) { fs.appendFileSync(appFile, dotenvModule) }
    addSpaces()

    // Middelwares
    if (hasMiddlewares(serverRequirements)) {
        fs.appendFileSync(appFile, "// Middelwares\n")
        if (serverRequirements.bodyParser) { fs.appendFileSync(appFile, bodyParserMiddelware) }
        if (serverRequirements.cors) { fs.appendFileSync(appFile, corsMiddelware) }
        addSpaces()
    }

    // DataBaseConection
    if (serverRequirements.mongoose) {
        fs.appendFileSync(appFile, "// Modules\n")
        fs.appendFileSync(appFile, "const User = require(\"./mongoDB/userModel.js\")")
        addSpaces()
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

    if (serverRequirements.mongoose) { fs.appendFileSync(appFile, usersMethods) }
    addSpaces()



    // Add dependencies
    createPackageJson(serverRequirements)

    // Create files
    createGitIgnoreFile()
    if (serverRequirements.dotenv) { createDotEnvFile() }
    if (serverRequirements.validation) { createValidationFile() }
    if (serverRequirements.mongoose) { createMongoDBModelFile() }

    // Handle docker
    if (serverRequirements.docker) { handleDockerCreation(serverRequirements) }
}

function createPackageJson(serverRequirements) {
    shell.exec('cd server/template && git init && npm init -y')
    shell.exec('cd server/template && npm install express')

    if (serverRequirements.bodyParser) { shell.exec('cd server/template && npm install body-parser') }
    if (serverRequirements.cors) { shell.exec('cd server/template && npm install cors') }
    if (serverRequirements.mongoose) { shell.exec('cd server/template && npm install mongoose') }
    if (serverRequirements.dotenv) { shell.exec('cd server/template && npm install dotenv') }
}

function createGitIgnoreFile() {
    let gitIgnoreFile = "server/template/.gitignore"
    let ignore = "node_modules/ \n.env"
    fs.writeFileSync(gitIgnoreFile, ignore, (err) => { if (err) console.log(err); })
}

function createDotEnvFile() {
    let dotEnvFile = "server/template/.env"
    let secret = "SECRET="
    fs.writeFileSync(dotEnvFile, secret, (err) => { if (err) console.log(err); })
}

function createValidationFile() {
    let validation = validationStaticFile.validationFile
    let validationFile = "server/template/server/tools/validation.js"
    fs.mkdirSync("server/template/server/tools", { recursive: true }, () => { })
    fs.writeFileSync(validationFile, validation, (err) => { if (err) console.log(err); })
}

function createMongoDBModelFile() {
    let mongooseModel = mongoDBStaticFile.mongoDBFile
    let mongooseModelFile = "server/template/server/mongoDB/userModel.js"
    fs.mkdirSync("server/template/server/mongoDB", { recursive: true }, () => { })
    fs.writeFileSync(mongooseModelFile, mongooseModel, (err) => { if (err) console.log(err); })
}

function handleDockerCreation(serverRequirements) {
    // Dockerfile
    let dockerFile = dockerStaticFile.dockerFile
    fs.writeFileSync("server/template/Dockerfile", dockerFile, (err) => { if (err) console.log(err); })

    // Docker-compose
    let dockerComposeFile = dockerStaticFile.dockerComposeFile(serverRequirements.port, serverRequirements.mongoose)
    fs.writeFileSync("server/template/docker-compose.yml", dockerComposeFile, (err) => { if (err) console.log(err); })

    // StartServerFile
    let fireUpServer = "docker-compose up --build -d"
    fs.writeFileSync("server/template/fireUpServer.sh", fireUpServer, (err) => { if (err) console.log(err); })
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

let serverRequirements = { mongoose: true, port: 8888}
handleDockerCreation(serverRequirements)