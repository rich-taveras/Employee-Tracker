USE tu_base_de_datos;

SELECT * FROM departments;

SELECT role_id , title, salary, department_name at departments
from role_id LEFT JOIN 
deparment on department.id= roles.department_id