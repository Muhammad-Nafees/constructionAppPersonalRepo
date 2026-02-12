import { useState } from "react";
import { IAllSites, IAllCompanies } from "../../interface";
import AddSiteModal from "../../components/sharedComponents/AddSiteModal";
import SiteCard from "../../components/reusableComponents/SiteCard";


const Sites = () => {
  const [allSites, setAllSites] = useState<IAllSites[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState<IAllSites | null>(null);

  // Sample companies - replace with your actual data
  const [companies] = useState<IAllCompanies[]>([
    {
      _id: "1",
      companyName: "AbdulCo",
      emailAddress: "abdulahad1991@gmail.com",
      sites: 3,
      admins: 2,
      totalCapital: 100000,
      totalExpenses: 900
    },
    {
      _id: "2",
      companyName: "Tech Solutions Ltd",
      emailAddress: "info@techsolutions.com",
      sites: 5,
      admins: 4,
      totalCapital: 250000,
      totalExpenses: 1500
    }
  ]);

  const handleSaveSite = (siteData: IAllSites) => {
    if (editingSite) {
      // Update existing site
      setAllSites(allSites.map(site =>
        site._id === editingSite._id ? { ...siteData, _id: site._id } : site
      ));
    } else {
      // Add new site
      setAllSites([...allSites, {
        ...siteData,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        
        <div>
          <p className="text-black text-[30px] font-semibold">Sites</p>
          <p className="text-gray-500 text-sm mt-2">Manage construction sites and their petty cash allocation
          </p>
        </div>


        <button
          onClick={() => {
            setEditingSite(null);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 bg-[#F47521] text-white rounded-lg hover:bg-[#E65024] transition-colors flex items-center gap-2"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 4V16M16 10H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Add New Site
        </button>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allSites.map((site) => (
          <SiteCard
            key={site._id}
            site={site}
            onEdit={() => {
              setEditingSite(site);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {/* Add Site Modal */}
      <AddSiteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSite(null);
        }}
        onSave={handleSaveSite}
        editingSite={editingSite}
        companies={companies}
      />
    </div>
  );
};

export default Sites;