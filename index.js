const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
// const db = require('./scripts/connection');
const util = require('util');
const { exit } = require('process');

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
                "Add A Role",
                "Add an Employee",
                "Update An Employee Role",
                "Exit",
            ] 
        }
    ])
    .then((choice) => {                     // each choice corresponds to an action function 
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
            case "Add A Role":
                addARole();
                break;
            case "Add an Employee":
                addAnEmployee();
                break;
            case "Update An Employee Role":
                updateAnEmployeeRole();
                break;
            case "Exit":
                process.exit();
        }
    })
    

    
}

// functions in order 

// View functions
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

// Add functions
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

async function addARole() {
    // queries database to get the choices
    let departments = await db.query('SELECT * FROM department');
    inquirer.prompt([
        {
            name: "roleName",
            message: "What is the name of the role?",
            type: "input"
        },
        {
            name: "salary",
            message: "What is the salary of the role?",
            type: "number"
        },
        {
            name: "departmentName",
            message: "Which department does the role belong to?",
            type: "list",
            choices: departments.map((department) => {
                return {
                    name: department.department_name,
                    value: department.name
                }
            })
        }
    ])
    .then((results) => {

        let { roleName, salary } = results;
        // corresponds the department string to its ID
        let foundDepartmentID = departments.find(department => 
            department.name === results.departmentName
        ).id;

      
        db.query(`INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`, [roleName, salary, foundDepartmentID], function (err, results) {
            console.log('\n', `${roleName} has been added.`, '\n');
            actionPrompt();
        });
    })
}

async function addAnEmployee() {
    // queries databases to get the role's choices and manager's choices
    let roles = await db.query('SELECT * FROM role');
    
    let employees = await db.query(`SELECT  employee.id AS id,
        employee.first_name AS "firstName",
        employee.last_name AS "lastName",
            CONCAT(employee.first_name, " ", employee.last_name) AS "employeeName"
            FROM employee
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id`);

    inquirer.prompt([
        {
            name: "firstName",
            message: "What is the employee's first name?",
            type: "input"
        },
        {
            name: "lastName",
            message: "What is the employee's last name?",
            type: "input"
        },
        {
            name: "roleName",
            message: "What is the employee's role?",
            type: "list",
            choices: roles.map((role) => {
                return {
                    name: role.title
                }
            })
        },
        {
            name: "managerName",
            message: "Who is the employee's manager?",
            type: "list",
            choices: employees.map((employee) => {
                return {
                    name: `${employee.firstName} ${employee.lastName}`
                }
            })
        }
    ])
    .then((results) => {
        let { firstName, lastName } = results;
        // corresponds the roleName string to the database ID
        let foundRoleID = roles.find(role => role.title === results.roleName).id;
        // corresponds the manager's name string to the database ID
        let foundManagerID = employees.find(employee => employee.employeeName === results.managerName).id;

        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  (?, ?, ?, ?)`, [firstName, lastName, foundRoleID, foundManagerID], function (err, results) {
            console.log('\n', `${firstName} ${lastName} has been added.`, '\n');
            actionPrompt();
        });

    })
}

//Update functions
async function updateAnEmployeeRole() {
    let roles = await db.query('SELECT * FROM role');
    
    let employees = await db.query(`SELECT  employee.id AS id,
        employee.first_name AS "firstName",
        employee.last_name AS "lastName",
            CONCAT(employee.first_name, " ", employee.last_name) AS "employeeName"
            FROM employee
            LEFT JOIN employee manager ON manager.id = employee.manager_id
            INNER JOIN role ON employee.role_id = role.id
            INNER JOIN department ON role.department_id = department.id`);

    inquirer.prompt([
        {
            name: "name",
            message: "Which employee's role do you want to update?",
            type: "list",
            choices: employees.map((employee) => {
                return {
                    name: `${employee.firstName} ${employee.lastName}`
                }
            })
        },
        {
            name: "roleName",
            message: "Which role do you want to update?",
            type: "list",
            choices: roles.map((role) => {
                return {
                    name: role.title
                }
            })
        }
    ])
    .then((results) => {
       
        // new Role ID
        let foundRoleID = roles.find(role => role.title === results.roleName).id;
        // corresponding the selected employee to its ID
        let foundEmployeeID = employees.find(employee => employee.employeeName === results.name).id;
        
        
        db.query(`UPDATE employee SET role_id = ? WHERE employee.id = ?`, [foundRoleID, foundEmployeeID], function () {
                console.log('\n', `${results.name}'s role has been updated.`, '\n');
                actionPrompt();
        });
        
    })
}

//init function

const init = async () => {
    try {


        console.log('\n', "----------------------------------------", '\n');
        console.log('\n', "       Welcome to Employee Tracker      ", '\n');
        console.log('\n', "----------------------------------------", '\n');


        actionPrompt();
        
    } catch (err) {
        console.log(err);
    }
};


init();

