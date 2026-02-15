// pages/HeadOffice/HomeExpenses/index.tsx
import { useState } from "react";
import AddHomeExpenseModal from "../../../components/HeadOffice/AddHomeExpenseModal";
import CategoryWiseReport from "../../../components/HeadOffice/CategoryWiseReport";


const HOME_CATEGORIES = [
  "Utilities", "Salaries", "Renovation", "Mess",
  "Education", "General Purchases", "Telephone / Wifi",
  "Medical", "Payments to House Owners"
];

interface HomeExpense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMode: string;
}

const HomeExpenses = () => {
  const [expenses, setExpenses] = useState<HomeExpense[]>([
    { id: 1, date: "2026-02-15", category: "Utilities", description: "Electricity Bill", amount: 15000, paymentMode: "Bank" },
    { id: 2, date: "2026-02-14", category: "Mess", description: "Monthly Grocery", amount: 25000, paymentMode: "Cash" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const monthlyTotal = expenses.filter(e => e.date.startsWith("2026-02")).reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-6">
      
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Home Expenses</h2>
          <p className="text-gray-500 text-sm">Track personal/home expenses</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowReport(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">📊 Category Report</button>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-[#F47521] text-white rounded-lg">+ Add Expense</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Home Expenses</p>
          <p className="text-2xl font-bold text-red-600">Rs. {totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">This Month (Feb 2026)</p>
          <p className="text-2xl font-bold text-orange-600">Rs. {monthlyTotal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Categories Used</p>
          <p className="text-2xl font-bold text-gray-900">{new Set(expenses.map(e => e.category)).size}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Description</th>
              <th className="px-4 py-3 text-right text-xs font-semibold">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Payment Mode</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id}>
                <td className="px-4 py-3 text-sm">{exp.date}</td>
                <td className="px-4 py-3 text-sm">{exp.category}</td>
                <td className="px-4 py-3 text-sm">{exp.description}</td>
                <td className="px-4 py-3 text-sm text-right text-red-600">Rs. {exp.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{exp.paymentMode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddHomeExpenseModal categories={HOME_CATEGORIES} onClose={() => setShowAddModal(false)} onSave={(e) => { setExpenses([...expenses, e]); setShowAddModal(false); }} />}
      {showReport && <CategoryWiseReport expenses={expenses} categories={HOME_CATEGORIES} onClose={() => setShowReport(false)} />}
    </div>
  );
};



export default HomeExpenses;