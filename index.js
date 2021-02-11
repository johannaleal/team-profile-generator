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

// FUNCTIONS ==================================
const getManager = () => {
    // Get the manager's information.
    inquirer
        .prompt([
            // Enter the manager's name.
            {
                type: "input",
                name: "name",
                message: `Enter the manager's name:`,
                validate: confirmResponse
            },
            // Enter the manager's ID.
            {
                type: "input",
                name: "employeeId",
                message: `Enter the manager's Id:`,
                validate: confirmResponse
            },
            // Enter the manager's email.
            {
                type: "input",
                name: "email",
                message: `Enter the manager's email:`,
                validate: validateEmail
            },
            // Enter the manager office number.
            {
                type: "input",
                name: "officeNumber",
                message: "Enter the manager's office number:"
            }
        ])
        .then((response) => {
            // Using the responses to the prompts, create a Manager object and store it in the Team Members array.
            addEmployeeToTeam("manager", response.name, response.employeeId, response.email, response.officeNumber);

            // Ask for the next employee type they want to enter.
            selectNextEmployee();
        })
    // If there is an error, write an error to the console.
    .catch(err => {
        console.error(err);
    })
};

function addEmployeeToTeam(role, name, id, email, answer) {
    let employee;

    switch (role) {
        case "manager":
            employee = new Manager(name, id, email, answer);
            break;
        case "engineer": 
            employee = new Engineer(name, id, email, answer);
            break;
        case "intern":
            intern = new Intern(name, id, employee, answer);
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
                default: 
                    break;
            }
        })
        // If there is an error, write an error to the console.
        .catch(err => {
            console.error(err);
        })
};

const getEngineer = () => {
    // Prompt the user to get answers to questions.
    inquirer
        .prompt([
            // Enter the engineer's name.
            {
                type: "input",
                name: "name",
                message: `Enter the engineer's name:`,
                validate: confirmResponse
            },
            // Enter the engineer's ID.
            {
                type: "input",
                name: "employeeId",
                message: `Enter the engineer's Id:`,
                validate: confirmResponse
            },
            // Enter the engineer's email.
            {
                type: "input",
                name: "email",
                message: `Enter the engineer's email:`,
                validate: validateEmail
            },
            // Enter the engineer's GitHub username.
            {
                type: "input",
                name: "github",
                message: "Enter the engineer's GitHub username:"
            }
        ])
        .then((response) => {
            addEmployeeToTeam("engineer", response.name, response.employeeId, response.email, response.github);
        })
    // If there is an error, write an error to the console.
    .catch(err => {
        console.error(err);
    })
};

const getIntern = () => {

    // Prompt the user for the intern's information.
    inquirer
        .prompt([
            // Enter the intern's name.
            {
                type: "input",
                name: "name",
                message: `Enter the intern's name:`,
                validate: confirmResponse
            },
            // Enter the intern's ID.
            {
                type: "input",
                name: "employeeId",
                message: `Enter the intern's Id:`,
                validate: confirmResponse
            },
            // Enter the intern's email.
            {
                type: "input",
                name: "email",
                message: `Enter the intern's email:`,
                validate: validateEmail
            },
            // Enter the intern's school.
            {
                type: "input",
                name: "school",
                message: "Enter the intern's school:"
            }
        ])
        // Write a ReadMe file using the amswers to the prompts.
        .then((response) => {
            addEmployeeToTeam("intern", response.name, response.employeeId, response.email, response.school);
        })
    // If there is an error, write an error to the console.
    .catch(err => {
        console.error(err);
    })
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

  