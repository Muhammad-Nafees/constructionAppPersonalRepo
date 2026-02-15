// components/PettyCash/DataChangeHistory.tsx
const DataChangeHistory = () => {
  const changes = [
    { id: 1, user: "Shahid", action: "Added Expense", details: "Rs. 45,000 - Material", time: "2026-02-15 10:30 AM" },
    { id: 2, user: "Ali", action: "Updated Site", details: "Lakhani - Budget changed", time: "2026-02-15 09:15 AM" },
    { id: 3, user: "Super Admin", action: "Added User", details: "New user: Sara", time: "2026-02-14 04:20 PM" },
  ];

  return (
    <table className="w-full">
      <thead>
        <tr className="bg-gray-50">
          <th className="px-4 py-2 text-left">User</th>
          <th className="px-4 py-2 text-left">Action</th>
          <th className="px-4 py-2 text-left">Details</th>
          <th className="px-4 py-2 text-left">Time</th>
        </tr>
      </thead>
      <tbody>
        {changes.map(change => (
          <tr key={change.id}>
            <td className="px-4 py-2">{change.user}</td>
            <td className="px-4 py-2">{change.action}</td>
            <td className="px-4 py-2">{change.details}</td>
            <td className="px-4 py-2">{change.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataChangeHistory;