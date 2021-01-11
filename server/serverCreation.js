const fs = require("fs");
var shell = require('shelljs');

function createServer(serverRequirements) {
    
    serverRequirements = {
        projectName: 'Alexandria',
        port: '8080',
        bodyParser: true,
        cors: true,
        mongoose: true,
        getMethods: ['get-books'],
        postMethods: ['add-book delete-book']
    }

    // createPackageJson(serverRequirements)
}

function createPackageJson(serverRequirements) {
    shell.exec('cd server/template && git init && npm init -y')
    shell.exec('cd server/template && npm install express')

    if (serverRequirements.bodyParser) { shell.exec('cd server/template && npm install body-parser')  }
    if (serverRequirements.cors) { shell.exec('cd server/template && npm install cors')  }
    if (serverRequirements.mongoose) { shell.exec('cd server/template && npm install mongoose')  }
}


module.exports = {
    createServer,
}