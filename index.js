const inquirer = require('inquirer');
const query = require('./db/query');



function employeeCMS() {
    inquirer
        .prompt([
            {
                name: "options",
                message: "What would you like to do?",
                type: 'list',
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Departments",
                    "Add Department",
                    "Quit"
                ]
            }
        ])
        .then((answers) => {
            // console.log(answers.options);
            switch (answers.options) {
                case "View All Employees":
                    query.viewAllEmployees();
                    employeeCMS();
                    break;
                case "Add Employee":
                    console.log("Add Employee");
                    break;
                case "Update Employee Role":
                    console.log("Update Employee Role");
                    break;
                case "View All Roles":
                    query.viewAllRoles();
                    employeeCMS();
                    break;
                case "Add Role":
                    console.log("Add Role");
                    break;
                case "View All Departments":
                    query.viewAllDepartments();
                    employeeCMS();
                    break;
                case "Add Department":
                    console.log("Add Department");
                    break;
                case "Quit":
                    break;
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

function init() {
    employeeCMS();
}

init();