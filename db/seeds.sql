USE tu_base_de_datos;

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

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),     -- Employee John Doe with no manager
  ('Jane', 'Smith', 2, 1),      -- Employee Jane Smith managed by John Doe
  ('Alice', 'Johnson', 4, 1),   -- Employee Alice Johnson managed by John Doe
  ('Bob', 'Williams', 3, 2),    -- Employee Bob Williams managed by Jane Smith
  ('Eva', 'Davis', 3, 2);       -- Employee Eva Davis managed by Jane Smith
