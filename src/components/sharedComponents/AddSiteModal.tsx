import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { IAllSites, IAllCompanies } from "../../interface";

interface AddSiteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (siteData: IAllSites) => void;
  editingSite?: IAllSites | null;
  companies: IAllCompanies[]; // List of companies for dropdown
}

const AddSiteModal = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingSite,
  companies 
}: AddSiteModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Form state
  const [siteData, setSiteData] = useState<IAllSites>({
    companyId: "",
    companyName: "",
    siteName: "",
    location: "",
    description: "",
    allocatedCapital: 0,
    status: "Active"
  });

  // Initialize form with editing data if available
  useEffect(() => {
    if (editingSite) {
      setSiteData(editingSite);
    } else {
      setSiteData({
        companyId: "",
        companyName: "",
        siteName: "",
        location: "",
        description: "",
        allocatedCapital: 0,
        status: "Active"
      });
    }
  }, [editingSite]);

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Handle company selection
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCompanyId = e.target.value;
    const selectedCompany = companies.find(c => c._id === selectedCompanyId);
    
    setSiteData({
      ...siteData,
      companyId: selectedCompanyId,
      companyName: selectedCompany?.companyName || ""
    });
  };

  // Handle input changes
  const handleChangeValue = (field: keyof IAllSites, value: string | number) => {
    setSiteData({
      ...siteData,
      [field]: value
    });
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!siteData.companyId) {
      toast.error("Please select a company!");
      return;
    }

    if (!siteData.siteName) {
      toast.error("Site name is required!");
      return;
    }

    // Save site
    onSave(siteData);
    
    // Reset form
    setSiteData({
      companyId: "",
      companyName: "",
      siteName: "",
      location: "",
      description: "",
      allocatedCapital: 0,
      status: "Active"
    });
    
    onClose();
    toast.success(editingSite ? "Site updated successfully!" : "Site added successfully!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl p-8 mx-4 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <span className="text-[#F47521]">#</span>
            Add New Site
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to add a new construction site
          </p>
        </div>

        {/* Modal Body - Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Selection */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                Company
              </label>
              <span className="text-red-500">*</span>
            </div>
            <p className="text-xs text-gray-500 -mt-1">
              Select the company this site belongs to
            </p>
            <select
              id="company"
              value={siteData.companyId}
              onChange={handleCompanyChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent bg-white text-gray-700"
              required
            >
              <option value="">-- Select Company --</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>

          {/* Site Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-1">
              <label htmlFor="siteName" className="block text-sm font-semibold text-gray-700">
                Name
              </label>
              <span className="text-red-500">*</span>
            </div>
            <input
              type="text"
              id="siteName"
              value={siteData.siteName}
              onChange={(e) => handleChangeValue("siteName", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter site name"
              required
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
              Location
            </label>
            <p className="text-xs text-gray-500 -mt-1">
              Physical address or location description
            </p>
            <input
              type="text"
              id="location"
              value={siteData.location}
              onChange={(e) => handleChangeValue("location", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="e.g., Block 13, Gulistan-e-Johar, Karachi"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={siteData.description}
              onChange={(e) => handleChangeValue("description", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent resize-none"
              placeholder="Enter site description (optional)"
            />
          </div>

          {/* Allocated Capital */}
          <div className="space-y-2">
            <label htmlFor="allocatedCapital" className="block text-sm font-semibold text-gray-700">
              Allocated Capital (Petty Cash)
            </label>
            <p className="text-xs text-gray-500 -mt-1">
              Total petty cash budget for this site
            </p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                Rs.
              </span>
              <input
                type="text"
                id="allocatedCapital"
                value={siteData.allocatedCapital || ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, '');
                  handleChangeValue("allocatedCapital", value ? parseInt(value) : 0);
                }}
                className="w-full px-4 py-3 pl-14 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={siteData.status === "Active"}
                  onChange={(e) => handleChangeValue("status", e.target.value)}
                  className="w-4 h-4 text-[#F47521] focus:ring-[#F47521] border-gray-300"
                />
                <span className="text-sm text-gray-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={siteData.status === "Inactive"}
                  onChange={(e) => handleChangeValue("status", e.target.value)}
                  className="w-4 h-4 text-[#F47521] focus:ring-[#F47521] border-gray-300"
                />
                <span className="text-sm text-gray-700">Inactive</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="On Hold"
                  checked={siteData.status === "On Hold"}
                  onChange={(e) => handleChangeValue("status", e.target.value)}
                  className="w-4 h-4 text-[#F47521] focus:ring-[#F47521] border-gray-300"
                />
                <span className="text-sm text-gray-700">On Hold</span>
              </label>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#F47521] rounded-lg hover:bg-[#E65024] focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:ring-offset-2 transition-colors shadow-lg hover:shadow-xl"
            >
              {editingSite ? "Update Site" : "Create Site"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSiteModal;