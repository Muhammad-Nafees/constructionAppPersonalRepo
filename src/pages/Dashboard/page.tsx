import { useState } from "react";

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState("February");
  const [selectedYear, setSelectedYear] = useState("2026");

  // Months data
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Years data
  const years = ["2024", "2025", "2026", "2027", "2028"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-gray-600 text-lg">Welcome back,</p>
          <p className="text-[#F47521] text-lg font-semibold">Super Admin!</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 6V4M12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10M12 6C13.1046 6 14 6.89543 14 8C14 9.10457 13.1046 10 12 10M6 20H18M6 20C4.89543 20 4 19.1046 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V18C20 19.1046 19.1046 20 18 20M6 20H8M12 10V20" 
              strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Month Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Month</label>
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent text-gray-700"
              >
                {months.map((month) => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Year</label>
            <div className="relative">
              <select 
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#F47521] focus:border-transparent text-gray-700"
              >
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9L12 15L18 9" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Month Expenses Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">Month Expenses</h3>
            <span className="text-xs px-2 py-1 bg-orange-50 text-[#F47521] rounded-full">
              {selectedMonth} {selectedYear}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">Rs 0</p>
          <p className="text-xs text-gray-400 mt-2">No expenses this month</p>
        </div>

        {/* Total Allocated Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Allocated</h3>
          <p className="text-3xl font-bold text-gray-900">Rs 0</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs text-gray-500">Remaining:</span>
            <span className="text-xs font-semibold text-red-500">Rs 0</span>
          </div>
        </div>

        {/* Total Sites Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Total Sites</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>

        {/* Site Admins Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" 
                  strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" 
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="text-sm font-medium text-gray-500">Site Admins</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>

      {/* Expenses by Item Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Expenses by Item */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Expenses by Item</h3>
              <p className="text-xs text-gray-500 mt-1">{selectedMonth} {selectedYear}</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5V7H15V5M9 5H15" 
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12H15M9 16H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z" 
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h4 className="text-base font-medium text-gray-700 mb-1">No expense data for this month</h4>
            <p className="text-sm text-gray-400 text-center">
              Expenses will appear here once you start tracking
            </p>
          </div>
        </div>

        {/* Items Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Items Distribution</h3>
              <p className="text-xs text-gray-500 mt-1">Category wise breakdown</p>
            </div>
            <div className="p-2 bg-gray-50 rounded-lg">
              <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 3.055C9.68075 3.2847 8.43407 3.82754 7.35763 4.63205C6.28119 5.43656 5.41099 6.47467 4.81818 7.66675C4.22537 8.85882 3.92857 10.1642 3.95206 11.4792C3.97555 12.7943 4.31864 14.0874 4.95202 15.2553C5.5854 16.4232 6.49037 17.4274 7.59271 18.191C8.69505 18.9546 9.95798 19.4526 11.2836 19.6423C12.6092 19.832 13.957 20 15 20" 
                  strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12C21 13.2 20.5 14.2 19.7 15.1C18.9 15.9 17.8 16.5 16.5 16.8L13 18L14.2 14.5C14.6 13.2 14.9 11.6 14.9 10.1C14.9 9 14.7 7.9 14.3 6.9C15.4 7.5 16.3 8.3 17 9.2C17.7 10.1 18.1 11 18.4 11.9C18.6 12.6 18.8 13.3 18.8 14" 
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Empty State - Pie Chart Placeholder */}
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <div className="relative w-32 h-32 mb-6">
              {/* Empty Circle */}
              <svg className="w-32 h-32" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#F47521"
                  strokeWidth="10"
                  strokeDasharray="0 251.2"
                  className="transition-all duration-500"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-300">0%</span>
              </div>
            </div>
            <h4 className="text-base font-medium text-gray-700 mb-1">No data available</h4>
            <p className="text-sm text-gray-400 text-center">
              Add expenses to see distribution
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section (Optional - Add if needed) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          <button className="text-sm text-[#F47521] hover:text-[#E65024] font-medium">
            View All
          </button>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-400">No recent activity</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;