// components/HeadOffice/ManualEntryModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  accounts: any[];
  onClose: () => void;
  onSave: (transaction: any) => void;
}

const ManualEntryModal = ({ accounts, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    bankAccountId: "",
    description: "",
    debit: "",
    credit: "",
    referenceNo: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bankAccountId || !formData.description || (!formData.debit && !formData.credit)) {
      toast.error("Please fill required fields");
      return;
    }

    const account = accounts.find(a => a.id === Number(formData.bankAccountId));
    const debit = Number(formData.debit) || 0;
    const credit = Number(formData.credit) || 0;
    const newBalance = (account?.currentBalance || 0) + credit - debit;

    onSave({
      ...formData,
      id: Date.now(),
      debit,
      credit,
      balance: newBalance,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
        onClick={onClose}
      />
      <div className="absolute inset-0 bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Manual Entry</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.bankAccountId} onChange={(e) => setFormData({ ...formData, bankAccountId: e.target.value })}>
            <option value="">Select Bank Account</option>
            {accounts.map(acc => <option key={acc.id} value={acc.id}>{acc.bankName} - {acc.accountTitle}</option>)}
          </select>
          <input type="text" placeholder="Description *" className="w-full px-4 py-2 border rounded-lg" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Debit Amount" className="w-full px-4 py-2 border rounded-lg" value={formData.debit} onChange={(e) => setFormData({ ...formData, debit: e.target.value })} />
            <input type="number" placeholder="Credit Amount" className="w-full px-4 py-2 border rounded-lg" value={formData.credit} onChange={(e) => setFormData({ ...formData, credit: e.target.value })} />
          </div>
          <input type="text" placeholder="Reference No (Optional)" className="w-full px-4 py-2 border rounded-lg" value={formData.referenceNo} onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })} />
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManualEntryModal;