const pool = require("../config/db");

// Get all assets
const getAllAssets = async () => {
  const [rows] = await pool.execute(`
    SELECT
      a.*,
      c.name AS category_name
    FROM assets a
    JOIN categories c
      ON a.category_id = c.id
    ORDER BY a.id DESC
  `);

  return rows;
};

// Find asset by ID
const findById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT
        a.*,
        c.name AS category_name
      FROM assets a
      JOIN categories c
        ON a.category_id = c.id
      WHERE a.id = ?
    `,
    [id]
  );

  return rows[0];
};

// Find asset by asset tag
const findByAssetTag = async (assetTag) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM assets
      WHERE asset_tag = ?
    `,
    [assetTag]
  );

  return rows[0];
};

// Get latest asset by prefix
const getLatestAssetByPrefix = async (prefix) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM assets
      WHERE asset_tag LIKE ?
      ORDER BY id DESC
      LIMIT 1
    `,
    [`${prefix}%`]
  );

  return rows[0];
};

// Create asset
const createAsset = async (asset) => {
  const [result] = await pool.execute(
    `
      INSERT INTO assets
      (
        asset_tag,
        asset_name,
        description,
        category_id,
        purchase_date,
        purchase_cost
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [
      asset.asset_tag,
      asset.asset_name,
      asset.description,
      asset.category_id,
      asset.purchase_date,
      asset.purchase_cost,
    ]
  );

  return result.insertId;
};

// Update asset
const updateAsset = async (id, asset) => {
  await pool.execute(
    `
      UPDATE assets
      SET
        asset_name = ?,
        description = ?,
        category_id = ?,
        purchase_date = ?,
        purchase_cost = ?,
        status = ?
      WHERE id = ?
    `,
    [
      asset.asset_name,
      asset.description,
      asset.category_id,
      asset.purchase_date,
      asset.purchase_cost,
      asset.status,
      id,
    ]
  );
};

// Delete asset
const deleteAsset = async (id) => {
  await pool.execute(
    `
      DELETE FROM assets
      WHERE id = ?
    `,
    [id]
  );
};

module.exports = {
  getAllAssets,
  findById,
  findByAssetTag,
  getLatestAssetByPrefix,
  createAsset,
  updateAsset,
  deleteAsset,
};