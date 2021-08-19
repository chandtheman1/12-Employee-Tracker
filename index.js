const inquirer = require('inquirer');
// const util = require('util');
const cTable = require('console.table');
// const query = require('./scripts/query');
// const inquire = require('./scripts/inquire');
const EmployeeData = require('./scripts/EmployeeData');

const newEmployeeData = new EmployeeData;

async function actionPrompt() {
    return inquirer.prompt([
        {
            name: "task",
            message: "What would you like to do?",
            type: 'list',
            choices: [
                "View All Employees",
                "View All Departments",
            ] 
        }
    ])
}

actionMethods = {
    
    
    "View All Employees": newEmployeeData.viewAllEmployees,
    "View All Departments": newEmployeeData.viewAllDepartments,
    
}


const init = async () => {
    try {
        
        const actionChoice = await actionPrompt();
      
        await actionMethods[actionChoice.task]();

        init();
    } catch (err) {
        console.log(err);
    }
};


init();
