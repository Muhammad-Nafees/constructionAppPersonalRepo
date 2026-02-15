// components/HeadOffice/AddBankAccountModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSave: (account: any) => void;
}

const AddBankAccountModal = ({ onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    accountTitle: "",
    openingBalance: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.bankName || !formData.accountNumber || !formData.accountTitle) {
      toast.error("Please fill all required fields");
      return;
    }
    onSave({
      ...formData,
      id: Date.now(),
      openingBalance: Number(formData.openingBalance) || 0,
      currentBalance: Number(formData.openingBalance) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
       />
      <div className="absolute inset-0 bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Add Bank Account</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Bank Name *"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.bankName}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Account Number *"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.accountNumber}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          />
          <input
            type="text"
            placeholder="Account Title *"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.accountTitle}
            onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
          />
          <input
            type="number"
            placeholder="Opening Balance"
            className="w-full px-4 py-2 border rounded-lg"
            value={formData.openingBalance}
            onChange={(e) => setFormData({ ...formData, openingBalance: e.target.value })}
          />
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBankAccountModal;