// pages/PettyCash/AuditLogs/index.tsx
import { useState } from "react";
// import LoginHistory from "./LoginHistory";
// import DataChangeHistory from "./DataChangeHistory";

const AuditLogs = () => {
  const [activeTab, setActiveTab] = useState<"login" | "changes">("login");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Audit Logs</h2>
      
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab("login")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "login" ? "text-[#F47521] border-b-2 border-[#F47521]" : "text-gray-500"}`}
        >
          Login History
        </button>
        <button
          onClick={() => setActiveTab("changes")}
          className={`px-4 py-2 text-sm font-medium ${activeTab === "changes" ? "text-[#F47521] border-b-2 border-[#F47521]" : "text-gray-500"}`}
        >
          Data Change History
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 border">
        {/* {activeTab === "login" && <LoginHistory />}
        {activeTab === "changes" && <DataChangeHistory />} */}
      </div>
    </div>
  );
};

export default AuditLogs;