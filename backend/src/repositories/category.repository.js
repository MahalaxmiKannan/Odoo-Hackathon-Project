const pool = require("../config/db");

// Get all categories
const getAllCategories = async () => {
  const [rows] = await pool.execute(
    `SELECT * FROM categories ORDER BY id DESC`
  );

  return rows;
};

// Find category by ID
const findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM categories WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Find category by name
const findByName = async (name) => {
  const [rows] = await pool.execute(
    `SELECT * FROM categories WHERE name = ?`,
    [name]
  );

  return rows[0];
};

// Create category
const createCategory = async (category) => {
  const [result] = await pool.execute(
    `
      INSERT INTO categories
      (name, description)
      VALUES (?, ?)
    `,
    [
      category.name,
      category.description,
    ]
  );

  return result.insertId;
};

// Update category
const updateCategory = async (
  id,
  category
) => {
  await pool.execute(
    `
      UPDATE categories
      SET
        name = ?,
        description = ?
      WHERE id = ?
    `,
    [
      category.name,
      category.description,
      id,
    ]
  );
};

// Delete category
const deleteCategory = async (id) => {
  await pool.execute(
    `
      DELETE FROM categories
      WHERE id = ?
    `,
    [id]
  );
};

module.exports = {
  getAllCategories,
  findById,
  findByName,
  createCategory,
  updateCategory,
  deleteCategory,
};