// pages/HeadOffice/Receipts/index.tsx
import { useState } from "react";
import AddReceiptModal from "../../../components/HeadOffice/AddReceiptModal";
import ReceiptReports from "../../../components/HeadOffice/ReceiptReports";
 

interface Receipt {
  id: number;
  date: string;
  siteId: number;
  siteName: string;
  amount: number;
  paymentMode: "Cash" | "Bank" | "Online";
  referenceNumber: string;
  remarks: string;
}

const Receipts = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([
    { id: 1, date: "2026-02-15", siteId: 1, siteName: "BWD5", amount: 250000, paymentMode: "Bank", referenceNumber: "TRX123", remarks: "Monthly payment" },
    { id: 2, date: "2026-02-14", siteId: 2, siteName: "Lakhani", amount: 150000, paymentMode: "Cash", referenceNumber: "", remarks: "Advance" },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [dateFilter, setDateFilter] = useState({ month: "2026-02", year: "2026" });

  const totalReceipts = receipts.reduce((sum, r) => sum + r.amount, 0);
  const monthlyTotal = receipts
    .filter(r => r.date.startsWith(dateFilter.month))
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Receipts</h2>
          <p className="text-gray-500 text-sm">Track payments received from project sites</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowReports(true)} className="px-4 py-2 bg-purple-600 text-white rounded-lg">📊 Reports</button>
          <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-[#F47521] text-white rounded-lg">+ Add Receipt</button>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Receipts (All Time)</p>
          <p className="text-2xl font-bold text-green-600">Rs. {totalReceipts.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">This Month ({dateFilter.month})</p>
          <p className="text-2xl font-bold text-blue-600">Rs. {monthlyTotal.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Receipts Count</p>
          <p className="text-2xl font-bold text-gray-900">{receipts.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border flex gap-4">
        <select className="px-3 py-2 border rounded-lg">
          <option>All Sites</option>
          <option>BWD5</option>
          <option>Lakhani</option>
        </select>
        <input type="month" className="px-3 py-2 border rounded-lg" value={dateFilter.month} onChange={(e) => setDateFilter({ ...dateFilter, month: e.target.value })} />
        <select className="px-3 py-2 border rounded-lg">
          <option>All Modes</option>
          <option>Cash</option>
          <option>Bank</option>
          <option>Online</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold">Date</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Site</th>
              <th className="px-4 py-3 text-right text-xs font-semibold">Amount</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Payment Mode</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Reference #</th>
              <th className="px-4 py-3 text-left text-xs font-semibold">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map(r => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm">{r.date}</td>
                <td className="px-4 py-3 text-sm">{r.siteName}</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">Rs. {r.amount.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm">{r.paymentMode}</td>
                <td className="px-4 py-3 text-sm">{r.referenceNumber || '-'}</td>
                <td className="px-4 py-3 text-sm">{r.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {showAddModal && <AddReceiptModal sites={[]} onClose={() => setShowAddModal(false)} onSave={(r) => { setReceipts([...receipts, r]); setShowAddModal(false); }} />}
      {showReports && <ReceiptReports receipts={receipts} onClose={() => setShowReports(false)} />}
    </div>
  );
};

export default Receipts;