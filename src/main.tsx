import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
// import { AppWrapper } from "./components/common/PageMeta.tsx";
// import { ThemeProvider } from "./context/ThemeContext.tsx";
// import { AuthProvider } from "./context/AuthContext.tsx";
// import { ToastContainer } from "react-toastify";
// import { GlobalMainProvider } from "./context/GlobalMainContext.tsx";
 
createRoot(document.getElementById("root")!).render(

  <StrictMode>
    {/* <ThemeProvider> */}
      {/* <AuthProvider> */}
        {/* <GlobalMainProvider> */}
          {/* <AppWrapper> */}
            <App />
            {/* <ToastContainer /> */}
          {/* </AppWrapper> */}
        {/* </GlobalMainProvider> */}
      {/* </AuthProvider> */}
    {/* </ThemeProvider> */}
   
  </StrictMode>
);