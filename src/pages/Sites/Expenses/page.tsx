// pages/PettyCash/Expenses/index.tsx
import { useState } from "react";
 
// const EXPENSE_HEADS = [
//   "Material", "Labour", "Transport", "Equipment Rental",
//   "Food", "Fuel", "Miscellaneous"
// ];

interface PettyExpense {
  id: number;
  date: string;
  site: string;
  expenseHead: string;
  description: string;
  amount: number;
  bill?: string;
};


const PettyExpenses = () => {
  // const [expenses, setExpenses] = useState<PettyExpense[]>([
  //   { id: 1, date: "2026-02-15", site: "BWD5", expenseHead: "Material", description: "Cement", amount: 45000 },
  //   { id: 2, date: "2026-02-14", site: "Lakhani", expenseHead: "Labour", description: "Daily Wages", amount: 25000 },
  // ]);

  const expenses: PettyExpense[] =  [ { id: 1, date: "2026-02-15", site: "BWD5", expenseHead: "Material", description: "Cement", amount: 45000 },
    { id: 2, date: "2026-02-14", site: "Lakhani", expenseHead: "Labour", description: "Daily Wages", amount: 25000 }];
    
  // const [showAddModal, setShowAddModal] = useState(false);
  const [selectedSite, setSelectedSite] = useState<string>("all");

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const siteTotals = [...new Set(expenses.map(e => e.site))].map(site => ({
    site,
    total: expenses.filter(e => e.site === site).reduce((sum, e) => sum + e.amount, 0)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Site Expenses</h2>
        <button 
        // onClick={() => setShowAddModal(true)}
         className="px-4 py-2 bg-[#F47521] text-white rounded-lg">
          + Add Expense
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Site Expenses</p>
          <p className="text-2xl font-bold text-red-600">Rs. {totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Active Sites</p>
          <p className="text-2xl font-bold text-gray-900">{siteTotals.length}</p>
        </div>
      </div>

      {/* Site-wise Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {siteTotals.map(site => (
          <div key={site.site} className="bg-white p-4 rounded-xl border">
            <p className="font-medium">{site.site}</p>
            <p className="text-lg font-bold text-red-600 mt-1">Rs. {site.total.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border flex gap-4">
        <select className="px-3 py-2 border rounded-lg" value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
          <option value="all">All Sites</option>
          {[...new Set(expenses.map(e => e.site))].map(site => <option key={site}>{site}</option>)}
        </select>
        <input type="date" className="px-3 py-2 border rounded-lg" placeholder="From" />
        <input type="date" className="px-3 py-2 border rounded-lg" placeholder="To" />
        <button className="px-4 py-2 bg-gray-100 rounded-lg">Apply</button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Site</th>
              <th className="px-4 py-3 text-left">Expense Head</th>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-left">Bill</th>
            </tr>
          </thead>
          <tbody>
            {expenses.filter(e => selectedSite === "all" || e.site === selectedSite).map(exp => (
              <tr key={exp.id}>
                <td className="px-4 py-3 text-sm">{exp.date}</td>
                <td className="px-4 py-3 text-sm">{exp.site}</td>
                <td className="px-4 py-3 text-sm">{exp.expenseHead}</td>
                <td className="px-4 py-3 text-sm">{exp.description}</td>
                <td className="px-4 py-3 text-sm text-right text-red-600">Rs. {exp.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{exp.bill ? '📎' : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* {showAddModal && <AddExpenseModal expenseHeads={EXPENSE_HEADS} onClose={() => setShowAddModal(false)} onSave={(e) => { setExpenses([...expenses, e]); setShowAddModal(false); }} />} */}
    </div>
  );
};

export default PettyExpenses;