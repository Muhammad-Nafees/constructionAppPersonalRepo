// pages/HeadOffice/Expenses/index.tsx
import { useState } from "react";
import AddExpenseModal from "../../../components/HeadOffice/AddExpenseModal";
import MonthlySummary from "../../../components/HeadOffice/MonthlySummary";
 

const EXPENSE_CATEGORIES = [
  "Utilities", "Legal", "POL", "Staff Expenses (Nisar, Nazir, Amir Baksh)",
  "Travelling", "Salaries", "Charity", "Loan", "Assets Purchase", 
  "Assets Sale", "Material", "Telephone", "Rental", "Stationary",
  "Motor Vehicle Maintenance", "FBR / Tax"
];

interface Expense {
  id: number;
  date: string;
  category: string;
  description: string;
  amount: number;
  paymentMode: string;
  attachment?: string;
}

const HeadOfficeExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: 1, date: "2026-02-15", category: "Utilities", description: "Electricity Bill", amount: 25000, paymentMode: "Bank", attachment: "bill.pdf" },
    { id: 2, date: "2026-02-14", category: "Salaries", description: "Staff Salaries", amount: 150000, paymentMode: "Bank" },
    { id: 3, date: "2026-02-13", category: "POL", description: "Generator Fuel", amount: 35000, paymentMode: "Cash" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showMonthlySummary, setShowMonthlySummary] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  // const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const categoryTotals = EXPENSE_CATEGORIES.map(cat => ({
    category: cat,
    total: expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  })).filter(c => c.total > 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Head Office Expenses</h2>
          <p className="text-gray-500 text-sm">Manage all office-level expenses</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowMonthlySummary(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">📊 Monthly Summary</button>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-[#F47521] text-white rounded-lg">+ Add Expense</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-2xl font-bold text-red-600">Rs. {totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-orange-600">Rs. 210,000</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Categories Used</p>
          <p className="text-2xl font-bold text-gray-900">{categoryTotals.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {EXPENSE_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs rounded-full transition-all ${
              selectedCategory === cat 
                ? "bg-[#F47521] text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border flex gap-4">
        <select className="px-3 py-2 border rounded-lg" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {EXPENSE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="date" className="px-3 py-2 border rounded-lg" placeholder="From" />
        <input type="date" className="px-3 py-2 border rounded-lg" placeholder="To" />
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg">Apply Filter</button>
        <div className="flex gap-2 ml-auto">
          <button className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg">📥 Export</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Category</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Description</th>
              <th className="px-4 py-3 text-right text-xs font-semibold">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Payment Mode</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Attachment</th>
            </tr>
          </thead>
          <tbody>
            {expenses.filter(e => selectedCategory === "all" || e.category === selectedCategory).map(exp => (
              <tr key={exp.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{exp.date}</td>
                <td className="px-4 py-3 text-sm">{exp.category}</td>
                <td className="px-4 py-3 text-sm">{exp.description}</td>
                <td className="px-4 py-3 text-sm text-right text-red-600">Rs. {exp.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{exp.paymentMode}</td>
                <td className="px-4 py-3 text-sm">{exp.attachment ? `📎 ${exp.attachment}` : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddExpenseModal categories={EXPENSE_CATEGORIES} onClose={() => setShowAddModal(false)} onSave={(e) => { setExpenses([...expenses, e]); setShowAddModal(false); }} />}
      {showMonthlySummary && <MonthlySummary expenses={expenses} categories={EXPENSE_CATEGORIES} onClose={() => setShowMonthlySummary(false)} />}
    </div>
  );
};

export default HeadOfficeExpenses;