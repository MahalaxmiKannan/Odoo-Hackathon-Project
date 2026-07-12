const pool = require("../config/db");

// Get all departments
const getAllDepartments = async () => {
  const [rows] = await pool.execute(
    `SELECT * FROM departments ORDER BY id DESC`
  );

  return rows;
};

// Find department by ID
const findById = async (id) => {
  const [rows] = await pool.execute(
    `SELECT * FROM departments WHERE id = ?`,
    [id]
  );

  return rows[0];
};

// Find department by code
const findByCode = async (code) => {
  const [rows] = await pool.execute(
    `SELECT * FROM departments WHERE code = ?`,
    [code]
  );

  return rows[0];
};

// Create department
const createDepartment = async (department) => {
  const [result] = await pool.execute(
    `
      INSERT INTO departments
      (name, code)
      VALUES (?, ?)
    `,
    [department.name, department.code]
  );

  return result.insertId;
};

// Update department
const updateDepartment = async (
  id,
  department
) => {
  await pool.execute(
    `
      UPDATE departments
      SET
        name = ?,
        code = ?
      WHERE id = ?
    `,
    [
      department.name,
      department.code,
      id,
    ]
  );
};

// Delete department
const deleteDepartment = async (id) => {
  await pool.execute(
    `
      DELETE FROM departments
      WHERE id = ?
    `,
    [id]
  );
};

module.exports = {
  getAllDepartments,
  findById,
  findByCode,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};