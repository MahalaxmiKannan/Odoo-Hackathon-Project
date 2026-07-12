import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAssets, deleteAsset } from "../services/assetService";
import Button from "../components/Button";
import Input from "../components/Input";

const statusStyles = {
  AVAILABLE: "bg-green-100 text-green-700",
  ALLOCATED: "bg-yellow-100 text-yellow-700",
  MAINTENANCE: "bg-orange-100 text-orange-700",
  RETIRED: "bg-gray-100 text-gray-700",
};

const Assets = () => {
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAssets = async () => {
      setLoading(true);
      try {
        const data = await getAssets();
        setAssets(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load assets.");
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, []);

  const categories = useMemo(() => Array.from(new Set(assets.map((a) => a.category_name || a.category || "Unknown"))), [assets]);
  const statuses = useMemo(() => Array.from(new Set(assets.map((a) => a.status || "AVAILABLE"))), [assets]);
  const departments = useMemo(() => Array.from(new Set(assets.map((a) => a.department || a.location || "Unassigned"))), [assets]);

  const filteredAssets = useMemo(() => {
    const q = (search || "").toLowerCase();
    return assets.filter((asset) => {
      if (q) {
        const hay = `${asset.asset_tag || ""} ${asset.asset_name || ""} ${asset.category_name || ""} ${asset.description || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (filterCategory && asset.category_name !== filterCategory) return false;
      if (filterStatus && asset.status !== filterStatus) return false;
      if (filterDepartment && (asset.department || asset.location) !== filterDepartment) return false;
      return true;
    });
  }, [assets, search, filterCategory, filterStatus, filterDepartment]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    try {
      await deleteAsset(id);
      setAssets((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to delete asset.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="max-w-[1400px] w-full mx-auto">
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Assets</h1>
                <p className="text-gray-600 mt-1">Search, filter, and manage registered assets.</p>
              </div>
              <div className="w-56">
                <Button text="+ Register Asset" type="button" onClick={() => window.alert("Register asset flow coming soon.")} />
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr] items-end mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Search by tag, serial, name or description</label>
                <Input label="" name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Select label="Category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                  <option value="">All categories</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </Select>
                <Select label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="">All statuses</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
                <Select label="Department" value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
                  <option value="">All departments</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          {error && <div className="rounded-xl bg-red-100 border border-red-300 p-4 text-red-700 mb-4">{error}</div>}

          {loading ? (
            <div className="rounded-xl bg-white shadow p-6">Loading assets...</div>
          ) : (
            <div className="overflow-x-auto rounded-xl bg-white shadow p-6 w-full">
              <table className="w-full min-w-[900px] table-auto border-collapse text-sm">
                <thead className="bg-gray-50 text-left text-sm text-gray-500">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Tag</th>
                    <th className="px-4 py-3 whitespace-nowrap">Name</th>
                    <th className="px-4 py-3 whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 whitespace-nowrap">Status</th>
                    <th className="px-4 py-3 whitespace-nowrap">Location</th>
                    <th className="px-4 py-3 whitespace-nowrap">Purchase Date</th>
                    <th className="px-4 py-3 text-right whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.length > 0 ? (
                    filteredAssets.map((asset) => (
                      <tr key={asset.id} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{asset.asset_tag}</td>
                        <td className="px-4 py-3">{asset.asset_name}</td>
                        <td className="px-4 py-3">{asset.category_name}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusStyles[asset.status] ?? "bg-slate-100 text-slate-800"}`}>
                            {asset.status || "AVAILABLE"}
                          </span>
                        </td>
                        <td className="px-4 py-3">{asset.department || asset.location || "Warehouse"}</td>
                        <td className="px-4 py-3 whitespace-nowrap">{asset.purchase_date ? new Date(asset.purchase_date).toLocaleDateString() : "—"}</td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button type="button" className="text-blue-600 hover:underline mr-4" onClick={() => window.alert("Edit asset flow coming soon.")}>Edit</button>
                          <button type="button" className="text-red-600 hover:underline" onClick={() => handleDelete(asset.id)}>Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">No assets found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const Select = ({ label, value, onChange, children }) => (
  <div>
    <label style={{ display: "block", marginBottom: "6px", fontWeight: 600, color: "#374151" }}>{label}</label>
    <select value={value} onChange={onChange} style={{ width: "100%", padding: "10px 12px", border: "1px solid #d1d5db", borderRadius: "10px", backgroundColor: "#ffffff", color: "#111827" }}>
      {children}
    </select>
  </div>
);

export default Assets;
