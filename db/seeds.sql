USE employees_db;

INSERT INTO department (name)
VALUES  ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 12000, 1),
        ("Sales", 9000, 1),
        ("Lead Engineer", 12000, 2),
        ("Software Engineer", 8000, 2),
        ("Account Manager", 16000, 3),
        ("Accountant", 12500, 3),
        ("Legal Team", 18000, 4),
        ("Lawyer", 15000, 4);


INSERT INTO employee(first_name,last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, 1),
        ("Ashley", "Rodriguez", 3, NULL),
        ("Kevin", "Tupik", 4, 3),
        ("Kunal", "Singh", 5, NULL),
        ("Malia", "Brown", 6, 5),
        ("Sarah", "Lourd", 7, NULL),
        ("Chefzits", "Allen", 7, 7);

        UPDATE employee SET manager_id =1 WHERE id=2;