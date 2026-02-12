import { useEffect, useRef } from "react";
import { toast } from "react-toastify"
import { IAllCompanies } from "../../interface";


interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  addCompanyData: {
    companyName: string;
    emailAddress: string;
    password: string;
    totalCapital: string;
  };
  setAddCompanyData: React.Dispatch<React.SetStateAction<{
    companyName: string;
    emailAddress: string;
    password: string;
    totalCapital: string;
  }>>;
  allCompanies: any[];
  setAllCompanies: React.Dispatch<React.SetStateAction<IAllCompanies[]>>
};



const AddCompanyModal = ({ isOpen, onClose, setAddCompanyData, addCompanyData, allCompanies, setAllCompanies }: AddCompanyModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);


  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent scroll on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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

  const handleChangeValue = (name: string, text: string) => {
    console.log("🚀 ~ handleChangeValue ~ name:", name)
    setAddCompanyData({
      ...addCompanyData,
      [name]: text
    });
  };

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();

    if (!addCompanyData.companyName || !addCompanyData.emailAddress || !addCompanyData.password || !addCompanyData.totalCapital) {
      toast.error("All fields are required!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    };

    setAllCompanies([...allCompanies, addCompanyData])
    setAddCompanyData({ companyName: "", emailAddress: "", password: "", totalCapital: "" });
    onClose();
    console.log("All Companies:", [...allCompanies, addCompanyData]);
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop - Semi-transparent background */}
      <div className="absolute inset-0  bg-opacity-50 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl animate-in fade-in zoom-in duration-300"
      >
        {/* Close button - Top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Add New Company</h2>
          <p className="mt-1 text-sm text-gray-500">
            Fill in the details below to add a new company
          </p>
        </div>

        {/* Modal Body - Form */}
        <form className="space-y-4">
          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="companyName"
              onChange={(e) => handleChangeValue("companyName", e.target.value)}
              name="companyName"
              value={addCompanyData.companyName}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* Email */}

          <div>
            <div className="flex items-center">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <span className="text-[12px]">(Company admin login email)</span>
            </div>
            <input
              type="email"
              onChange={(e) => handleChangeValue("emailAddress", e.target.value)}
              value={addCompanyData.emailAddress}

              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="tel"
              id="password"
              onChange={(e) => handleChangeValue("password", e.target.value)}
              value={addCompanyData.password}

              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Enter password"
            />
          </div>

          {/* Total Capital */}
          <div>

            <div className="flex">
              <label htmlFor="Totalcapital" className="block text-sm font-medium text-gray-700 mb-1">
                Total Capital
              </label>
              <span className="text-[12px] ml-2">(Total Budget For this company)</span>
            </div>


            <textarea
              id="Totalcapital"
              name="Totalcapital"
              rows={3}
              onChange={(e) => handleChangeValue("totalCapital", e.target.value)}
              value={addCompanyData.totalCapital}

              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
              placeholder="Rs:"
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                const pastedText = e.clipboardData.getData('text');
                const numbersOnly = pastedText.replace(/[^0-9]/g, '');
                e.currentTarget.value = numbersOnly;
              }}
            />
          </div>


        </form>

        {/* Modal Footer - Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleAddCompany}
            className="px-4 py-2 text-sm font-medium text-white bg-[#F47521] rounded-md hover:bg-[#E65024] focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:ring-offset-2 transition-colors"
          >
            Add Company
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;