import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import Incentives from "./pages/Incentives/Incentives";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import MediaGallery from "./pages/MediaGallery/MediaGallery";
import Music from "./pages/Music/Music";
import Users from "./pages/Users/Users";
import Accounts from "./pages/Accounts/Accounts";
import Finances from "./pages/Finances/Finances";
import ManageSubAdmins from "./pages/ManageSubAdmins/ManageSubAdmins"
import PrivateRoute from "./routes/ProtectedRoutes";
import PublicRoute from "./routes/PublicRoutes";
import { ToastContainer } from "react-toastify";
import BasicTables from "./pages/Tables/BasicTables";



export default function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }>
            <Route path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/incentives" element={<Incentives />} />
            <Route path="/media-gallery" element={<MediaGallery />} />
            <Route path="/music" element={<Music />} />
            <Route path="/users" element={<Users />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/finances" element={<Finances />} />
            <Route path="/profile" element={<UserProfiles />} />
            {/* <Route path="/manage-sub-admins" element={<ManageSubAdmins />} /> */}

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          <Route
            path="/signin"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />

          {/* Auth Layout */}
          {/* <Route path="/signup" element={<SignUp />} /> */}

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};