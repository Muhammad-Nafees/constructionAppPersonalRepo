// components/PettyCash/MonthlyReport.tsx
import { useState } from "react";

const MonthlyReport = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().substring(0, 7));

  // Sample data
  const data = [
    { site: "BWD5", amount: 350000 },
    { site: "Lakhani", amount: 280000 },
    { site: "IT Park", amount: 450000 },
  ];

  return (
    <div className="space-y-4">
      <input type="month" className="px-4 py-2 border rounded-lg" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} />
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Site</th>
            <th className="px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.site}>
              <td className="px-4 py-2">{item.site}</td>
              <td className="px-4 py-2 text-right">Rs. {item.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MonthlyReport;