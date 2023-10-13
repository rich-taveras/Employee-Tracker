// const { log } = require("console");
const inquirer = require("inquirer");
const mysql = require("mysql2");
const { printTable } = require("console-table-printer");
require("dotenv").config();

// const db = require("./server");

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
});

db.connect(() => {
  mainSelection();
});

console.log("********************");
console.log("*                  *");
console.log("* EMPLOYEE TRACKER *");
console.log("*                  *");
console.log("********************");

function mainSelection() {
  inquirer
    .prompt({
      type: "list",
      message: "What would you like to do? ↑ ↓",
      name: "selection",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "View Employee By Department",
        "Update Employee Role",
        "Update employees Manager",
        "Add Employee",
        "Add Departments",
        "Add Role",
        "Delete Departments",
        "Delete Roles",
        "Delete Employees",
        "Quit",
      ],
    })
    .then((answer) => {
      if (answer.selection === "View All Employees") {
        viewAllEmployee();
      } else if (answer.selection === "View All Departments") {
        viewAllDepartment();
      } else if (answer.selection === "View All Roles") {
        viewAllRole();
      } else if (answer.selection === "View Employee By Department") {
        viewEmployeeByDepartment();
      } else if (answer.selection === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answer.selection === "Update employees Manager") {
        updateEmployeeManager();
      } else if (answer.selection === "Add Employee") {
        addEmployee();
      } else if (answer.selection === "Add Departments") {
        addDepartments();
      } else if (answer.selection === "Add Role") {
        addRole();
      } else if (answer.selection === "Delete Departments") {
        deleteDepartment();
      } else if (answer.selection === "Delete Roles") {
        deleteRoles();
      } else if (answer.selection === "Delete Employees") {
        deleteEmployees();
      } else if (answer.selection === "Quit") {
        quit();
      }
    });
}

function viewAllEmployee() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, title, name AS department, salary, CONCAT( bosses.first_name, ' ',bosses.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON department.id  = role.department_id LEFT JOIN employee AS bosses ON employee.manager_id = bosses.id",
    (err, data) => {
      printTable(data);
      mainSelection();
    }
  );
}

function viewAllDepartment() {
  db.query("SELECT * FROM department", function (err, data) {
    printTable(data);
    mainSelection();
  });
}

function viewAllRole() {
  db.query(
    "SELECT role.id, title, salary, name AS department FROM role LEFT JOIN department ON department.id = role.department_id",
    function (err, data) {
      printTable(data);
      mainSelection();
    }
  );
}

function viewEmployeeByDepartment() {
  db.query(
    "SELECT employee.first_name, employee.last_name, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id",
    function (err, data) {
      printTable(data);
      mainSelection();
    }
  );
}

function updateEmployeeRole() {
  db.query("SELECT id AS value, title as name FROM role", (err, roleData) => {
    db.query(
      "SELECT id AS value, CONCAT(first_name, ' ',last_name) AS name FROM employee",
      (err, employeeData) => {
        inquirer
          .prompt([
            {
              type: "list",
              message: "Choose the following title",
              name: "title_id",
              choices: roleData,
            },
            {
              type: "list",
              message: "Choose the following Employee",
              name: "employee_id",
              choices: employeeData,
            },
          ])
          .then((answer) => {
            db.query(
              "Update employee SET role_id = ? WHERE id = ?",
              [answer.title_id, answer.employee_id],
              (err) => {
                viewAllEmployee();
                mainSelection();;
              }
            );
          });
      }
    );
  });
}

function updateEmployeeManager() {
  db.query(
    "SELECT id AS value, CONCAT(first_name, ' ',last_name) AS name FROM employee",
    (err, managerData) => {
      db.query(
        "SELECT id AS value, CONCAT(first_name, ' ',last_name) AS name FROM employee",
        (err, employeeData) => {
          inquirer
            .prompt([
              {
                type: "list",
                message: "Choose the following employee",
                name: "employee_id",
                choices: employeeData,
              },
              {
                type: "list",
                message: "Choose the following Manager",
                name: "manager_id",
                choices: managerData,
              },
            ])
            .then((answer) => {
              db.query(
                "Update employee SET manager_id = ? WHERE id = ?",
                [answer.manager_id, answer.employee_id],
                (err) => {
                  viewAllEmployee();
                  mainSelection();
                }
              );
            });
        }
      );
    }
  );
}

