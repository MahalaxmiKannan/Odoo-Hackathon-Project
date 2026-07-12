const bcrypt = require("bcryptjs");

const employeeRepository = require(
  "../repositories/employee.repository"
);

// Get all employees
const getAllEmployees = async () => {
  return await employeeRepository.getAllEmployees();
};

// Create employee
const createEmployee = async (
  data
) => {
  const existingEmployee =
    await employeeRepository.findByEmail(
      data.email
    );

  if (existingEmployee) {
    throw new Error(
      "Employee email already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(
      data.password,
      10
    );

  const employeeId =
    await employeeRepository.createEmployee(
      {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        department_id:
          data.department_id,
      }
    );

  const employee =
    await employeeRepository.findById(
      employeeId
    );

  // remove password
  delete employee.password;

  return employee;
};

// Update employee
const updateEmployee = async (
  id,
  data
) => {
  const employee =
    await employeeRepository.findById(
      id
    );

  if (!employee) {
    throw new Error(
      "Employee not found"
    );
  }

  await employeeRepository.updateEmployee(
    id,
    data
  );

  const updatedEmployee =
    await employeeRepository.findById(
      id
    );

  delete updatedEmployee.password;

  return updatedEmployee;
};

// Delete employee
const deleteEmployee = async (
  id
) => {
  const employee =
    await employeeRepository.findById(
      id
    );

  if (!employee) {
    throw new Error(
      "Employee not found"
    );
  }

  await employeeRepository.deleteEmployee(
    id
  );

  return {
    message:
      "Employee deleted successfully",
  };
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};