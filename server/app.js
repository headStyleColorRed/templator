const PromptManager = require("./userData.js")
const ServerManager = require("./serverCreation.js")
const AppManager = require("./mainApp.js")


// Presentation
console.log("Hi! Let's create a Node server with express: \n");

// PromptManager.gatherUserData().then((serverRequirements) => {
//   ServerManager.createServer(serverRequirements)
// })

ServerManager.createServer("serverRequirements")

AppManager.createAppFile("serverRequirements")
