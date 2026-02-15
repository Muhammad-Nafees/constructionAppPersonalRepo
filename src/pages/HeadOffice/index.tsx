import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const HeadOfficeLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // For demo purpose - simple password
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "headoffice123") {
      toast.success("Access Granted! Welcome to Head Office.");
      navigate("/head-office/dashboard");
    } else {
      toast.error("Invalid Password! Try: headoffice123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F47521] to-[#E65024] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-500">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#F47521] to-[#E65024] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl text-white font-bold">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Head Office Access</h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter password to continue to Head Office Dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent"
                placeholder="Enter head office password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Demo Password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">headoffice123</span>
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#F47521] to-[#E65024] text-white font-semibold rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Continue to Head Office →
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          ⚡ This is a demo access. Real authentication will be implemented later.
        </p>
      </div>
    </div>
  );
};

export default HeadOfficeLogin;