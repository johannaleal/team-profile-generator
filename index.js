// DEPENDENCIES ===============================

// Built in node and npd packages
const fs = require('fs');
const inquirer = require('inquirer');
const validator = require('email-validator');

// Employee classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// DATA ======================================

// Array of team members
let teamMembers = [];

// FUNCTIONS =================================

// Validate required input.
const confirmResponse = (input) => {
    if (input === "") {
        return "This field is required!"
    }
    return true;
};

// Validate the email format.
// Return an error message if not correct.
const validateEmail = (input) => {
    if (validator.validate(input)) {
        return true;
    }
    else {
        return "This email is not valid!";
    }
};

// Array of base questions to ask all types of employees
const questions = [
    {
        type: "input",
        name: "name",
        message: `Enter the employee's name:`,
        validate: confirmResponse
    },
    // Enter the manager's ID.
    {
        type: "input",
        name: "employeeId",
        message: `Enter the employee's Id:`,
        validate: confirmResponse
    },
    // Enter the manager's email.
    {
        type: "input",
        name: "email",
        message: `Enter the employee's email:`,
        validate: validateEmail
    },
];

// FUNCTIONS ==================================
const getManager = () => {
    let managerQuestions = questions.concat(
                {
                    type: "input",
                    name: "officeNumber",
                    message: "Enter the manager's office number:"
                });

    // Get the manager's information.
    inquirer
        .prompt(managerQuestions)
        .then((response) => {
            // Using the responses to the prompts, create a Manager object and store it in the Team Members array.
            addEmployeeToTeam("manager", response);

            // Ask for the next employee type they want to enter.
            selectNextEmployee();
        })
    // If there is an error, write an error to the console.
    .catch(err => {
        console.error(err);
    })
};

function addEmployeeToTeam(role, response) {
    let employee;
    let name = response.name;
    let id = response.employeeId;
    let email = response.email;

    switch (role) {
        case "manager":
            employee = new Manager(name, id, email, response.officeNumber);
            break;
        case "engineer": 
            employee = new Engineer(name, id, email, response.github);
            break;
        case "intern":
            intern = new Intern(name, id, employee, response.school);
            break;
    };

    teamMembers.push(employee);
    console.log(teamMembers);
};

const selectNextEmployee = () => {
  
    // Prompt the user to get answers to questions.
    inquirer
        .prompt([
            // Select the next employee role to enter or exit out.
            {
                type: "list",
                name: "employeeType",
                message: "Which employee would you like to add?",
                choices: ["Engineer","Intern","Finish building my team"]
            },
        ])
        .then((response) => {
            switch (response.employeeType) {
                case "Engineer": getEngineer();
                    break;
                case "Intern": getIntern();
                    break;
                case "Finish building my team": renderHTML();;
                    break;
            }
        })
        // If there is an error, write an error to the console.
        .catch(err => {
            console.error(err);
        })
};

const getEngineer = () => {
    let engineerQuestions = questions.concat(
        {
            type: "input",
            name: "github",
            message: "Enter the engineer's GitHub username:"
        });

    // Prompt the user to get answers to questions.
    inquirer
        .prompt(engineerQuestions)
        .then((response) => {
            addEmployeeToTeam("engineer", response);

            // Ask for the next employee type they want to enter.
            selectNextEmployee();
        })
    // If there is an error, write an error to the console.
    .catch(err => {
        console.error(err);
    })
};

const getIntern = () => {
    let internQuestions = questions.concat(
        {
            type: "input",
            name: "school",
            message: "Enter the intern's school:"
        });

    // Prompt the user for the intern's information.
    inquirer
        .prompt(internQuestions)
        .then((response) => {
            addEmployeeToTeam("intern", response);

            // Ask for the next employee type they want to enter.
            selectNextEmployee();
        })
    // If there is an error, write an error to the console.
    .catch(err => {
        console.error(err);
    })
};

const renderHTML = () => {

};

// writeUserInfo - takes user responses and writes a README.md file
// const writeUserInfo = (userResponses) => {
//   // Build a string with user responses.
//   const content = formatReadMe(userResponses);

//   // Write the generated content to a file. If there is an error writing to the file, console.log the error message received.
//   // Else, console.log an success message.
//   // NOTE: FOR TESTING PURPOSES I HAVE NAMED THE OUTPUT FILE README_TEST.MD SO AS NOT TO OVERWRITE MY ACTUAL README.MD FILE.
//   fs.writeFile("readme_test.md", content, (err) => err ? console.error(err) : console.log("File was successly generated!"));
// }

// formatReadMe - takes the user responses to the prompts and creates a string with the user responses inserted as 
// template literals in the appropriate locations within the output string.
// const formatReadMe = (userResponses) => {
//     let link = "";

//     // Find the selected badge link.
//     switch (userResponses.license)  {
//         case "Apache License 2.0":
//             link = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
//             break;
//         case "GNU General Public License v3.0":
//             link = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
//             break;
//         case "MIT License":
//             link = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
//             break;
//         case "BSD-2-Clause Simplified License":
//             link = "[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)";
//             break;
//         case "Mozilla Public License 2.0":
//             link = "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
//             break;
//      };

//     // Return the content string which contains the content of the ReadMe file.
//     let content = `# ${userResponses.title}

// ${link}

// ## Description

// ${userResponses.description}

// ## Table of Contents
// * [Installation](#installation)
// * [Usage](#usage)
// * [License](#license)
// * [Contributing](#contributing)
// * [Tests](#tests)
// * [Questions](#questions)

// ## Installation
// ${userResponses.installation};

// ## Usage
// ${userResponses.usage}

// ## License
// This application is covered under license: ${userResponses.license}

// ## Contributing
// ${userResponses.contribution}

// ## Tests
// ${userResponses.testInstructions}

// ## Questions
// ### Contact Information:

// GitHub Profile: [@${userResponses.gitHubUserName}](http://github.com/${userResponses.gitHubUserName})

// Email: <${userResponses.email}>
//     `;

//     return content;
// }

// USER INTERACTIONS ==========================


getManager();

  