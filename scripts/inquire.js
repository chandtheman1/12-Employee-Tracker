const inquirer = require('inquirer');
const query = require('./query');

async function addDepartment() {
    inquirer
        .prompt([
            {
                name: "department",
                message: "What is the name of the department?",
                type: "input"
            }
        ])
        .then((answers) => {
            return answers.department;
        })
        .catch((error) => {
            console.error(error);
        });
}

async function addRole() {
    inquirer
        .prompt([
            {
                name: "role",
                message: "What is the name of the role?",
                type: "input"
            },
            {
                name: "salary",
                message: " What is the salary of the role?",
                type: "number"
            },
            {
                name: "department",
                message: "Which department does the role belong to?",
                type: "list",
                choices: query.returnAllDepartments(),
            }
        ])
}

console.log(query.returnAllDepartments());

module.exports = {
    addDepartment,
    addRole
}