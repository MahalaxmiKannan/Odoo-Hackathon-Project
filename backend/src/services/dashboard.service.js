const dashboardRepository =
  require(
    "../repositories/dashboard.repository"
  );

const getDashboardStats =
  async () => {
    return await dashboardRepository.getDashboardStats();
  };

const getRecentAllocations =
  async () => {
    return await dashboardRepository.getRecentAllocations();
  };

module.exports = {
  getDashboardStats,
  getRecentAllocations,
};