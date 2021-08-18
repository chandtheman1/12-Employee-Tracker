
const cTable = require('console.table');



async function viewAllDepartments() {
    db.query('SELECT department.id AS ID, department.name AS DEPARTMENT FROM department', function (err, results) {
        console.table('\n', results);
    });
}

async function returnAllDepartments() {
    db.query('SELECT department.name FROM department', function (err, results) {
        const departments = results.map((item) => {
            return item['name'];
        });
        
        return departments;
        
    });
}

db.query('SELECT department.name FROM department', function (err, results) {
    // const departments = await results.map((item) => {
    //     return item['name'];
    // });
    
    // return departments;
    console.log(results);
    console.log(err);
});

console.log(returnAllDepartments());

async function viewAllRoles() {
    db.query(`SELECT role.id, role.title, role.salary, department.name
    FROM role 
    JOIN department ON role.department_id = department.id
    ORDER BY role.id ASC`, function (err, results) {
        console.table('\n', results);
    });
}

async function viewAllEmployees() {
    db.query(`SELECT  employee.id AS ID,
    employee.first_name AS "FIRST NAME",
    employee.last_name AS "LAST NAME",
    employee.manager_id,
    role.title AS "TITLE",
    role.salary AS "SALARY",
    department.name AS "DEPARTMENT"
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id
ORDER by employee.id ASC`, function (err, results) {
        console.table('\n', results);
    });
}

async function addDepartment(name) {
    db.execute(`INSERT INTO department (name)
    VALUES  (?)`, name, function (err, results) {
        console.log(`Department ${name} has been added.`);
    });
}



module.exports = {
    viewAllDepartments,
    viewAllRoles,
    viewAllEmployees,
    addDepartment,
    returnAllDepartments,
}