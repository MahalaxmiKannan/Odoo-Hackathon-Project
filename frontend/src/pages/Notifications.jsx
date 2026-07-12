import { useEffect, useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { getNotificationsByUser, markAsRead } from "../services/notificationService";
import { AuthContext } from "../context/AuthContext";

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const resolveUserId = () => {
      if (user) return user.id || user.user_id || user.userId;
      try {
        const raw = localStorage.getItem("user");
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        return parsed?.id || parsed?.user_id || parsed?.userId || null;
      } catch {
        return null;
      }
    };

    const userId = resolveUserId();
    if (!userId) {
      // no user id: try to fetch all notifications (maybe admin) or show none
      (async () => {
        setLoading(true);
        try {
          const all = await import("../services/notificationService").then(m => m.getAllNotifications());
          setNotes(all);
        } catch (e) {
          console.error("Notifications fetch error:", e);
          setError(e.response?.data?.message || e.message || "Unable to load notifications.");
        } finally { setLoading(false); }
      })();
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const data = await getNotificationsByUser(userId);
        setNotes(data);
      } catch (e) {
        console.error("Notifications fetch error:", e);
        setError(e.response?.data?.message || e.message || "Unable to load notifications.");
      } finally { setLoading(false); }
    })();
  }, [user]);

  const handleMark = async (id) => {
    try {
      await markAsRead(id);
      setNotes((p) => p.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (e) {
      setError(e.response?.data?.message || e.message || "Unable to mark as read.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="max-w-[900px] w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600 mb-6">Your recent notifications and alerts.</p>

          {error && <div className="rounded-xl bg-red-100 border border-red-300 p-4 text-red-700 mb-4">{error}</div>}

          {loading ? (
            <div className="rounded-xl bg-white shadow p-6">Loading notifications...</div>
          ) : (
            <div className="rounded-xl bg-white shadow p-6">
              {notes.length ? (
                <ul>
                  {notes.map(n => (
                    <li key={n.id} className={`p-4 border-b ${n.read ? 'bg-white' : 'bg-gray-50'}`}>
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{n.title || 'Notification'}</div>
                          <div className="text-sm text-gray-600">{n.message}</div>
                        </div>
                        <div className="text-sm text-gray-500">{n.created_at ? new Date(n.created_at).toLocaleString() : ''}</div>
                      </div>
                      {!n.read && <div className="mt-2"><button className="text-blue-600 hover:underline" onClick={() => handleMark(n.id)}>Mark as read</button></div>}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center text-gray-500">No notifications.</div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
