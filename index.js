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

getManager();

  