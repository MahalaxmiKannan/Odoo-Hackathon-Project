const express = require("express");

const router = express.Router();

const assetController = require(
  "../controllers/asset.controller"
);

const {
  createAssetValidation,
  updateAssetValidation,
} = require("../validators/asset.validator");

const validate = require(
  "../middleware/validate.middleware"
);

const { authenticate } = require("../middleware/auth.middleware");

// Get all assets
router.get(
  "/",
  authenticate,
  assetController.getAllAssets
);

// Get asset by ID
router.get(
  "/:id",
  authenticate,
  assetController.getAssetById
);

// Create asset
router.post(
  "/",
  authenticate,
  createAssetValidation,
  validate,
  assetController.createAsset
);

// Update asset
router.put(
  "/:id",
  authenticate,
  updateAssetValidation,
  validate,
  assetController.updateAsset
);

// Delete asset
router.delete(
  "/:id",
  authenticate,
  assetController.deleteAsset
);

module.exports = router;