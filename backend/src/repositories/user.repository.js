const pool = require("../config/db");
const findByEmail = async (email) => {
  const [rows] = await pool.execute(
    "SELECT * FROM users WHERE email = ?",
    [email]
  );

  return rows[0];
};
const createUser = async (user) => {
  const [result] = await pool.execute(
    `
      INSERT INTO users
      (name,email,password,role)
      VALUES (?,?,?,?)
    `,
    [
      user.name,
      user.email,
      user.password,
      user.role,
    ]
  );

  return result.insertId;
};
const findById = async (id) => {
  const [rows] = await pool.execute(
  `SELECT
      id,
      name,
      email,
      role,
      status,
      department_id,
      created_at,
      updated_at
   FROM users
   WHERE id = ?`,
  [id]
);

  return rows[0];
};
module.exports = {
  findByEmail,
  createUser,
  findById,
};