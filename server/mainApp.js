const fs = require("fs");

function createAppFile(serverRequirements) {
    let standardModules =
        `const express = require("express")
const app = express();
const port = ${serverRequirements.port};`


    fs.mkdirSync("server/template/server", { recursive: true }, () => { })

    fs.writeFile("server/template/server/app.json", standardModules, (err) => { if (err) console.log(err); })
}

module.exports = {
    createAppFile,
}