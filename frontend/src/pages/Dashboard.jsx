import { useState } from "react";

const Dashboard = () => {

    const [overview] = useState({
        availableAssets: 128,
        allocatedAssets: 76,
        availableResources: 4,
        activeBookings: 9,
        pendingTransfers: 3,
        upcomingReturns: 12
    });

    const recentActivities = [
        "Laptop AF-0114 allocated to Priya Shah - IT Dept",
        "Room B2 booking confirmed - 2:00 PM to 3:00 PM",
        "Projector AF-0062 maintenance resolved"
    ];

    const menuItems = [
        "Dashboard",
        "Organization Setup",
        "Assets",
        "Allocation & Transfer",
        "Resource Booking",
        "Maintenance",
        "Audit",
        "Reports",
        "Notifications"
    ];

    return (

        <div className="flex h-screen bg-gray-100">

            {/* Sidebar */}

            <div className="w-64 bg-white shadow-lg">

                <h1 className="text-3xl font-bold p-6 border-b">
                    AssetFlow
                </h1>

                <ul className="mt-4">

                    {menuItems.map((item, index) => (

                        <li
                            key={index}
                            className={`mx-4 my-2 p-3 rounded-lg cursor-pointer transition

                            ${
                                item === "Dashboard"
                                    ? "bg-green-100 font-semibold"
                                    : "hover:bg-gray-100"
                            }`}
                        >

                            {item}

                        </li>

                    ))}

                </ul>

            </div>

            {/* Main Content */}

            <div className="flex-1 overflow-y-auto p-8">

                <h2 className="text-3xl font-bold mb-8">
                    Today's Overview
                </h2>

                {/* Cards */}

                <div className="grid grid-cols-3 gap-6">

                    <Card
                        title="Available Assets"
                        value={overview.availableAssets}
                    />

                    <Card
                        title="Allocated Assets"
                        value={overview.allocatedAssets}
                    />

                    <Card
                        title="Available Resources"
                        value={overview.availableResources}
                    />

                    <Card
                        title="Active Bookings"
                        value={overview.activeBookings}
                    />

                    <Card
                        title="Pending Transfers"
                        value={overview.pendingTransfers}
                    />

                    <Card
                        title="Upcoming Returns"
                        value={overview.upcomingReturns}
                    />

                </div>

                {/* Alert */}

                <div className="bg-red-100 border border-red-300 rounded-xl mt-8 p-4">

                    <p className="text-red-600 font-semibold">

                        3 Assets overdue for return - flagged for follow-up

                    </p>

                </div>

                {/* Buttons */}

                <div className="flex gap-5 mt-8">

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

                {/* Recent Activity */}

                <div className="bg-white rounded-xl shadow mt-10 p-6">

                    <h2 className="text-2xl font-bold mb-5">

                        Recent Activity

                    </h2>

                    {recentActivities.map((activity, index) => (

                        <p
                            key={index}
                            className="mb-3 border-b pb-2"
                        >

                            • {activity}

                        </p>

                    ))}

                </div>

            </div>

        </div>

    );

};

const Card = ({ title, value }) => {

    return (

        <div className="bg-white rounded-xl shadow p-6">

            <h3 className="text-gray-500 text-lg">

                {title}

            </h3>

            <p className="text-4xl font-bold mt-4">

                {value}

            </p>

        </div>

    );

};

export default Dashboard;