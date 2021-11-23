const prompts = require('prompts');

// Modules
const fileCreator = require("./fileCreator.js");

(async () => {
  const response = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: `What's your project name?`
    },
    {
      type: 'number',
      name: 'port',
      message: 'On which port do you want the server to run?',
      initial: 8080,
      style: 'default'
    },
    {
      type: 'multiselect',
      name: 'options',
      message: 'Choose configuration',
      instructions: false,
      choices: [
        { title: 'Cors', value: "cors", selected: true },
        { title: 'BodyParser', value: 'bodyParser', selected: true },
        { title: 'Dot files', value: 'dotenv' },
        { title: 'Mongoose', value: 'mongoose' },
      ],
      hint: '- Space to select. Return to submit'
    }
  ]);

  // Create user requirements object
  serverRequirements = {
    projectName: response.projectName,
    port: response.port,
    cors: response.options.includes("cors"),
    bodyParser: response.options.includes("bodyParser"),
    dotenv: response.options.includes("dotenv"),
    mongoose: response.options.includes("mongoose"),
    getMethods: ['get-books'],
    postMethods: ['add-book delete-book']
  }

  // Create project accordingly
  fileCreator.createAppFile(serverRequirements)
})();
