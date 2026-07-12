const express = require("express");

const router = express.Router();

const allocationController = require(
  "../controllers/allocation.controller"
);

const {
  allocationValidation,
} = require(
  "../validators/allocation.validator"
);

const validate = require(
  "../middleware/validate.middleware"
);

router.get(
  "/",
  allocationController.getAllAllocations
);

router.post(
  "/",
  allocationValidation,
  validate,
  allocationController.createAllocation
);

router.put(
  "/:id/return",
  allocationController.returnAsset
);

router.get(
  "/employee/:id",
  allocationController.getAllocationsByEmployee
);

module.exports = router;