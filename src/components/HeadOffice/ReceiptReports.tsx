// components/HeadOffice/ReceiptReports.tsx
import { useState } from "react";

interface Props {
  receipts: any[];
  onClose: () => void;
}

const ReceiptReports = ({ receipts, onClose }: Props) => {
  const [reportType, setReportType] = useState<"monthly" | "yearly">("monthly");

  const monthlyData = receipts.reduce((acc: any, receipt) => {
    const month = receipt.date.substring(0, 7);
    if (!acc[month]) acc[month] = 0;
    acc[month] += receipt.amount;
    return acc;
  }, {});

  const yearlyData = receipts.reduce((acc: any, receipt) => {
    const year = receipt.date.substring(0, 4);
    if (!acc[year]) acc[year] = 0;
    acc[year] += receipt.amount;
    return acc;
  }, {});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
       <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
       />
      <div className="absolute inset-0 bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Receipt Reports</h3>
        
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setReportType("monthly")}
            className={`px-4 py-2 rounded-lg ${reportType === "monthly" ? "bg-[#F47521] text-white" : "bg-gray-100"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setReportType("yearly")}
            className={`px-4 py-2 rounded-lg ${reportType === "yearly" ? "bg-[#F47521] text-white" : "bg-gray-100"}`}
          >
            Yearly
          </button>
        </div>

        <div className="space-y-3">
          {Object.entries(reportType === "monthly" ? monthlyData : yearlyData).map(([period, amount]) => (
            <div key={period} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{period}</span>
              <span className="text-green-600 font-bold">Rs. {(amount as number).toLocaleString()}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 rounded-lg">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptReports;