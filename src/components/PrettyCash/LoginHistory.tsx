// components/PettyCash/LoginHistory.tsx
const LoginHistory = () => {
  const logs = [
    { id: 1, user: "Super Admin", time: "2026-02-15 09:30 AM", ip: "192.168.1.100", status: "Success" },
    { id: 2, user: "Shahid", time: "2026-02-15 08:15 AM", ip: "192.168.1.101", status: "Success" },
    { id: 3, user: "Ali", time: "2026-02-14 05:45 PM", ip: "192.168.1.102", status: "Failed" },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left">User</th>
          <th className="px-4 py-2 text-left">Time</th>
          <th className="px-4 py-2 text-left">IP Address</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {logs.map(log => (
          <tr key={log.id}>
            <td className="px-4 py-2">{log.user}</td>
            <td className="px-4 py-2">{log.time}</td>
            <td className="px-4 py-2">{log.ip}</td>
            <td className="px-4 py-2">
              <span className={`px-2 py-1 text-xs rounded-full ${log.status === "Success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {log.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoginHistory;