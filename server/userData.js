const { prompt } = require('enquirer');

const question = [
    {
        type: 'input',
        name: 'projectName',
        message: "Project's name"
    },
    {
        type: 'input',
        name: 'port',
        message: "Which port you want to use?"
    },
    {
        type: 'confirm',
        name: 'bodyParser',
        message: "Do you want to use BodyParser?"
    },
    {
        type: 'confirm',
        name: 'cors',
        message: "Do you want to use Cors?"
    },
    {
        type: 'confirm',
        name: 'mongoose',
        message: "Do you want to use Mongoose?"
    },
    {
        type: 'list',
        name: 'getMethods',
        message: "Which GET methods do you want?"
    },
    {
        type: 'list',
        name: 'postMethods',
        message: "Which POST methods do you want?"
    }
];

async function gatherUserData() {
    return prompt(question)
}

module.exports = {
    gatherUserData,
}