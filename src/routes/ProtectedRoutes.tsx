import { Navigate } from "react-router-dom";
import { JSX } from "react";

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const loggedIn = localStorage.getItem("token");
    return loggedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoutes;