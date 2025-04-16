import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { JSX } from "react";

const ProtectedRoutes = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth();
    const loggedIn = window.localStorage.getItem("loggedIn");
    return loggedIn ? children : <Navigate to="/signin" />;
};

export default ProtectedRoutes;