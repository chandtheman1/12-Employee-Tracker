SELECT department.id AS ID, department.name AS DEPARTMENT FROM department;

SELECT role.id, role.title, role.salary, department.name
    FROM role 
    JOIN department ON role.department_id = department.id
    ORDER BY role.id ASC;

SELECT  employee.id AS ID,
        employee.first_name AS `FIRST NAME`,
        employee.last_name AS `LAST NAME`,
        role.title AS `TITLE`,
        role.salary AS `SALARY`,
        department.name AS `DEPARTMENT`,
        CONCAT(manager.first_name, " ", manager.last_name) AS `MANAGER NAME`
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;

SELECT  employee.id AS ID,
        employee.first_name AS `FIRST NAME`,
        employee.last_name AS `LAST NAME`,
        role.title AS `TITLE`,
        role.salary AS `SALARY`,
        department.name AS `DEPARTMENT`,
        CONCAT(manager.first_name, " ", manager.last_name) AS `MANAGER NAME`
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    WHERE employee.manager_id = 1;

SELECT  employee.id AS ID,
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
    WHERE department.id = 1;

SELECT SUM(salary) AS "TOTAL DEPARTMENT BUDGET"
    FROM employee
    LEFT JOIN employee manager ON manager.id = employee.manager_id
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id
    WHERE department.id = 1;