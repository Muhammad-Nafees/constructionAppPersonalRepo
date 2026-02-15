// components/HeadOffice/AddReceiptModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  sites: any[];
  onClose: () => void;
  onSave: (receipt: any) => void;
}

const AddReceiptModal = ({ sites, onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    siteId: "",
    amount: "",
    paymentMode: "Cash",
    referenceNumber: "",
    remarks: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.siteId || !formData.amount) {
      toast.error("Please fill required fields");
      return;
    }
    const selectedSite = sites.find(s => s.id === Number(formData.siteId));
    onSave({
      ...formData,
      id: Date.now(),
      siteName: selectedSite?.siteName || "",
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
        <h3 className="text-xl font-bold mb-4">Add New Receipt</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="date" className="w-full px-4 py-2 border rounded-lg" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.siteId} onChange={(e) => setFormData({ ...formData, siteId: e.target.value })}>
            <option value="">Select Site *</option>
            {sites.map(site => <option key={site.id} value={site.id}>{site.siteName}</option>)}
          </select>
          <input type="number" placeholder="Amount *" className="w-full px-4 py-2 border rounded-lg" value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.paymentMode} onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}>
            <option value="Cash">Cash</option>
            <option value="Bank">Bank</option>
            <option value="Online">Online</option>
          </select>
          <input type="text" placeholder="Reference Number" className="w-full px-4 py-2 border rounded-lg" value={formData.referenceNumber} onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })} />
          <textarea placeholder="Remarks" className="w-full px-4 py-2 border rounded-lg" rows={3} value={formData.remarks} onChange={(e) => setFormData({ ...formData, remarks: e.target.value })} />
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Save Receipt</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReceiptModal;