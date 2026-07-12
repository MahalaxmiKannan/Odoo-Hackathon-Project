const pool = require("../config/db");

// Get all employees
const getAllEmployees = async () => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM users
      WHERE role = 'EMPLOYEE'
      ORDER BY id DESC
    `
  );

  return rows;
};

// Find employee by id
const findById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM users
      WHERE id = ?
      AND role = 'EMPLOYEE'
    `,
    [id]
  );

  return rows[0];
};

// Find employee by email
const findByEmail = async (email) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM users
      WHERE email = ?
      AND role = 'EMPLOYEE'
    `,
    [email]
  );

  return rows[0];
};

// Create employee
const createEmployee = async (
  employee
) => {
  const [result] = await pool.execute(
    `
      INSERT INTO users
      (
        name,
        email,
        password,
        role,
        department_id
      )
      VALUES (?, ?, ?, ?, ?)
    `,
    [
      employee.name,
      employee.email,
      employee.password,
      "EMPLOYEE",
      employee.department_id,
    ]
  );

  return result.insertId;
};

// Update employee
const updateEmployee = async (
  id,
  employee
) => {
  await pool.execute(
    `
      UPDATE users
      SET
        name = ?,
        department_id = ?,
        status = ?
      WHERE id = ?
    `,
    [
      employee.name,
      employee.department_id,
      employee.status,
      id,
    ]
  );
};

// Delete employee
const deleteEmployee = async (
  id
) => {
  await pool.execute(
    `
      DELETE FROM users
      WHERE id = ?
    `,
    [id]
  );
};

module.exports = {
  getAllEmployees,
  findById,
  findByEmail,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};