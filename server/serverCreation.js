const fs = require("fs");


function createServer(serverRequirements) {
    console.log(serverRequirements);
    serverRequirements = {
        projectName: 'Alexandria',
        port: '8080',
        bodyParser: true,
        cors: true,
        mongoose: true,
        getMethods: ['get-books'],
        postMethods: ['add-book delete-book']
    }

    createPackageJson(serverRequirements)
}

function createPackageJson(serverRequirements) {
    let packageJson = dependeciesPackage(serverRequirements)

    fs.writeFile("server/template/package.json", packageJson, (err) => {
        if (err) console.log(err);
    })
}

function dependeciesPackage(serverRequirements) {
    let packageJson =     
`{
    "name": "${serverRequirements.projectName}",
    "version": "1.0.0",
    "description": "",
    "main": "app.js",
    "scripts": {
        "start": "node server/app.js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
	"dependencies": {
		"body-parser": "^1.19.0",
		"cors": "^2.8.5",
		"express": "^4.17.1",
		"mongoose": "^5.9.11"
	}
}`

    return packageJson
}


module.exports = {
    createServer,
}