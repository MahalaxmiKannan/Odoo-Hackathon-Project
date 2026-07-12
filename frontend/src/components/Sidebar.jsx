import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Organization Setup", path: "/organization/departments" },
    { name: "Assets", path: "/assets" },
    { name: "Allocation & Transfer", path: "/allocation" },
    { name: "Resource Booking", path: "/booking" },
    { name: "Maintenance", path: "/maintenance" },
    { name: "Audit", path: "/audit" },
    { name: "Reports", path: "/reports" },
    { name: "Notifications", path: "/notifications" },
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-lg">

      <h1 className="text-3xl font-bold p-6 border-b">
        AssetFlow
      </h1>

      <ul className="mt-4">

        {menuItems.map((item) => (

          <li key={item.name}>

            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `block mx-4 my-2 p-3 rounded-lg transition ${
                  isActive
                    ? "bg-green-100 font-semibold"
                    : "hover:bg-gray-100"
                }`
              }
            >
              {item.name}
            </NavLink>

          </li>

        ))}

      </ul>

    </div>
  );
};

export default Sidebar;