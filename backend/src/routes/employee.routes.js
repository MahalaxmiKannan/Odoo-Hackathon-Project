const express = require("express");

const router = express.Router();

const employeeController = require(
  "../controllers/employee.controller"
);

const validate = require(
  "../middleware/validate.middleware"
);

const {
  createEmployeeValidation,
  updateEmployeeValidation,
} = require(
  "../validators/employee.validator"
);

router.get(
  "/",
  employeeController.getAllEmployees
);

router.post(
  "/",
  createEmployeeValidation,
  validate,
  employeeController.createEmployee
);

router.put(
  "/:id",
  updateEmployeeValidation,
  validate,
  employeeController.updateEmployee
);

router.delete(
  "/:id",
  employeeController.deleteEmployee
);

module.exports = router;