function addEmployee() {
  db.query("SELECT id AS value, title as name FROM role", (err, roleData) => {
    db.query(
      "SELECT id AS value, CONCAT(first_name, ' ',last_name) AS name FROM employee WHERE manager_id is null",
      (err, managerData) => {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What is your First Name",
              name: "first_name",
            },
            {
              type: "input",
              message: "What is your Last Name",
              name: "last_name",
            },
            {
              type: "list",
              message: "Choose the following title",
              name: "role_id",
              choices: roleData,
            },
            {
              type: "list",
              message: "Choose the following Manager",
              name: "manager_id",
              choices: managerData,
            },
          ])
          .then((answer) => {
            db.query(
              "INSERT INTO employee (first_name,last_name, role_id, manager_id) VALUES (?,?,?,?)",
              [
                answer.first_name,
                answer.last_name,
                answer.role_id,
                answer.manager_id,
              ],
              (err) => {
                viewAllEmployee();
              }
            );
          });
      }
    );
  });
}

function addDepartments() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What department do you want to add?",
        name: "departmentName",
        validate: (departmentName) => {
          if (departmentName) {
            return true;
          } else return false;
        },
      },
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.departmentName],
        (err) => {
          viewAllDepartment();
        }
      );
    });
}

function addRole() {
  db.query("SELECT * FROM department", (err, departmentData) => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the title of the Role?",
          name: "role",
          validate: (role) => {
            if (role) {
              return true;
            } else console.log("Please enter a role");
            return false;
          },
        },
        {
          type: "input",
          message: "What is the salary of the Role?",
          name: "salary",
          validate: (salary) => {
            if (salary) {
              return true;
            } else console.log("Please enter a Salary");
            return false;
          },
        },
        {
          type: "list",
          message: "Wich department does the role belong to?",
          name: "department",
          choices: departmentData,
        },
      ])
      .then((answer) => {
        db.query(
          `INSERT INTO role (title, salary, department_id) VALUES ("${answer.role}",${answer.salary},(SELECT id from department WHERE name = "${answer.department}"))`,
          (err) => {
            viewAllRole();
          }
        );
      });
  });
}

function deleteDepartment() {
  db.query("SELECT * FROM department", (err, departmentData) => {
    inquirer
      .prompt({
        type: "list",
        message: "Select the department to Delete",
        name: "department",
        choices: departmentData,
      })
      .then((answer) => {
        db.query(
          `DELETE FROM department WHERE name = "${answer.department}"`,
          (err) => {
            viewAllDepartment();
          }
        );
      });
  });
}

function deleteRoles() {
  db.query("SELECT id AS value, title as name FROM role", (err, roleData) => {
    inquirer
      .prompt({
        type: "list",
        message: "Select the role to delete",
        name: "roleName",
        choices: roleData,
      })
      .then((answer) => {
        db.query(`DELETE FROM role WHERE id = "${answer.roleName}"`, (err) => {
          viewAllRole();
        });
      });
  });
}

function deleteEmployees() {
  db.query(
    "SELECT id AS value, CONCAT(first_name, ' ',last_name) AS name FROM employee",
    (err, employeeData) => {
      inquirer
        .prompt({
          type: "list",
          message: "Select the employee to delete",
          name: "employeeName",
          choices: employeeData,
        })
        .then((answer) => {
          db.query(
            `DELETE FROM employee WHERE id = "${answer.employeeName}"`,
            (err) => {
              viewAllEmployee();
            }
          );
        });
    }
  );
}

function quit() {
  console.log("Goodbye!");
  process.exit();
}
