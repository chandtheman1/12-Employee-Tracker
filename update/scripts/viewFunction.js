const EmployeeData = require('./EmployeeData');
const inquirer = require('inquirer');
const cTable = require('console.table');
const init = require('../index');

const employee = new EmployeeData;

function viewAllDepartments() {
    employee.returnAllDepartments().then(console.table)
    init.actionPrompt();
}


async function viewThroughDepartment() {
    
        const departments = await employee.returnAllDepartments();
        const inquire = inquirer.prompt([
            {
                name: "departmentID",
                message: "Which department's employees would you like to view?",
                type: "list",
                choices: function () {
                    const choiceArray = [];
                    departments.forEach((dept) => {
                        const deptObj = {
                            name: dept.DEPARTMENT,
                            value: dept.ID
                        }
                        choiceArray.push(deptObj)
                    });
                    return choiceArray;
                }
            },
        ])
        .then( function (result) {
            employee.returnThroughDepartment(result.departmentID)
        })
    
}

// employee.viewThroughDepartment(result.departmentID);
module.exports = {
    viewAllDepartments,
    viewThroughDepartment
}
