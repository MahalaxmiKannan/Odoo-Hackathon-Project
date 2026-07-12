import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getDashboard } from "../services/dashBoardService";

const Dashboard = () => {
  const [overview, setOverview] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const data = await getDashboard();
        setOverview({
          availableAssets: data.availableAssets ?? data.available_assets ?? 0,
          allocatedAssets: data.allocatedAssets ?? data.allocated_assets ?? 0,
          availableResources: data.availableResources ?? data.available_resources ?? 0,
          activeBookings: data.activeBookings ?? data.active_bookings ?? 0,
          pendingTransfers: data.pendingTransfers ?? data.pending_transfers ?? 0,
          upcomingReturns: data.upcomingReturns ?? data.upcoming_returns ?? 0,
        });
        setRecentActivities(data.recentAllocations ?? data.recent_allocations ?? []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

        {error ? (
          <div className="mb-6 rounded-xl bg-red-100 border border-red-300 p-4 text-red-700">
            {error}
          </div>
        ) : null}

        {loading || !overview ? (
          <div className="rounded-xl bg-white shadow p-6">Loading dashboard...</div>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-6 text-gray-700">Today's Overview</h2>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <Card title="Available Assets" value={overview.availableAssets} />
              <Card title="Allocated Assets" value={overview.allocatedAssets} />
              <Card title="Available Resources" value={overview.availableResources} />
              <Card title="Active Bookings" value={overview.activeBookings} />
              <Card title="Pending Transfers" value={overview.pendingTransfers} />
              <Card title="Upcoming Returns" value={overview.upcomingReturns} />
            </div>

            <div className="bg-red-100 border border-red-300 rounded-xl mt-8 p-4">
              <p className="text-red-600 font-semibold">
                3 assets overdue for return - flagged for follow-up
              </p>
            </div>

            <div className="flex flex-col gap-4 md:flex-row mt-8">
              <button className="bg-green-400 hover:bg-green-500 text-white px-6 py-3 rounded-lg">
                + Register Asset
              </button>
              <button className="bg-white border px-6 py-3 rounded-lg hover:bg-gray-100">
                Book Resource
              </button>
              <button className="bg-white border px-6 py-3 rounded-lg hover:bg-gray-100">
                Raise Requests
              </button>
            </div>

            <div className="bg-white rounded-xl shadow mt-10 p-6">
              <h2 className="text-2xl font-bold mb-5">Recent Activity</h2>

              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <p key={index} className="mb-3 border-b pb-2">
                    • {activity.employee_name || activity.asset_name || activity}
                  </p>
                ))
              ) : (
                <p className="text-gray-500">No recent activity available.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h3 className="text-gray-500 text-lg">{title}</h3>
    <p className="text-4xl font-bold mt-4">{value}</p>
  </div>
);

export default Dashboard;
