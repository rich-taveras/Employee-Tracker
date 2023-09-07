const inquirer = require('inquirer');
const {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
} = require('./lib/queries');

// Main menu function
function mainMenu() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menuChoice',
        message: 'Select an option:',
        choices: [
          'View departments',
          'View roles',
          'View employees',
          'Add department',
          'Add role',
          'Add employee',
          'Update employee role',
          'Exit'
        ]
      }
    ])
    .then((answers) => {
      switch (answers.menuChoice) {
        case 'View departments':
          viewDepartments();
          break;
        case 'View roles':
          viewRoles();
          break;
        case 'View employees':
          viewEmployees();
          break;
        case 'Add department':
          addDepartment();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Update employee role':
          updateEmployeeRole();
          break;
        case 'Exit':
          console.log('Goodbye!');
          process.exit(0);
      }
    });
}

// Start the application
mainMenu();
