// components/PettyCash/AddUserModal.tsx
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  onSave: (user: any) => void;
}

const AddUserModal = ({ onClose, onSave }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Viewer",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }
    onSave({
      ...formData,
      id: Date.now(),
      assignedSites: [],
      permissions: [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-md w-full p-6">
        <h3 className="text-xl font-bold mb-4">Add New User</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full px-4 py-2 border rounded-lg" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          <select className="w-full px-4 py-2 border rounded-lg" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
            <option value="Super Admin">Super Admin</option>
            <option value="Finance Manager">Finance Manager</option>
            <option value="Site Admin">Site Admin</option>
            <option value="Accountant">Accountant</option>
            <option value="Viewer">Viewer</option>
          </select>
          <div className="flex justify-end gap-3 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Create User</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;