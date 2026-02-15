// components/HeadOffice/AddSiteModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSave: (site: any) => void;
}

const AddSiteModal = ({ onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    siteName: "",
    location: "",
    clientName: "",
    startDate: "",
    expectedEndDate: "",
    status: "Ongoing",
    projectBudget: "",
    siteAdmin: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.siteName || !formData.location || !formData.clientName) {
      toast.error("Please fill required fields");
      return;
    }
    onSave({
      ...formData,
      id: Date.now(),
      projectBudget: Number(formData.projectBudget) || 0,
      documents: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Add New Site</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Site Name *" className="px-4 py-2 border rounded-lg" value={formData.siteName} onChange={(e) => setFormData({ ...formData, siteName: e.target.value })} />
            <input type="text" placeholder="Location *" className="px-4 py-2 border rounded-lg" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </div>
          <input type="text" placeholder="Client Name *" className="w-full px-4 py-2 border rounded-lg" value={formData.clientName} onChange={(e) => setFormData({ ...formData, clientName: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input type="date" placeholder="Start Date" className="px-4 py-2 border rounded-lg" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
            <input type="date" placeholder="Expected End Date" className="px-4 py-2 border rounded-lg" value={formData.expectedEndDate} onChange={(e) => setFormData({ ...formData, expectedEndDate: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select className="px-4 py-2 border rounded-lg" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Hold">On Hold</option>
            </select>
            <input type="number" placeholder="Project Budget" className="px-4 py-2 border rounded-lg" value={formData.projectBudget} onChange={(e) => setFormData({ ...formData, projectBudget: e.target.value })} />
          </div>
          <input type="text" placeholder="Site Admin" className="w-full px-4 py-2 border rounded-lg" value={formData.siteAdmin} onChange={(e) => setFormData({ ...formData, siteAdmin: e.target.value })} />
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Create Site</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSiteModal;