// pages/PettyCash/Reports/index.tsx
import { useState } from "react";
import MonthlyReport from "../../../components/PrettyCash/MonthlyReport";
import SiteWiseReport from "../../../components/PrettyCash/SiteWiseReport";
import AllocatedSummary from "../../../components/PrettyCash/AllocatedSummary";
 

const Reports = () => {
  const [activeReport, setActiveReport] = useState<"monthly" | "sitewise" | "allocated">("monthly");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
      
      {/* Report Type Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveReport("monthly")}
          className={`px-4 py-2 text-sm font-medium ${activeReport === "monthly" ? "text-[#F47521] border-b-2 border-[#F47521]" : "text-gray-500"}`}
        >
          Monthly Report
        </button>
        <button
          onClick={() => setActiveReport("sitewise")}
          className={`px-4 py-2 text-sm font-medium ${activeReport === "sitewise" ? "text-[#F47521] border-b-2 border-[#F47521]" : "text-gray-500"}`}
        >
          Site-wise Report
        </button>
        <button
          onClick={() => setActiveReport("allocated")}
          className={`px-4 py-2 text-sm font-medium ${activeReport === "allocated" ? "text-[#F47521] border-b-2 border-[#F47521]" : "text-gray-500"}`}
        >
          Allocated Summary
        </button>
      </div>

      {/* Report Content */}
      <div className="bg-white rounded-xl p-6 border">
        {activeReport === "monthly" && <MonthlyReport />}
        {activeReport === "sitewise" && <SiteWiseReport />}
        {activeReport === "allocated" && <AllocatedSummary />}
      </div>
    </div>
  );
};

export default Reports;