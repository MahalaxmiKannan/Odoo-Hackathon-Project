import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { getCategories } from "../../services/categoryService";

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("Categories");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
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
          <div className="rounded-xl bg-white shadow p-6">Loading categories...</div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Category</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-center">Assets</th>
                  <th className="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{cat.name || cat.category}</td>
                    <td className="p-4">{cat.description || cat.details || "—"}</td>
                    <td className="p-4 text-center">{cat.assetCount ?? cat.asset_count ?? 0}</td>
                    <td className="p-4 text-center">
                      <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                        (cat.status || "Active") === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}>
                        {cat.status || "Active"}
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
          Categories help classify assets throughout the system.
        </p>
      </div>
    </div>
  );
};

export default Categories;
