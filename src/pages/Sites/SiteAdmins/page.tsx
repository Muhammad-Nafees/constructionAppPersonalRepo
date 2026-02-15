// pages/PettyCash/SiteAdmins/index.tsx
import { useState } from "react";
import AddUserModal from "../../../components/PrettyCash/AddUserModal";
import AssignRolesModal from "../../../components/PrettyCash/AssignRolesModal";
 

interface SiteAdmin {
  id: number;
  name: string;
  email: string;
  role: string;
  assignedSites: string[];
  permissions: string[];
}

const SiteAdmins = () => {
  const [admins, setAdmins] = useState<SiteAdmin[]>([
    { id: 1, name: "Shahid", email: "shahid@example.com", role: "Site Admin", assignedSites: ["BWD5"], permissions: ["view", "add_expense"] },
    { id: 2, name: "Ali", email: "ali@example.com", role: "Accountant", assignedSites: ["Lakhani", "IT Park"], permissions: ["view", "reports"] },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<SiteAdmin | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Admins</h2>
          <p className="text-gray-500 text-sm">Manage users, roles and permissions</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="px-4 py-2 bg-[#F47521] text-white rounded-lg">
          + Add User
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Assigned Sites</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td className="px-4 py-3 text-sm">{admin.name}</td>
                <td className="px-4 py-3 text-sm">{admin.email}</td>
                <td className="px-4 py-3 text-sm">{admin.role}</td>
                <td className="px-4 py-3 text-sm">{admin.assignedSites.join(", ")}</td>
                <td className="px-4 py-3 text-sm">
                  <button onClick={() => { setSelectedAdmin(admin); setShowAssignModal(true); }} className="text-blue-600 hover:text-blue-800 mr-2">Assign Roles</button>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && <AddUserModal onClose={() => setShowAddModal(false)} onSave={(user) => { setAdmins([...admins, user]); setShowAddModal(false); }} />}
      {showAssignModal && selectedAdmin && <AssignRolesModal admin={selectedAdmin} onClose={() => { setShowAssignModal(false); setSelectedAdmin(null); }} onAssign={(updated) => { setAdmins(admins.map(a => a.id === updated.id ? updated : a)); setShowAssignModal(false); setSelectedAdmin(null); }} />}
    </div>
  );
};

export default SiteAdmins;