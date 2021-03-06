const db = require('./connection');
const inquirer = require('inquirer');
const util = require('util');
const cTable = require('console.table');
// const init = require('../index.js');


// const query = util.promisify(connection.query).bind(connection);
db.query = util.promisify(db.query);


function test() {
    let departments = db.query('SELECT department.id, department.name FROM department', function (err, results) {
        return results
    })
    console.log(departments);
}

test();

class EmployeeData {
    constructor(query) {
        this.query = query;
    }

    viewAllDepartments() {
        console.log(db.query('SELECT department.id AS ID, department.name AS DEPARTMENT FROM department'));
    }
    
    returnAllRoles() {
        db.query(`SELECT role.id, role.title, role.salary, department.name
        FROM role 
        JOIN department ON role.department_id = department.id
        ORDER BY role.id ASC`, function (err, results) {
            return results;
        });
    }

    viewAllEmployees(init) {
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
            console.table('\n', results, '\n');
            init();
        });
    }
    
    viewThroughManager(managerID) {

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
    INNER JOIN department ON role.department_id = department.id
    WHERE employee.manager_id = ?`, managerID, function (err, results) {
        console.table('\n', results);
        });
    
    }

    returnThroughDepartment(departmentID) {
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
    INNER JOIN department ON role.department_id = department.id
    WHERE department.id = ?`, departmentID, function (err, results) {
        console.table('\n', results);
    })
    }

    viewDepartmentBudget(departmentID) {
        query(`SELECT SUM(salary) AS "TOTAL DEPARTMENT BUDGET"
        FROM employee
        LEFT JOIN employee manager ON manager.id = employee.manager_id
        INNER JOIN role ON employee.role_id = role.id
        INNER JOIN department ON role.department_id = department.id
        WHERE department.id = ?`, departmentID, function (err, results) {
            console.table('\n', results);
        });
    }

    addDepartment(departmentName) {
        query(`INSERT INTO department (name)
        VALUES  (?);
        `, departmentName, function () {
            console.log(`${departmentName} has been added.`);
        });
    }

    addRole(title, salary, departmentID) {
        query(`INSERT INTO role (title, salary, department_id)
        VALUES (?, ?, ?)`, [title, salary, departmentID], function () {
            console.log(`${title} has been added.`)
        })
    }

    addEmployee(firstName, lastName, roleID, managerID) {
        query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES  (?, ?, ?, ?)`, [firstName, lastName, roleID, managerID], function () {
            console.log(`${firstName} ${lastName} has been added.`);
        });
    }

    updateEmployee(roleID, employeeID) {
        query(`UPDATE employee
        SET role_id = ?
        WHERE employee.id = ?`, [roleID, employeeID], function () {
            console.log(`Employee's role has been updated.`);
        });
    }

    updateManager(managerID, employeeID) {
        query(`UPDATE employee
        SET manager_id = ?
        WHERE employee.id = ?`, [managerID, employeeID], function () {
            console.log(`Employee's manager has been updated.`);
        });
    }

    deleteDepartment(departmentID) {
        query(`DELETE
        FROM department 
        WHERE id = ?`, departmentID, function () {
            console.log(`Department deleted.`);
        });
    }

    deleteRole(roleID) {
        query(`DELETE
        FROM role 
        WHERE id = ?`, roleID, function () {
            console.log(`Role deleted.`);
        });
    }

    deleteEmployee(employeeID) {
        query(`DELETE
        FROM employee 
        WHERE id = ?`, employeeID, function () {
            console.log(`Employee deleted.`);
        });
    }

}


module.exports = EmployeeData;


