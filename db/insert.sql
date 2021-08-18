INSERT INTO department (name)
VALUES  ("what");

-- INSERT INTO role (title, salary, department_id)
--     VALUES (?, ?, ?)

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
--     VALUES  (?, ?, ?, ?)

UPDATE employee
    SET role_id = 9
    WHERE employee.id = ?

UPDATE employee
    SET manager_id = ?
    WHERE employee.id = ?