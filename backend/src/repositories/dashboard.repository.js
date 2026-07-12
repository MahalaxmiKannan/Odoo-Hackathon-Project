const pool = require("../config/db");

// Dashboard statistics
const getDashboardStats = async () => {
  const [[totalAssets]] =
    await pool.execute(
      `
        SELECT COUNT(*) AS count
        FROM assets
      `
    );

  const [[availableAssets]] =
    await pool.execute(
      `
        SELECT COUNT(*) AS count
        FROM assets
        WHERE status = 'AVAILABLE'
      `
    );

  const [[allocatedAssets]] =
    await pool.execute(
      `
        SELECT COUNT(*) AS count
        FROM assets
        WHERE status = 'ALLOCATED'
      `
    );

  const [[maintenanceAssets]] =
    await pool.execute(
      `
        SELECT COUNT(*) AS count
        FROM assets
        WHERE status = 'MAINTENANCE'
      `
    );

  const [[totalEmployees]] =
    await pool.execute(
      `
        SELECT COUNT(*) AS count
        FROM users
        WHERE role = 'EMPLOYEE'
      `
    );

  const [[totalDepartments]] =
    await pool.execute(
      `
        SELECT COUNT(*) AS count
        FROM departments
      `
    );

  return {
    totalAssets: totalAssets.count,
    availableAssets:
      availableAssets.count,
    allocatedAssets:
      allocatedAssets.count,
    maintenanceAssets:
      maintenanceAssets.count,
    totalEmployees:
      totalEmployees.count,
    totalDepartments:
      totalDepartments.count,
  };
};

// Recent allocations
const getRecentAllocations =
  async () => {
    const [rows] =
      await pool.execute(
        `
          SELECT
            aa.id,
            a.asset_name,
            a.asset_tag,
            u.name AS employee_name,
            aa.allocated_date,
            aa.status
          FROM asset_allocations aa
          JOIN assets a
            ON aa.asset_id = a.id
          JOIN users u
            ON aa.employee_id = u.id
          ORDER BY aa.id DESC
          LIMIT 5
        `
      );

    return rows;
  };

module.exports = {
  getDashboardStats,
  getRecentAllocations,
};