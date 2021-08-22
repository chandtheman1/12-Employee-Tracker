const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
// const db = require('./scripts/connection');
const util = require('util');

require('dotenv').config();


const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    },
);



db.query = util.promisify(db.query);


async function actionPrompt() {
    inquirer.prompt([
        {
            name: "task",
            message: "What would you like to do?",
            type: 'list',
            choices: [
                "View All Departments",
                "View All Roles",
                "View All Employees",
                "Add A Department",
                "View Employees Through Department",

            ] 
        }
    ])
    .then((choice) => {
        switch(choice.task) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add A Department":
                addADepartment();
                break;
            case "View Employees Through Department":
                viewThroughDepartment();
                break;
        }
    })
    

    
}


function viewAllDepartments() {
    db.query('SELECT department.id AS ID, department.name AS DEPARTMENT FROM department', function (err, results) {
        console.table('\n', results, '\n');
        actionPrompt();
    })
}

function viewAllRoles() {
    db.query(`SELECT role.id, role.title, role.salary, department.name
        FROM role 
        JOIN department ON role.department_id = department.id
        ORDER BY role.id ASC`, function (err, results) {
            console.table('\n', results, '\n');
            actionPrompt();
        });
}

function viewAllEmployees() {
    db.query(`SELECT    employee.id AS ID,
                        employee.first_name AS "FIRST NAME",
                        employee.last_name AS "LAST NAME",
                        role.title AS "TITLE",
                        role.salary AS "SALARY",
                        department.name AS "DEPARTMENT",
                        CONCAT(manager.first_name, " ", manager.last_name) AS "MANAGER NAME"
                FROM employee
                LEFT JOIN employee manager ON manager.id = employee.manager_id
                INNER JOIN role ON employee.role_id = role.id
                INNER JOIN department ON role.department_id = department.id`, function (err, results) {
            console.table('\n', results, '\n');
            actionPrompt();
            });
}

function addADepartment() {
    inquirer.prompt([
        {
            name: "departmentName",
            message: "What is the new department name?",
            type: "input"
        }
    ])
    .then((result) => {
        let department = result.departmentName;
        db.query(`INSERT INTO department (name)
        VALUES  (?);
        `, department , function (err, result) {
            console.log('\n', `Department ${department} has been added.`, '\n');
            actionPrompt();
        });
    })
}

async function viewThroughDepartment() {
    const choiceArray = [];
    
    inquirer.prompt([
        {
            name: "departmentID",
            message: "Which department's employees would you like to view?",
            type: "list",
            choices: db.query('SELECT department.id, department.name FROM department', function (err, result) {
       
       
       

                result.forEach((department) => {
                    const deptObj = {
                        name: department.name,
                        value: department.id
                    }
                    choiceArray.push(deptObj);
                })
         
                
         
                return choiceArray
             })
            
        },
    ])
}

function test() {

    const choiceArray = [];

    db.query('SELECT department.id, department.name FROM department', function (err, result) {
       
       
       

       result.forEach((department) => {
           const deptObj = {
               name: department.name,
               value: department.id
           }
           choiceArray.push(deptObj);
       })

       

       
    }).then(console.log(choiceArray))

    

}



const init = async () => {
    try {
        actionPrompt();
        // test()
        
    } catch (err) {
        console.log(err);
    }
};


init();

