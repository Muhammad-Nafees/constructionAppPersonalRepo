import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

interface AddSiteAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (adminData: any) => void;
};

// Sample sites data - Replace with your actual sites
const availableSites = [
  { id: 1, name: "BWDS", location: "Shahdad", company: "AbdulCo" },
  { id: 2, name: "Lakhani 2", location: "Jamali 2", company: "AbdulCo" },
  { id: 3, name: "Lakhani", location: "Jamali", company: "AbdulCo" },
  { id: 4, name: "IT Park", location: "Shahrah-e-Faisal", company: "Tech Solutions Ltd" },
  { id: 5, name: "Gulistan Tower", location: "Gulistan-e-Johar", company: "AbdulCo" },
];

const AddSiteAdminModal = ({ isOpen, onClose, onSave }: AddSiteAdminModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    selectedSites: [] as number[]
  });

  const [passwordStrength, setPasswordStrength] = useState({
    hasMinLength: false,
    hasNumber: false,
    hasUpperCase: false,
    hasLowerCase: false
  });

  // Handle click outside
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

  // Check password strength
  useEffect(() => {
    setPasswordStrength({
      hasMinLength: formData.password.length >= 8,
      hasNumber: /\d/.test(formData.password),
      hasUpperCase: /[A-Z]/.test(formData.password),
      hasLowerCase: /[a-z]/.test(formData.password)
    });
  }, [formData.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSiteToggle = (siteId: number) => {
    setFormData({
      ...formData,
      selectedSites: formData.selectedSites.includes(siteId)
        ? formData.selectedSites.filter(id => id !== siteId)
        : [...formData.selectedSites, siteId]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name) {
      toast.error("Name is required!");
      return;
    }

    if (!formData.email) {
      toast.error("Email is required!");
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address!");
      return;
    }

    if (!formData.password) {
      toast.error("Password is required!");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      return;
    }

    if (!/\d/.test(formData.password)) {
      toast.error("Password must include at least one number!");
      return;
    }

    if (formData.selectedSites.length === 0) {
      toast.error("Please select at least one site!");
      return;
    }

    // Get selected sites details
    const selectedSitesDetails = formData.selectedSites.map(id => 
      availableSites.find(site => site.id === id)
    );

    // Prepare data for saving
    const newAdmin = {
      name: formData.name,
      email: formData.email,
      password: formData.password, // In real app, hash this!
      sites: selectedSitesDetails,
      siteNames: selectedSitesDetails.map(s => s?.name).join(", "),
      company: selectedSitesDetails[0]?.company || "",
      status: "Active"
    };

    onSave(newAdmin);
    toast.success("Site admin added successfully!");
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      password: "",
      selectedSites: []
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-opacity-50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl mx-4 bg-white rounded-xl shadow-2xl animate-in fade-in zoom-in duration-300 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Add New Site Admin</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2">
              <path d="M18 6L6 18M6 6L18 18" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter full name"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter email address"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter password"
            />
            <p className="text-xs text-gray-500 mt-1">
              Min 8 characters, must include a number
            </p>
            
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className={passwordStrength.hasMinLength ? "text-green-600" : "text-gray-400"}>
                    ✓ 8+ characters
                  </span>
                  <span className={passwordStrength.hasNumber ? "text-green-600" : "text-gray-400"}>
                    ✓ Contains number
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sites Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Sites <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500 -mt-2">
              Select the sites this admin will manage
            </p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
              {availableSites.map((site) => (
                <label
                  key={site.id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedSites.includes(site.id)}
                    onChange={() => handleSiteToggle(site.id)}
                    className="w-4 h-4 text-[#F47521] focus:ring-[#F47521] border-gray-300 rounded"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900">
                      {site.name}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">
                      ({site.location})
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      {site.company}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Selected Sites Summary */}
          {formData.selectedSites.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-3">
              <p className="text-xs font-medium text-[#F47521] mb-2">
                Selected Sites ({formData.selectedSites.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.selectedSites.map(id => {
                  const site = availableSites.find(s => s.id === id);
                  return (
                    <span
                      key={id}
                      className="px-2 py-1 bg-white text-xs text-gray-700 rounded-full border border-orange-200"
                    >
                      {site?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-medium text-white bg-[#F47521] rounded-lg hover:bg-[#E65024] transition-colors shadow-lg hover:shadow-xl"
            >
              Add Site Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSiteAdminModal;