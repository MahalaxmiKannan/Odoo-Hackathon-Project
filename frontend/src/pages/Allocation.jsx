import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getAllocations, createAllocation, returnAllocation } from "../services/allocationService";
import Button from "../components/Button";
import Input from "../components/Input";

const Allocation = () => {
  const [allocs, setAllocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ asset_id: "", employee_id: "", expected_return_date: "" });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getAllocations();
        setAllocs(data);
      } catch (e) {
        setError(e.response?.data?.message || e.message || "Unable to load allocations.");
      } finally { setLoading(false); }
    })();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const created = await createAllocation(form);
      setAllocs((p) => [created, ...p]);
      setForm({ asset_id: "", employee_id: "", expected_return_date: "" });
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to create allocation.");
    }
  };

  const handleReturn = async (id) => {
    if (!window.confirm("Mark this allocation as returned?")) return;
    try {
      const updated = await returnAllocation(id);
      setAllocs((p) => p.map(a => a.id === id ? updated : a));
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Unable to return asset.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Allocation & Transfer</h1>
              <p className="text-gray-600 mt-1">Allocate assets to employees and process returns.</p>
            </div>
          </div>

          {error && <div className="rounded-xl bg-red-100 border border-red-300 p-4 text-red-700 mb-4">{error}</div>}

          <form className="mb-6 grid sm:grid-cols-3 gap-3" onSubmit={handleCreate}>
            <Input label="Asset ID" name="asset_id" value={form.asset_id} onChange={(e) => setForm({...form, asset_id: e.target.value})} />
            <Input label="Employee ID" name="employee_id" value={form.employee_id} onChange={(e) => setForm({...form, employee_id: e.target.value})} />
            <Input label="Expected return date" name="expected_return_date" type="date" value={form.expected_return_date} onChange={(e) => setForm({...form, expected_return_date: e.target.value})} />
            <div className="sm:col-span-3">
              <Button text="Allocate" type="submit" />
            </div>
          </form>

          {loading ? (
            <div className="rounded-xl bg-white shadow p-6">Loading allocations...</div>
          ) : (
            <div className="rounded-xl bg-white shadow p-6 overflow-x-auto">
              <table className="w-full table-auto text-sm">
                <thead className="bg-gray-50 text-left text-gray-500">
                  <tr>
                    <th className="p-3">Asset</th>
                    <th className="p-3">Employee</th>
                    <th className="p-3">Allocated On</th>
                    <th className="p-3">Expected Return</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allocs.length ? allocs.map(a => (
                    <tr key={a.id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{a.asset_tag || a.asset_name || a.asset_id}</td>
                      <td className="p-3">{a.employee_name || a.employee_id}</td>
                      <td className="p-3">{a.allocated_at ? new Date(a.allocated_at).toLocaleDateString() : "—"}</td>
                      <td className="p-3">{a.expected_return_date ? new Date(a.expected_return_date).toLocaleDateString() : "—"}</td>
                      <td className="p-3">{a.returned ? "Returned" : "Active"}</td>
                      <td className="p-3 text-right">
                        {!a.returned && <button className="text-blue-600 hover:underline mr-3" onClick={() => handleReturn(a.id)}>Return</button>}
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={6} className="p-6 text-center text-gray-500">No allocations found.</td></tr>
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

export default Allocation;
