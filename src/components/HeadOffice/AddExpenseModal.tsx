// components/HeadOffice/AddExpenseModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  categories: string[];
  onClose: () => void;
  onSave: (expense: any) => void;
}

const AddExpenseModal = ({ categories, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    category: "",
    description: "",
    amount: "",
    paymentMode: "Cash",
    attachment: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.category || !formData.description || !formData.amount) {
      toast.error("Please fill required fields");
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
        <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
       />
      <div className="absolute inset-0  bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Add Expense</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            <option value="">Select Category *</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <textarea placeholder="Description *" className="w-full px-4 py-2 border rounded-lg" rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          <input type="number" placeholder="Amount *" className="w-full px-4 py-2 border rounded-lg" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.paymentMode} onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Online">Online</option>
          </select>
          <div className="border rounded-lg p-3">
            <input type="file" onChange={(e) => setFormData({ ...formData, attachment: e.target.files?.[0] || null })} />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Save Expense</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseModal;