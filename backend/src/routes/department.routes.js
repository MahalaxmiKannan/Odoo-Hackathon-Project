const express = require("express");

const router = express.Router();

const departmentController = require("../controllers/department.controller");

const {
  createDepartmentValidation,
} = require("../validators/department.validator");

const validate = require("../middleware/validate.middleware");

router.get(
  "/",
  departmentController.getAllDepartments
);

router.post(
  "/",
  createDepartmentValidation,
  validate,
  departmentController.createDepartment
);

router.put(
  "/:id",
  createDepartmentValidation,
  validate,
  departmentController.updateDepartment
);

router.delete(
  "/:id",
  departmentController.deleteDepartment
);

module.exports = router;