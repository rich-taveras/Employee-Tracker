USE employees_db;

INSERT INTO department (name)
VALUES ("Sales"),
       ("Enigneering");

INSERT INTO role (title,salary,department_id)
VALUES ("Sales Lead",100000,1),
       ("Sales Person",80000,1),
       ("Lead Engineer",150000,2),
       ("Software Engineer",120000,2);


INSERT INTO employee (first_name,last_name,role_id)
VALUES ("John","Doe",1),
       ("Mike","Chan",2),
       ("Ashley","Rodriguez",3);

UPDATE   employee SET  manager_id =  1  WHERE id=2; 
