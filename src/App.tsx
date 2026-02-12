import { BrowserRouter as Router, Routes, Route } from "react-router";
import NotFound from "./pages/OtherPage/NotFound";
import Dashboard from "./pages/Dashboard/page";
import Companies from "./pages/Companies/page";
import Sites from "./pages/Sites/page";
import SiteAdmins from "./pages/SiteAdmins/page";
import AuditLogs from "./pages/AuditLogs/page";
import Settings from "./pages/Settings/page";
import AppLayout from "./layout/AppLayout";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Main Layout with all protected routes */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />
          <Route path="sites" element={<Sites />} />
          <Route path="siteAdmins" element={<SiteAdmins />} />
          <Route path="auditLogs" element={<AuditLogs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* 404 Page - Must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;