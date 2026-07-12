const assetService = require("../services/asset.service");

// Get all assets
exports.getAllAssets = async (req, res) => {
  try {
    const assets = await assetService.getAllAssets();

    res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get asset by ID
exports.getAssetById = async (req, res) => {
  try {
    const asset = await assetService.getAssetById(
      req.params.id
    );

    res.status(200).json({
      success: true,
      data: asset,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

// Create asset
exports.createAsset = async (req, res) => {
  try {
    const asset = await assetService.createAsset(
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Update asset
exports.updateAsset = async (req, res) => {
  try {
    const asset = await assetService.updateAsset(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      data: asset,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete asset
exports.deleteAsset = async (req, res) => {
  try {
    const result = await assetService.deleteAsset(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};