const pool = require("../config/db");

// Get all allocations
const getAllAllocations = async () => {
  const [rows] = await pool.execute(`
    SELECT
      aa.*,
      a.asset_name,
      a.asset_tag,
      u.name AS employee_name
    FROM asset_allocations aa
    JOIN assets a
      ON aa.asset_id = a.id
    JOIN users u
      ON aa.employee_id = u.id
    ORDER BY aa.id DESC
  `);

  return rows;
};

// Find allocation by ID
const findById = async (id) => {
  const [rows] = await pool.execute(
    `
      SELECT *
      FROM asset_allocations
      WHERE id = ?
    `,
    [id]
  );

  return rows[0];
};

// Check if asset is already allocated
const findActiveAllocationByAsset =
  async (assetId) => {
    const [rows] = await pool.execute(
      `
        SELECT *
        FROM asset_allocations
        WHERE asset_id = ?
        AND status = 'ALLOCATED'
      `,
      [assetId]
    );

    return rows[0];
  };

// Get allocations by employee
const getAllocationsByEmployee =
  async (employeeId) => {
    const [rows] = await pool.execute(
      `
        SELECT
          aa.*,
          a.asset_name,
          a.asset_tag
        FROM asset_allocations aa
        JOIN assets a
          ON aa.asset_id = a.id
        WHERE aa.employee_id = ?
        ORDER BY aa.id DESC
      `,
      [employeeId]
    );

    return rows;
  };

// Create allocation
const createAllocation = async (
  allocation
) => {
  const [result] = await pool.execute(
    `
      INSERT INTO asset_allocations
      (
        asset_id,
        employee_id,
        allocated_date,
        expected_return_date,
        remarks
      )
      VALUES
      (
        ?,
        ?,
        CURDATE(),
        ?,
        ?
      )
    `,
    [
      allocation.asset_id,
      allocation.employee_id,
      allocation.expected_return_date,
      allocation.remarks,
    ]
  );

  return result.insertId;
};

// Return asset
const returnAsset = async (id) => {
  await pool.execute(
    `
      UPDATE asset_allocations
      SET
        status = 'RETURNED',
        returned_date = CURDATE()
      WHERE id = ?
    `,
    [id]
  );
};

module.exports = {
  getAllAllocations,
  findById,
  findActiveAllocationByAsset,
  getAllocationsByEmployee,
  createAllocation,
  returnAsset,
};