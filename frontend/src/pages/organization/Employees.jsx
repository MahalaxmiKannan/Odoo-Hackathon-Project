import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getEmployees } from "../../services/employeeService";

const Employees = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Employees");

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await getEmployees();
        setEmployees(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load employees.");
      } finally {
        setLoading(false);
      }
    };

    loadEmployees();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Organization Setup</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          {['Departments', 'Categories', 'Employees'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                navigate(`/organization/${tab.toLowerCase()}`);
              }}
              className={`px-6 py-2 rounded-lg border font-medium transition ${
                activeTab === tab
                  ? 'bg-green-100 border-green-500'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}

          <button className="ml-auto bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg">
            + Add
          </button>
        </div>

        {error ? (
          <div className="rounded-xl bg-red-100 border border-red-300 p-4 text-red-700 mb-6">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-xl bg-white shadow p-6">Loading employees...</div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Employee</th>
                  <th className="p-4 text-left">Department</th>
                  <th className="p-4 text-left">Designation</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{emp.name || emp.full_name || "Unnamed"}</td>
                    <td className="p-4">{emp.department || emp.department_name || "—"}</td>
                    <td className="p-4">{emp.designation || emp.role || "—"}</td>
                    <td className="p-4 text-center">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        (emp.status || "Active") === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {emp.status || "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <hr className="my-8" />
        <p className="text-gray-500 italic">
          Employees listed here can be assigned assets and make bookings.
        </p>
      </div>
    </div>
  );
};

export default Employees;
