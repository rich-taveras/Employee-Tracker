const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('tu_base_de_datos', 'tu_usuario', 'tu_contraseña', {
  host: 'tu_host',
  dialect: 'mysql'
});

const Department = sequelize.define('Department', {
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

const Role = sequelize.define('Role', {
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

const Employee = sequelize.define('Employee', {
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

function addDepartment(departmentName) {
  Department.create({
    department_name: departmentName
  }).then(() => {
    console.log(`Departamento "${departmentName}" agregado.`);
  });
}

function addRole(title, salary, departmentId) {
  Role.create({
    title: title,
    salary: salary,
    department_id: departmentId
  }).then(() => {
    console.log(`Rol "${title}" agregado.`);
  });
}

function addEmployee(firstName, lastName, roleId, managerId) {
  Employee.create({
    first_name: firstName,
    last_name: lastName,
    role_id: roleId,
    manager_id: managerId
  }).then(() => {
    console.log(`Empleado "${firstName} ${lastName}" agregado.`);
  });
}

function updateEmployeeRole(employeeId, roleId) {
  Employee.update({ role_id: roleId }, { where: { employee_id: employeeId } }).then(() => {
    console.log(`Rol del empleado actualizado.`);
  });
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole
};
