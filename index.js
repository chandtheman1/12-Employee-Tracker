const inquirer = require('inquirer');
const query = require('./db/query');
const inquire = require('./db/inquire');



async function employeeCMS() {
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
                    console.log(query.returnAllDepartments());
                    
                    break;
                case "Add Employee":
                    console.log("Add Employee");
                    break;
                case "Update Employee Role":
                    console.log("Update Employee Role");
                    break;
                case "View All Roles":
                    query.viewAllRoles();

                    break;
                case "Add Role":
                    inquire.addRole();

                    break;
                case "View All Departments":
                    query.viewAllDepartments();
                    
                    break;
                case "Add Department":
                    query.addDepartment();
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