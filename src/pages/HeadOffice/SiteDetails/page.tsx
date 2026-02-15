// pages/HeadOffice/SiteDetails/index.tsx
import { useState } from "react";
 

// interface Site {
//   id: number;
//   siteName: string;
//   location: string;
//   clientName: string;
//   startDate: string;
//   expectedEndDate: string;
//   status: "Ongoing" | "Completed" | "Hold";
//   projectBudget: number;
//   siteAdmin: string;
//   documents: string[];
// }

const SiteDetails = () => {
  // const [sites, setSites] = useState<Site[]>([
  //   { id: 1, siteName: "BWD5", location: "Shahdad", clientName: "AbdulCo", startDate: "2026-01-01", expectedEndDate: "2026-12-31", status: "Ongoing", projectBudget: 5000000, siteAdmin: "Shahid", documents: ["contract.pdf"] },
  //   { id: 2, siteName: "Lakhani", location: "Jamali", clientName: "AbdulCo", startDate: "2026-02-01", expectedEndDate: "2026-11-30", status: "Ongoing", projectBudget: 3000000, siteAdmin: "Ali", documents: [] },
  //   { id: 3, siteName: "IT Park", location: "Karachi", clientName: "Tech Solutions", startDate: "2025-06-01", expectedEndDate: "2026-05-31", status: "Completed", projectBudget: 8000000, siteAdmin: "Sara", documents: ["completion.pdf"] },
  // ]);

  const sites =[
    { id: 1, siteName: "BWD5", location: "Shahdad", clientName: "AbdulCo", startDate: "2026-01-01", expectedEndDate: "2026-12-31", status: "Ongoing", projectBudget: 5000000, siteAdmin: "Shahid", documents: ["contract.pdf"] },
    { id: 2, siteName: "Lakhani", location: "Jamali", clientName: "AbdulCo", startDate: "2026-02-01", expectedEndDate: "2026-11-30", status: "Ongoing", projectBudget: 3000000, siteAdmin: "Ali", documents: [] },
    { id: 3, siteName: "IT Park", location: "Karachi", clientName: "Tech Solutions", startDate: "2025-06-01", expectedEndDate: "2026-05-31", status: "Completed", projectBudget: 8000000, siteAdmin: "Sara", documents: ["completion.pdf"] },
  ]

  // const [showAddModal, setShowAddModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  // const [showUploadModal, setShowUploadModal] = useState(false);
  // const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredSites = statusFilter === "all" ? sites : sites.filter(s => s.status === statusFilter);
  // const totalBudget = sites.reduce((sum, s) => sum + s.projectBudget, 0);
  const ongoingSites = sites.filter(s => s.status === "Ongoing").length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Details</h2>
          <p className="text-gray-500 text-sm">Manage all ongoing construction projects</p>
        </div>
        <button 
        // onClick={() => setShowAddModal(true)}
         className="px-4 py-2 bg-[#F47521] text-white rounded-lg">
          + Add New Site
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Total Sites</p>
          <p className="text-2xl font-bold">{sites.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Ongoing</p>
          <p className="text-2xl font-bold text-blue-600">{ongoingSites}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">Completed</p>
          <p className="text-2xl font-bold text-green-600">{sites.filter(s => s.status === "Completed").length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border">
          <p className="text-sm text-gray-500">On Hold</p>
          <p className="text-2xl font-bold text-orange-600">{sites.filter(s => s.status === "Hold").length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border flex gap-4">
        <select className="px-3 py-2 border rounded-lg" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Hold">On Hold</option>
        </select>
        <input type="text" placeholder="Search site..." className="px-3 py-2 border rounded-lg flex-1" />
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSites.map(site => (
          <div key={site.id} className="bg-white rounded-xl border p-4 hover:shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{site.siteName}</h3>
                <p className="text-sm text-gray-500">{site.location}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                site.status === "Ongoing" ? "bg-blue-100 text-blue-800" :
                site.status === "Completed" ? "bg-green-100 text-green-800" :
                "bg-orange-100 text-orange-800"
              }`}>{site.status}</span>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-sm"><span className="text-gray-500">Client:</span> {site.clientName}</p>
              <p className="text-sm"><span className="text-gray-500">Site Admin:</span> {site.siteAdmin}</p>
              <p className="text-sm"><span className="text-gray-500">Budget:</span> Rs. {site.projectBudget.toLocaleString()}</p>
              <p className="text-sm"><span className="text-gray-500">Duration:</span> {site.startDate} to {site.expectedEndDate}</p>
            </div>

            <div className="mt-4 flex gap-2">
              <button 
              // onClick={() => { setSelectedSite(site); setShowUploadModal(true); }}
               className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded">📎 Upload</button>
              <button 
              // onClick={() => { setSelectedSite(site); setShowEditModal(true); }}
               className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded">✏️ Edit</button>
              <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded">🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {/* {showAddModal && <AddSiteModal onClose={() => setShowAddModal(false)} onSave={(site) => { setSites([...sites, site]); setShowAddModal(false); }} />}
      {showEditModal && selectedSite && <EditSiteModal site={selectedSite} onClose={() => { setShowEditModal(false); setSelectedSite(null); }} onSave={(updated) => { setSites(sites.map(s => s.id === updated.id ? updated : s)); setShowEditModal(false); setSelectedSite(null); }} />}
      {showUploadModal && selectedSite && <UploadDocumentsModal site={selectedSite} onClose={() => { setShowUploadModal(false); setSelectedSite(null); }} />} */}
    </div>
  );
};

export default SiteDetails;