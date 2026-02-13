import { useState } from "react";
import AddSiteAdminModal from "../../components/sharedComponents/AddSiteAdminModal";
 
// Sample data - Replace with actual data from your API
const sampleSiteAdmins = [
  {
    id: 1,
    name: "Shahid",
    email: "abdulahad1991@gmail.com",
    site: "BWD5",
    company: "AbdulCo",
    status: "Active"
  },
  {
    id: 2,
    name: "first site admin",
    email: "siteadmin@gmail.com",
    site: "Lakhani",
    company: "AbdulCo",
    status: "Active"
  },
  {
    id: 3,
    name: "Ali Raza",
    email: "ali.raza@abdulco.com",
    site: "Gulistan Tower",
    company: "AbdulCo",
    status: "Inactive"
  },
  {
    id: 4,
    name: "Sara Khan",
    email: "sara.khan@techsolutions.com",
    site: "IT Park",
    company: "Tech Solutions Ltd",
    status: "Active"
  }
];

const SiteAdmins = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [siteAdmins, setSiteAdmins] = useState(sampleSiteAdmins);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter admins based on search
  const filteredAdmins = siteAdmins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddAdmin = (newAdmin: any) => {
    setSiteAdmins([...siteAdmins, { ...newAdmin, id: siteAdmins.length + 1 }]);
  };

  const handleDeleteAdmin = (id: number) => {
    if (window.confirm("Are you sure you want to delete this site admin?")) {
      setSiteAdmins(siteAdmins.filter(admin => admin.id !== id));
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Admins</h1>
        <p className="text-gray-500 mt-2">
          Manage site administrators for your construction sites
        </p>
      </div>

      {/* Search and Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search admins by name, email, site..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2.5 pl-10 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21L16.65 16.65" strokeLinecap="round" />
          </svg>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#F47521] text-white rounded-lg hover:bg-[#E65024] transition-colors shadow-sm hover:shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 4V16M16 10H4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Add Site Admin
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Site
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#F47521] to-[#E65024] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {admin.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {admin.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {admin.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {admin.site}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {admin.company}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Edit"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
                          <path d="M17 3L21 7L7 21H3V17L17 3Z" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteAdmin(admin.id)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        title="Delete"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2">
                          <path d="M4 7H20M10 11V17M14 11V17M5 7L6 20C6 20.5 6.5 21 7 21H17C17.5 21 18 20.5 18 20L19 7M9 7V4C9 3.5 9.5 3 10 3H14C14.5 3 15 3.5 15 4V7" 
                            strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        Active
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAdmins.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" />
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No site admins found</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first site admin</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-[#F47521] text-white rounded-lg hover:bg-[#E65024] transition-colors"
            >
              Add Site Admin
            </button>
          </div>
        )}
      </div>

      {/* Add Site Admin Modal */}
      <AddSiteAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddAdmin}
      />
    </div>
  );
};

export default SiteAdmins;