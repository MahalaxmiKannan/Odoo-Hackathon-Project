const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/category.controller");

const validate = require("../middleware/validate.middleware");

const {
  createCategoryValidation,
  updateCategoryValidation,
} = require("../validators/category.validator");

router.get(
  "/",
  categoryController.getAllCategories
);

router.post(
  "/",
  createCategoryValidation,
  validate,
  categoryController.createCategory
);

router.put(
  "/:id",
  updateCategoryValidation,
  validate,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  categoryController.deleteCategory
);

module.exports = router;