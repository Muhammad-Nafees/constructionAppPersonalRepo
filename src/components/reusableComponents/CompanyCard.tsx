import { IAllCompanies } from "../../interface";
import { useState } from "react";

interface CompanyCardProps {
  company: IAllCompanies;
  onEdit?: (company: IAllCompanies) => void;
  onDelete?: (companyId: string) => void;
}

const CompanyCard = ({ company, onEdit, onDelete }: CompanyCardProps) => {
  console.log("🚀 ~ CompanyCard ~ company:", company)
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div 
      className="w-64 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative group"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {/* Edit/Delete Options - Show on Hover */}
      {showOptions && (
        <div className="absolute top-2 right-2 flex gap-2 z-10 animate-in fade-in zoom-in duration-200">
          <button
            onClick={() => onEdit?.(company)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 text-blue-600 transition-colors"
            title="Edit Company"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 3L21 7L7 21H3V17L17 3Z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete?.(company._id || company.companyName)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-red-600 transition-colors"
            title="Delete Company"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7H20M10 11V17M14 11V17M5 7L6 20C6 20.5 6.5 21 7 21H17C17.5 21 18 20.5 18 20L19 7M9 7V4C9 3.5 9.5 3 10 3H14C14.5 3 15 3.5 15 4V7" 
                strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* Header Section - Company Name & Email */}
      <div className="bg-gradient-to-r from-[#F47521] to-[#E65024] p-4">
        <h3 className="text-xl font-bold text-white truncate pr-12">
          {company.companyName || "Construction Co"}
        </h3>
        <p className="text-sm text-white/90 truncate mt-1">
          {company.emailAddress || "construction@gmail.com"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="p-4 space-y-3">
        {/* Sites & Admins Row */}
        <div className="flex justify-between items-center">
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500 font-medium">Sites</p>
            <p className="text-2xl font-bold text-gray-800">{company?.sites || 3}</p>
          </div>
          <div className="w-px h-10 bg-gray-200"></div>
          <div className="flex-1 text-center">
            <p className="text-xs text-gray-500 font-medium">Admins</p>
            <p className="text-2xl font-bold text-gray-800">{company?.admins || 2}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 my-2"></div>

        {/* Total Capital */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">Total Capital</p>
          <p className="text-lg font-semibold text-green-600">
            Rs {company.totalCapital?.toLocaleString() || "100,000.00"}
          </p>
        </div>

        {/* Total Expenses */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
          <p className="text-lg font-semibold text-red-500">
            Rs {company.totalCapital?.toLocaleString() || "900.00"}
          </p>
        </div>
      </div>

      {/* Footer - View Details Button */}
      {/* <div className="p-4 pt-0">
        <button className="w-full py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200 transition-colors duration-200">
          View Details
        </button>
      </div> */}
    </div>
  );
};

export default CompanyCard;