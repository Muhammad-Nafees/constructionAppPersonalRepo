// components/PettyCash/AddExpenseModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  expenseHeads: string[];
  onClose: () => void;
  onSave: (expense: any) => void;
}

const AddExpenseModal = ({ expenseHeads, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    site: "",
    expenseHead: "",
    description: "",
    amount: "",
    bill: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.site || !formData.expenseHead || !formData.description || !formData.amount) {
      toast.error("Please fill all fields");
      return;
    }
    onSave({
      ...formData,
      id: Date.now(),
      amount: Number(formData.amount),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Add Site Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.site} onChange={(e) => setFormData({ ...formData, site: e.target.value })}>
            <option value="">Select Site</option>
            <option value="BWD5">BWD5</option>
            <option value="Lakhani">Lakhani</option>
            <option value="IT Park">IT Park</option>
          </select>
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.expenseHead} onChange={(e) => setFormData({ ...formData, expenseHead: e.target.value })}>
            <option value="">Select Expense Head</option>
            {expenseHeads.map(head => <option key={head} value={head}>{head}</option>)}
          </select>
          <input type="text" placeholder="Description" className="w-full px-4 py-2 border rounded-lg" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type="number" placeholder="Amount" className="w-full px-4 py-2 border rounded-lg" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <div className="border rounded-lg p-3">
            <input type="file" onChange={(e) => setFormData({ ...formData, bill: e.target.files?.[0] || null })} />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;