const employeeService = require("../services/employee.service");

// Get all employees
exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees =
      await employeeService.getAllEmployees();

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    next(error);
  }
};

// Create employee
exports.createEmployee = async (req, res, next) => {
  try {
    const employee =
      await employeeService.createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// Update employee
exports.updateEmployee = async (req, res, next) => {
  try {
    const employee =
      await employeeService.updateEmployee(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    next(error);
  }
};

// Delete employee
exports.deleteEmployee = async (req, res, next) => {
  try {
    const result =
      await employeeService.deleteEmployee(
        req.params.id
      );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};