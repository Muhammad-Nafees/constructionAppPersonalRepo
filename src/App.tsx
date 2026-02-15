import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layout
import AppLayout from "./layout/AppLayout";

// Head Office
import HeadOfficeLogin from "./pages/HeadOffice";
// import HeadOfficeDashboard from "./pages/hea";
import BankStatements from "./pages/HeadOffice/BankStatement/page";
import SiteDetails from "./pages/HeadOffice/SiteDetails/page";
import Receipts from "./pages/HeadOffice/Reciepts/page";
import HeadOfficeExpenses from "./pages/HeadOffice/Expenses/page";
import HomeExpenses from "./pages/HeadOffice/HomeExpenses/page";

// Other Pages
 
import NotFound from "./pages/OtherPage/NotFound";

// Petty Cash / Sites
import PettyCashSites from "./pages/Sites/Sites/page";
import PettyExpenses from "./pages/Sites/Expenses/page";
import AuditLogs from "./pages/Sites/AuditLogs/page";
import Reports from "./pages/Sites/Reports/page";
// import Sites from "./pages/Sites/page";
import SitesLogin from "./pages/Sites";
import PettyCashDashboard from "./pages/Sites/Dashboard/page";
import SiteAdmins from "./pages/Sites/SiteAdmins/page";

// // Protected Route Component (Temporary - for UI only)
// const TempProtected = ({ children }: { children: React.ReactNode }) => {
//   // For now, just render children. Authentication will be added later
//   return <>{children}</>;
// };

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Main Layout - All routes inside AppLayout */}
        <Route path="/" element={<AppLayout />}>

          {/* Redirect root to dashboard or any default page */}
          <Route index element={<Navigate to="/head-office/login" replace />} />

          {/* HEAD OFFICE ROUTES */}
          <Route path="head-office/login" element={<HeadOfficeLogin />} />
          {/* <Route path="head-office" element={<HeadOfficeDashboard />}> */}
          <Route path="/head-office/bank-statements" element={<BankStatements />} />
          <Route path="/head-office/site-details" element={<SiteDetails />} />
          <Route path="/head-office/receipts" element={<Receipts />} />
          <Route path="/head-office/expenses" element={<HeadOfficeExpenses />} />
          <Route path="/head-office/home-expenses" element={<HomeExpenses />} />
          {/* Default redirect for head-office */}
          <Route index element={<Navigate to="bank-statements" replace />} />
          {/* </Route> */}

          {/* SITES / PETTY CASH ROUTES */}
          <Route path="sites/login" element={<SitesLogin />} />
          {/* <Route path="/sites" element={<PettyCashDashboard />}> */}
            <Route path="/sites/dashboard" element={<PettyCashDashboard />} /> {/* Overview */}
            <Route path="/sites/expenses" element={<PettyExpenses />} />
            <Route path="/sites/reports" element={<Reports />} />
            <Route path="/sites/admins" element={<SiteAdmins/>} />
            <Route path="/sites/list" element={<PettyCashSites />} /> {/* Sites list */}
            <Route path="/sites/audit-logs" element={<AuditLogs />} />
            {/* Default redirect for sites */}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* OTHER EXISTING ROUTES */}
          {/* <Route path="companies" element={
            <TempProtected>
              <Companies />
            </TempProtected>
          } />

          <Route path="settings" element={
            <TempProtected>
              <Settings />
            </TempProtected>
          } /> */}

          {/* 404 - Not Found */}
          <Route path="*" element={<NotFound />} />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;