SELECT department.id AS ID, department.name AS DEPARTMENT FROM department;

SELECT role.id, role.title, role.salary, department.name
    FROM role 
    JOIN department ON role.department_id = department.id
    ORDER BY role.id ASC;

SELECT  employee.id AS ID,
        employee.first_name AS `FIRST NAME`,
        employee.last_name AS `LAST NAME`,
        employee.manager_id,
        role.title AS `TITLE`,
        role.salary AS `SALARY`,
        department.name AS `DEPARTMENT`
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;