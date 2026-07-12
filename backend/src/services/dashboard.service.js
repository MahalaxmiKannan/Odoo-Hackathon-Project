const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboard = async () => {
  const stats = await dashboardRepository.getDashboardStats();
  const recentAllocations =
    await dashboardRepository.getRecentAllocations();

  return {
    ...stats,
    recentAllocations,
  };
};

module.exports = {
  getDashboard,
};