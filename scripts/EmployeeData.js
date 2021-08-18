const connection = require('./connection');
const util = require('util');
const cTable = require('console.table');

const query = util.promisify(connection.query).bind(connection);


class EmployeeData {
    constructor(query) {
        this.query = query;
    }

    viewAllDepartments() {
        query('SELECT department.id AS ID, department.name AS DEPARTMENT FROM department', function (err, results) {
            console.table('\n', results);
        });
    }
    
    viewAllRoles() {
        query(`SELECT role.id, role.title, role.salary, department.name
        FROM role 
        JOIN department ON role.department_id = department.id
        ORDER BY role.id ASC`, function (err, results) {
            console.table('\n', results);
        });
    }

    viewAllEmployees() {
        query(`SELECT  employee.id AS ID,
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
            console.table('\n', results);
        });
    }
    
    

}

const test = new EmployeeData();

test.viewAllEmployees();
