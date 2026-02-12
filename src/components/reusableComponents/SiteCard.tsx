import { useState } from "react";
import { IAllSites } from "../../interface";

interface SiteCardProps {
  site: IAllSites;
  onEdit?: (site: IAllSites) => void;
  onDelete?: (siteId: string) => void;
  onViewDetails?: (site: IAllSites) => void;
}

const SiteCard = ({ site, onEdit, onDelete, onViewDetails }: SiteCardProps) => {
  const [showOptions, setShowOptions] = useState(false);

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "On Hold":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div 
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* Edit/Delete Options - Show on Hover */}
      {showOptions && (
        <div className="absolute top-3 right-3 flex gap-2 z-10 animate-in fade-in zoom-in duration-200">
          <button
            onClick={() => onEdit?.(site)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600 transition-colors"
            title="Edit Site"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 3L21 7L7 21H3V17L17 3Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete?.(site._id || "")}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-600 transition-colors"
            title="Delete Site"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7H20M10 11V17M14 11V17M5 7L6 20C6 20.5 6.5 21 7 21H17C17.5 21 18 20.5 18 20L19 7M9 7V4C9 3.5 9.5 3 10 3H14C14.5 3 15 3.5 15 4V7" 
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Header Section - Company Name & Site Name */}
      <div className="bg-gradient-to-r from-[#F47521] to-[#E65024] p-5">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white truncate pr-8">
              {site.siteName || "Site Name"}
            </h3>
            <p className="text-sm text-white/90 truncate mt-1 flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              {site.companyName || "Company Name"}
            </p>
          </div>
          
          {/* Status Badge */}
          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(site.status)}`}>
            {site.status || "Active"}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Location */}
        {site.location && (
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="text-sm text-gray-700">{site.location}</p>
            </div>
          </div>
        )}

        {/* Description - Show only if exists */}
        {site.description && (
          <div className="flex items-start gap-2">
            <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex-1">
              <p className="text-xs text-gray-500 font-medium">Description</p>
              <p className="text-sm text-gray-700 line-clamp-2">{site.description}</p>
            </div>
          </div>
        )}

        {/* Allocated Capital */}
        <div className="flex items-start gap-2">
          <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v20M17 7l-5-5-5 5M7 17l5 5 5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="flex-1">
            <p className="text-xs text-gray-500 font-medium">Allocated Capital (Petty Cash)</p>
            <p className="text-lg font-semibold text-green-600">
              Rs. {site.allocatedCapital?.toLocaleString() || "0"}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Footer - View Details Button */}
        {/* <div className="flex gap-2">
          <button
            onClick={() => onViewDetails?.(site)}
            className="flex-1 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Details
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SiteCard;