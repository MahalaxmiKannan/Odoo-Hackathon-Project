const assetRepository = require(
  "../repositories/asset.repository"
);

const categoryRepository = require(
  "../repositories/category.repository"
);

// Generate Asset Tag
const generateAssetTag = async (
  categoryName
) => {
  const prefix = categoryName
    .substring(0, 3)
    .toUpperCase();

  const latestAsset =
    await assetRepository.getLatestAssetByPrefix(
      prefix
    );

  if (!latestAsset) {
    return `${prefix}-001`;
  }

  const latestNumber = parseInt(
    latestAsset.asset_tag.split("-")[1]
  );

  const nextNumber =
    latestNumber + 1;

  return `${prefix}-${String(
    nextNumber
  ).padStart(3, "0")}`;
};

// Get all assets
const getAllAssets = async () => {
  return await assetRepository.getAllAssets();
};

// Create asset
const createAsset = async (
  data
) => {
  const category =
    await categoryRepository.findById(
      data.category_id
    );

  if (!category) {
    throw new Error(
      "Category not found"
    );
  }

  const assetTag =
    await generateAssetTag(
      category.name
    );

  const assetId =
    await assetRepository.createAsset({
      asset_tag: assetTag,
      asset_name: data.asset_name,
      description: data.description,
      category_id: data.category_id,
      purchase_date:
        data.purchase_date,
      purchase_cost:
        data.purchase_cost,
    });

  return await assetRepository.findById(
    assetId
  );
};

// Update asset
const updateAsset = async (
  id,
  data
) => {
  const asset =
    await assetRepository.findById(
      id
    );

  if (!asset) {
    throw new Error(
      "Asset not found"
    );
  }

  await assetRepository.updateAsset(
    id,
    data
  );

  return await assetRepository.findById(
    id
  );
};

// Delete asset
const deleteAsset = async (
  id
) => {
  const asset =
    await assetRepository.findById(
      id
    );

  if (!asset) {
    throw new Error(
      "Asset not found"
    );
  }

  await assetRepository.deleteAsset(
    id
  );

  return {
    message:
      "Asset deleted successfully",
  };
};

module.exports = {
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset,
};