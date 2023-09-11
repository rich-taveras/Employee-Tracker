USE tu_base_de_datos;

SELECT * FROM departments;

SELECT role_id , title, salary, name as department
from role LEFT JOIN 
deparment on department.id= roles.department_id

SELECT employee.id, employee.first_name, employee.last_name, title, name as department, salary, 
CONCAT(bosses.first_name, '', bosses.last_name) as manager
from employee
left join role on employee_id = role.id
left join departments on department.id = role.department_id
left join employee as bosses on employee.manage_id=bosses_id
