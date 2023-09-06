-- Create the departments table
CREATE TABLE IF NOT EXISTS departments (
  department_id INT AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- Create the roles table
CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

-- Create the employees table
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);

-- Insert some sample data
INSERT INTO departments (department_name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 80000.00, 1),
  ('Sales Representative', 45000.00, 1),
  ('Software Engineer', 95000.00, 2),
  ('Financial Analyst', 60000.00, 3),
  ('Marketing Coordinator', 55000.00, 4);

-- You can insert some sample employees here if desired
