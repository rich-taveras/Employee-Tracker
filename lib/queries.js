const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('tu_base_de_datos', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const Department = sequelize.define('Departments', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  department_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Role = sequelize.define('Roles', {
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salary: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
});

const Employee = sequelize.define('Employees', {
  employee_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Department.hasMany(Role, { foreignKey: 'department_id' });
Role.belongsTo(Department, { foreignKey: 'department_id' });
Role.hasMany(Employee, { foreignKey: 'role_id' });
Employee.belongsTo(Role, { foreignKey: 'role_id' });
Employee.belongsTo(Employee, { foreignKey: 'manager_id', as: 'manager' });

sequelize.sync();

function viewDepartments() {
  Department.findAll().then((departments) => {
    console.table(departments);
  });
}

function viewRoles() {
  Role.findAll().then((roles) => {
    console.table(roles);
  });
}

function viewEmployees() {
  Employee.findAll().then((employees) => {
    console.table(employees);
  });
}

function addDepartment(department_name) {
  Department.create({
    department_name: department_name
  }).then(() => {
    console.log(`Departament "${department_name}" Added.`);
  });
}

function addRole(title, salary, department_id) {
  Role.create({
    title: title,
    salary: salary,
    department_id: department_id
  }).then(() => {
    console.log(`Rol "${title}" Added.`);
  });
}

function addEmployee(firstName, lastName, roleId, managerId) {
  Employee.create({
    first_name: firstName,
    last_name: lastName,
    role_id: roleId,
    manager_id: managerId
  }).then(() => {
    console.log(`Empleado "${firstName} ${lastName}" Added.`);
  });
}

function updateEmployeeRole(employeeId, roleId) {
  Employee.update({ role_id: roleId }, { where: { employee_id: employeeId } }).then(() => {
    console.log(`Rol del empleado actualizado.`);
  });
}

function viewEmployeesByManager(managerId) {
  Employee.findAll({
    where: { manager_id: managerId }
  }).then((employees) => {
    console.table(employees);
  });
}

function viewEmployeesByDepartment(department_id) {
  Employee.findAll({
    include: [
      {
        model: Role,
        include: [Department]
      }
    ],
    where: {
      '$Role.Department.department_id$': department_id
    }
  }).then((employees) => {
    console.table(employees);
  });
}

function deleteDepartment(department_id) {
  Department.destroy({
    where: { department_id: department_id }
  }).then(() => {
    console.log(`Departamento con ID ${department_id} eliminado.`);
  });
}

function deleteRole(roleId) {
  Role.destroy({
    where: { role_id: roleId }
  }).then(() => {
    console.log(`Rol con ID ${roleId} eliminado.`);
  });
}

function deleteEmployee(employeeId) {
  Employee.destroy({
    where: { employee_id: employeeId }
  }).then(() => {
    console.log(`Empleado con ID ${employeeId} eliminado.`);
  });
}

function viewBudgetByDepartment(department_id) {
  Employee.findAll({
    include: [
      {
        model: Role,
        include: [Department]
      }
    ],
    attributes: [
      [sequelize.fn('SUM', sequelize.col('Role.salary')), 'total_budget']
    ],
    where: {
      '$Role.Department.department_id$': department_id
    }
  }).then((result) => {
    console.log(`El presupuesto total para el departamento con ID ${department_id} es: $${result[0].dataValues.total_budget}`);
  });
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  viewEmployeesByManager,
  viewEmployeesByDepartment,
  deleteDepartment,
  deleteRole,
  deleteEmployee,
  viewBudgetByDepartment
};
