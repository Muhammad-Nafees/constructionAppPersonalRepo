import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const SitesLogin = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === "sites123") {
      toast.success("Access Granted! Welcome to Sites Dashboard.");
      navigate("/sites/dashboard");
    } else {
      toast.error("Invalid Password! Try: sites123");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
        {/* Similar to Head Office but with Sites branding */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-4xl text-white font-bold">S</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sites Access</h1>
          <p className="text-gray-500 text-sm mt-2">
            Enter password to continue to Sites Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            placeholder="Enter sites password"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-white rounded-lg"
          >
            Continue to Sites →
          </button>
        </form>
      </div>
    </div>
  );
};

export default SitesLogin;