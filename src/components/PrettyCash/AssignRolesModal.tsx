// components/PettyCash/AssignRolesModal.tsx
import { useState } from "react";

interface Props {
  admin: any;
  onClose: () => void;
  onAssign: (updated: any) => void;
}

const AssignRolesModal = ({ admin, onClose, onAssign }: Props) => {
  const [assignedSites, setAssignedSites] = useState<string[]>(admin.assignedSites || []);
  const [permissions, setPermissions] = useState<string[]>(admin.permissions || []);

  const sites = ["BWD5", "Lakhani", "IT Park"];
  const allPermissions = ["view", "add_expense", "edit_expense", "delete_expense", "reports", "manage_users"];

  const handleSubmit = () => {
    onAssign({
      ...admin,
      assignedSites,
      permissions,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-lg w-full p-6">
        <h3 className="text-xl font-bold mb-4">Assign Roles - {admin.name}</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Assigned Sites</h4>
            <div className="space-y-2">
              {sites.map(site => (
                <label key={site} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={assignedSites.includes(site)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAssignedSites([...assignedSites, site]);
                      } else {
                        setAssignedSites(assignedSites.filter(s => s !== site));
                      }
                    }}
                  />
                  {site}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Permissions</h4>
            <div className="space-y-2">
              {allPermissions.map(perm => (
                <label key={perm} className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={permissions.includes(perm)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPermissions([...permissions, perm]);
                      } else {
                        setPermissions(permissions.filter(p => p !== perm));
                      }
                    }}
                  />
                  {perm.replace(/_/g, ' ')}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-[#F47521] text-white rounded-lg">Save</button>
        </div>
      </div>
    </div>
  );
};

export default AssignRolesModal;