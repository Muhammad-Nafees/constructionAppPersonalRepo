import { JSX } from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
    const loggedIn = localStorage.getItem("loggedIn");
    return loggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;
