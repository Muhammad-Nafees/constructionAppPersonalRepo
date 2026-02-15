import { useState,   } from "react";
import { toast } from "react-toastify";
import AddBankAccountModal from "../../../components/HeadOffice/AddBankAccountModal";
import UploadStatementModal from "../../../components/HeadOffice/UploadStatementModal";
import ManualEntryModal from "../../../components/HeadOffice/ManualEntryModal";

interface BankAccount {
  id: number;
  bankName: string;
  accountNumber: string;
  accountTitle: string;
  openingBalance: number;
  currentBalance: number;
}

interface Transaction {
  id: number;
  date: string;
  bankAccountId: number;
  bankName?: string;
  description: string;
  debit: number;
  credit: number;
  balance: number;
  referenceNo?: string;
}

const BankStatements = () => {
  // State for bank accounts
  const [accounts, setAccounts] = useState<BankAccount[]>([
    { 
      id: 1, 
      bankName: "Habib Bank Limited (HBL)", 
      accountNumber: "1234-5678-9012-3456", 
      accountTitle: "Head Office Main Account",
      openingBalance: 500000,
      currentBalance: 1250000
    },
    { 
      id: 2, 
      bankName: "United Bank Limited (UBL)", 
      accountNumber: "9876-5432-1098-7654", 
      accountTitle: "Project Account - BWD5",
      openingBalance: 300000,
      currentBalance: 780000
    },
    { 
      id: 3, 
      bankName: "Meezan Bank", 
      accountNumber: "5678-1234-9012-3456", 
      accountTitle: "Staff Salary Account",
      openingBalance: 200000,
      currentBalance: 450000
    },
  ]);

  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { 
      id: 1, 
      date: "2026-02-01", 
      bankAccountId: 1,
      bankName: "Habib Bank Limited (HBL)",
      description: "Opening Balance", 
      debit: 0, 
      credit: 500000, 
      balance: 500000 
    },
    { 
      id: 2, 
      date: "2026-02-05", 
      bankAccountId: 1,
      bankName: "Habib Bank Limited (HBL)",
      description: "Site Payment - BWD5", 
      debit: 0, 
      credit: 250000, 
      balance: 750000 
    },
    { 
      id: 3, 
      date: "2026-02-07", 
      bankAccountId: 1,
      bankName: "Habib Bank Limited (HBL)",
      description: "Office Rent", 
      debit: 100000, 
      credit: 0, 
      balance: 650000 
    },
    { 
      id: 4, 
      date: "2026-02-10", 
      bankAccountId: 1,
      bankName: "Habib Bank Limited (HBL)",
      description: "Contractor Payment", 
      debit: 200000, 
      credit: 0, 
      balance: 450000 
    },
    { 
      id: 5, 
      date: "2026-02-12", 
      bankAccountId: 1,
      bankName: "Habib Bank Limited (HBL)",
      description: "Site Payment - Lakhani", 
      debit: 0, 
      credit: 350000, 
      balance: 800000 
    },
    { 
      id: 6, 
      date: "2026-02-15", 
      bankAccountId: 2,
      bankName: "United Bank Limited (UBL)",
      description: "Opening Balance", 
      debit: 0, 
      credit: 300000, 
      balance: 300000 
    },
    { 
      id: 7, 
      date: "2026-02-18", 
      bankAccountId: 2,
      bankName: "United Bank Limited (UBL)",
      description: "Material Purchase", 
      debit: 120000, 
      credit: 0, 
      balance: 180000 
    },
  ]);

  // Modal states
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);

  // Filter states
  const [selectedAccount, setSelectedAccount] = useState<number | "all">("all");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [searchTerm, setSearchTerm] = useState("");

  // Report states
  const [showMonthlyReport, setShowMonthlyReport] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  // Calculate totals
  const totalDebit = transactions.reduce((sum, t) => sum + t.debit, 0);
  const totalCredit = transactions.reduce((sum, t) => sum + t.credit, 0);
  // const totalBalance = accounts.reduce((sum, a) => sum + a.currentBalance, 0);

  // Get opening balance for selected account
  const getOpeningBalance = () => {
    if (selectedAccount === "all") {
      return accounts.reduce((sum, a) => sum + a.openingBalance, 0);
    }
    const account = accounts.find(a => a.id === selectedAccount);
    return account?.openingBalance || 0;
  };

  // Get closing balance for selected account
  const getClosingBalance = () => {
    if (selectedAccount === "all") {
      return accounts.reduce((sum, a) => sum + a.currentBalance, 0);
    }
    const account = accounts.find(a => a.id === selectedAccount);
    return account?.currentBalance || 0;
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(t => {
    // Account filter
    if (selectedAccount !== "all" && t.bankAccountId !== selectedAccount) return false;
    
    // Date range filter
    if (dateRange.from && t.date < dateRange.from) return false;
    if (dateRange.to && t.date > dateRange.to) return false;
    
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        t.description.toLowerCase().includes(searchLower) ||
        t.bankName?.toLowerCase().includes(searchLower) ||
        t.referenceNo?.toLowerCase().includes(searchLower)
      );
    }
    
    return true;
  });

  // Sort by date (latest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Handle Add Bank Account
  const handleAddAccount = (newAccount: BankAccount) => {
    setAccounts([...accounts, newAccount]);
    toast.success("Bank account added successfully!");
  };

  // Handle Manual Entry
  const handleManualEntry = (transaction: Transaction) => {
    // Update account balance
    const updatedAccounts = accounts.map(acc => {
      if (acc.id === transaction.bankAccountId) {
        return {
          ...acc,
          currentBalance: transaction.balance
        };
      }
      return acc;
    });
    
    setAccounts(updatedAccounts);
    setTransactions([...transactions, transaction]);
    toast.success("Transaction added successfully!");
  };

  // Handle Upload Statement
  const handleUploadStatement = () => {
    // This would parse the uploaded file and add transactions
    toast.success("Statement uploaded successfully!");
    // In real app, you'd process the file and add transactions
  };

  // Export to Excel
  const exportToExcel = () => {
    // Create CSV content
    const headers = ["Date", "Bank", "Description", "Debit", "Credit", "Balance"];
    const csvContent = [
      headers.join(","),
      ...sortedTransactions.map(t => 
        [t.date, t.bankName, `"${t.description}"`, t.debit, t.credit, t.balance].join(",")
      )
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bank-statements-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    toast.success("Exported to Excel successfully!");
  };

  // Export to PDF (simplified - would use a library in real app)
  const exportToPDF = () => {
    toast.info("PDF export will be implemented with a PDF library");
  };

  // Monthly Report
  const MonthlyReportModal = () => {
    const monthlyTransactions = transactions.filter(t => 
      t.date.startsWith(selectedMonth)
    );

    const monthlyDebit = monthlyTransactions.reduce((sum, t) => sum + t.debit, 0);
    const monthlyCredit = monthlyTransactions.reduce((sum, t) => sum + t.credit, 0);
    // const monthlyBalance = monthlyCredit - monthlyDebit;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-md" 
        onClick={() => setShowMonthlyReport(false)} 
      />
        <div className="absolute inset-0 bg-opacity-50" onClick={() => setShowMonthlyReport(false)} />
        <div className="relative bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Monthly Statement Report</h3>
            <button onClick={() => setShowMonthlyReport(false)} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="mb-4">
            <input 
              type="month" 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Opening Balance</p>
              <p className="text-2xl font-bold text-blue-600">Rs. {getOpeningBalance().toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Monthly Credit</p>
              <p className="text-2xl font-bold text-green-600">Rs. {monthlyCredit.toLocaleString()}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Monthly Debit</p>
              <p className="text-2xl font-bold text-red-600">Rs. {monthlyDebit.toLocaleString()}</p>
            </div>
          </div>

          <table className="w-full border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Bank</th>
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-right">Debit</th>
                <th className="px-4 py-2 text-right">Credit</th>
                <th className="px-4 py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {monthlyTransactions.map(t => (
                <tr key={t.id}>
                  <td className="px-4 py-2">{t.date}</td>
                  <td className="px-4 py-2">{t.bankName}</td>
                  <td className="px-4 py-2">{t.description}</td>
                  <td className="px-4 py-2 text-right text-red-600">{t.debit > 0 ? t.debit.toLocaleString() : '-'}</td>
                  <td className="px-4 py-2 text-right text-green-600">{t.credit > 0 ? t.credit.toLocaleString() : '-'}</td>
                  <td className="px-4 py-2 text-right font-medium">{t.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with all features */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Bank Statements</h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track all company bank accounts and transactions
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setShowManualEntry(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
          >
            <span>📝</span> Manual Entry
          </button>
          <button
            onClick={() => setShowUpload(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <span>📤</span> Upload Statement
          </button>
          <button
            onClick={() => setShowAddAccount(true)}
            className="px-4 py-2 bg-[#F47521] text-white rounded-lg hover:bg-[#E65024] flex items-center gap-2"
          >
            <span>+</span> Add Bank Account
          </button>
        </div>
      </div>

      {/* Summary Cards with Opening/Closing Balance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Opening Balance</p>
          <p className="text-2xl font-bold text-blue-600">Rs. {getOpeningBalance().toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Debit</p>
          <p className="text-2xl font-bold text-red-600">Rs. {totalDebit.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Total Credit</p>
          <p className="text-2xl font-bold text-green-600">Rs. {totalCredit.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Closing Balance</p>
          <p className="text-2xl font-bold text-gray-900">Rs. {getClosingBalance().toLocaleString()}</p>
        </div>
      </div>

      {/* Bank Accounts Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {accounts.map(account => (
          <div key={account.id} className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{account.bankName}</h3>
                <p className="text-sm text-gray-500">{account.accountTitle}</p>
                <p className="text-xs text-gray-400 mt-1 font-mono">{account.accountNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Opening</p>
                <p className="text-sm font-medium">Rs. {account.openingBalance.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Current</p>
                <p className="text-sm font-bold text-blue-600">Rs. {account.currentBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters Section - Date-wise Filter */}
      <div className="bg-white rounded-xl p-4 border border-gray-100">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs text-gray-500 mb-1">Select Bank Account</label>
            <select
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value === "all" ? "all" : Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              <option value="all">All Accounts</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>{acc.bankName} - {acc.accountTitle}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">From Date</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">To Date</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
              className="px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs text-gray-500 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <button
            onClick={() => {
              setSelectedAccount("all");
              setDateRange({ from: "", to: "" });
              setSearchTerm("");
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 mt-4"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Export and Report Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowMonthlyReport(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>📊</span> Monthly Report
        </button>
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
        >
          <span>📥</span> Export Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
        >
          <span>📄</span> Export PDF
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Bank Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Account #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Debit (Rs)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Credit (Rs)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Balance (Rs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sortedTransactions.map((tx) => {
                const account = accounts.find(a => a.id === tx.bankAccountId);
                return (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{tx.date}</td>
                    <td className="px-4 py-3 text-sm">{account?.bankName}</td>
                    <td className="px-4 py-3 text-sm font-mono">{account?.accountNumber}</td>
                    <td className="px-4 py-3 text-sm">{tx.description}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-600 font-medium">
                      {tx.debit > 0 ? `Rs. ${tx.debit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">
                      {tx.credit > 0 ? `Rs. ${tx.credit.toLocaleString()}` : '-'}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-gray-900">
                      Rs. {tx.balance.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {sortedTransactions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No transactions found</p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showAddAccount && (
        <AddBankAccountModal
          onClose={() => setShowAddAccount(false)}
          onSave={handleAddAccount}
        />
      )}

      {showUpload && (
        <UploadStatementModal
          onClose={() => setShowUpload(false)}
          onUpload={handleUploadStatement}
          accounts={accounts}
        />
      )}

      {showManualEntry && (
        <ManualEntryModal
          accounts={accounts}
          onClose={() => setShowManualEntry(false)}
          onSave={handleManualEntry}
        />
      )}

      {showMonthlyReport && <MonthlyReportModal />}
    </div>
  );
};

export default BankStatements;