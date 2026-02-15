// pages/PettyCash/Sites/index.tsx
import { useState } from "react";

interface Site {
  id: number;
  name: string;
  location: string;
  status: "Active" | "Inactive" | "Completed";
  allocatedAmount: number;
  spentAmount: number;
  admin: string;
}

const PettyCashSites = () => {
  const [sites] = useState<Site[]>([
    { id: 1, name: "BWD5", location: "Shahdad", status: "Active", allocatedAmount: 500000, spentAmount: 350000, admin: "Shahid" },
    { id: 2, name: "Lakhani", location: "Jamali", status: "Active", allocatedAmount: 300000, spentAmount: 280000, admin: "Ali" },
    { id: 3, name: "IT Park", location: "Karachi", status: "Completed", allocatedAmount: 800000, spentAmount: 800000, admin: "Sara" },
  ]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Sites Overview</h2>

      {/* Site Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites.map(site => (
          <div key={site.id} className="bg-white rounded-xl border p-4 hover:shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{site.name}</h3>
                <p className="text-sm text-gray-500">{site.location}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${
                site.status === "Active" ? "bg-green-100 text-green-800" :
                site.status === "Completed" ? "bg-blue-100 text-blue-800" :
                "bg-gray-100 text-gray-800"
              }`}>{site.status}</span>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm"><span className="text-gray-500">Site Admin:</span> {site.admin}</p>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Allocated:</p>
                <p className="text-sm font-medium text-blue-600">Rs. {site.allocatedAmount.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Spent:</p>
                <p className="text-sm font-medium text-red-600">Rs. {site.spentAmount.toLocaleString()}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-500">Remaining:</p>
                <p className="text-sm font-medium text-green-600">Rs. {(site.allocatedAmount - site.spentAmount).toLocaleString()}</p>
              </div>
            </div>

            <button className="mt-4 w-full py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PettyCashSites;