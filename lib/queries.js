const mysql = require('mysql2');

// Configure the database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'tu_base_de_datos'
});

// Function to view all departments
function viewDepartments() {
  const query = 'SELECT department_id, department_name FROM departments';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching departments:', err);
      return;
    }

    // Create an array of objects to format the results as a table
    const formattedDepartments = results.map((department) => ({
      'Department ID': department.department_id,
      'Department Name': department.department_name
    }));

    console.log('\nAll Departments:');
    // Display the formatted table in the console
    console.table(formattedDepartments);

    mainMenu();
  });
}

// Add other functions like viewRoles, addDepartment, etc. here

// Export the necessary functions
module.exports = {
  viewDepartments,
  // Export other functions as needed
};
