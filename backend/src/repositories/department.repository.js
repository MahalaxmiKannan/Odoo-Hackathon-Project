const pool = require("../config/db");
const getAllDepartments = async () => {
  const [rows] = await pool.execute(
    "SELECT * FROM departments"
  );

  return rows;
};
const findById = async (id) => {
  const [rows] = await pool.execute(
    "SELECT * FROM departments WHERE id = ?",
    [id]
  );

  return rows[0];
};
const createDepartment = async (
  department
) => {
  const [result] = await pool.execute(
    `
      INSERT INTO departments
      (name, code)
      VALUES (?, ?)
    `,
    [
      department.name,
      department.code
    ]
  );

  return result.insertId;
};
const updateDepartment = async (
  id,
  department
) => {
  await pool.execute(
    `
      UPDATE departments
      SET name = ?,
          code = ?
      WHERE id = ?
    `,
    [
      department.name,
      department.code,
      id
    ]
  );
};
const deleteDepartment = async (
  id
) => {
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
  createDepartment,
  updateDepartment,
  deleteDepartment
};