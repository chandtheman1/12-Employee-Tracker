SELECT department.id AS ID, department.name AS DEPARTMENT FROM department;

SELECT role.id, role.title, role.salary, department.name
    FROM role 
    JOIN department ON role.department_id = department.id
    ORDER BY role.id ASC;

SELECT *
    FROM employee
    INNER JOIN role ON employee.role_id = role.id
    INNER JOIN department ON role.department_id = department.id;