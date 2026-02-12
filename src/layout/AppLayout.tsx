import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppSidebar from "./AppSideBar";

const LayoutContent = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        className="mt-18"
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="min-h-screen xl:flex">
        {/* sidebar section */}
        <div className="fixed left-0 top-0 h-screen z-50">
          <AppSidebar />
        </div>

        {/* main content section */}
        <div className="flex-1 ml-[290px] transition-all duration-300">
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const AppLayout = () => {
  return <LayoutContent />;
};

export default AppLayout;