const inquirer = require('inquirer');
// const util = require('util');
const cTable = require('console.table');
// const query = require('./scripts/query');
// const inquire = require('./scripts/inquire');
const viewFunction = require('./scripts/viewFunction');



async function actionPrompt() {
    return inquirer.prompt([
        {
            name: "task",
            message: "What would you like to do?",
            type: 'list',
            choices: [
                "View All Departments",
                "View Employees Through Department",

            ] 
        }
    ])
}

actionMethods = {
    
    "View All Departments": viewFunction.viewAllDepartments,
    "View Employees Through Department": viewFunction.viewThroughDepartment,
    
}


const init = async () => {
    try {
        
        const actionChoice = await actionPrompt();
      
        await actionMethods[actionChoice.task](init);
        
    } catch (err) {
        console.log(err);
    }
};


init();

module.exports = {
    init
}