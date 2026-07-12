import Sidebar from "../components/Sidebar";

const ComingSoon = ({ title }) => (
  <div className="flex min-h-screen bg-gray-100">
    <Sidebar />
    <div className="flex-1 p-8">
      <div className="bg-white rounded-xl shadow p-10">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-gray-600 text-lg">
          This section is coming soon. For now, you can use the dashboard or organization setup pages.
        </p>
      </div>
    </div>
  </div>
);

export default ComingSoon;
