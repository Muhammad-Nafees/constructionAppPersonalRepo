// pages/PettyCash/Dashboard.tsx
import { useState } from "react";

interface SiteSummary {
  id: number;
  name: string;
  allocatedAmount: number;
  spentAmount: number;
  remainingBalance: number;
}

const PettyCashDashboard = () => {
  const [sites] = useState<SiteSummary[]>([
    { id: 1, name: "BWD5", allocatedAmount: 500000, spentAmount: 350000, remainingBalance: 150000 },
    { id: 2, name: "Lakhani", allocatedAmount: 300000, spentAmount: 280000, remainingBalance: 20000 },
    { id: 3, name: "IT Park", allocatedAmount: 800000, spentAmount: 450000, remainingBalance: 350000 },
  ]);

  const totalAllocated = sites.reduce((sum, s) => sum + s.allocatedAmount, 0);
  const totalSpent = sites.reduce((sum, s) => sum + s.spentAmount, 0);
  const totalRemaining = sites.reduce((sum, s) => sum + s.remainingBalance, 0);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Petty Cash Dashboard</h2>
      <p className="text-gray-500">Overview of site-wise expenses</p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <p className="text-sm opacity-90">Total Allocated</p>
          <p className="text-3xl font-bold mt-2">Rs. {totalAllocated.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl text-white">
          <p className="text-sm opacity-90">Total Spent</p>
          <p className="text-3xl font-bold mt-2">Rs. {totalSpent.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl text-white">
          <p className="text-sm opacity-90">Remaining Balance</p>
          <p className="text-3xl font-bold mt-2">Rs. {totalRemaining.toLocaleString()}</p>
        </div>
      </div>

      {/* Site-wise Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">Site Name</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500">Allocated Amount</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500">Spent Amount</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500">Remaining Balance</th>
            </tr>
          </thead>
          <tbody>
            {sites.map(site => (
              <tr key={site.id}>
                <td className="px-6 py-4 text-sm font-medium">{site.name}</td>
                <td className="px-6 py-4 text-sm text-right text-blue-600">Rs. {site.allocatedAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right text-red-600">Rs. {site.spentAmount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-right text-green-600">Rs. {site.remainingBalance.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PettyCashDashboard;