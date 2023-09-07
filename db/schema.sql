
DROP DATABASE IF EXISTS tu_base_de_datos;
CREATE DATABASE  tu_base_de_datos;

USE tu_base_de_datos;

CREATE TABLE departments (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(department_id)
  ON DELETE SET NULL 
);

CREATE TABLE employees (
  employee_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,

  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE SET NULL,

  FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);