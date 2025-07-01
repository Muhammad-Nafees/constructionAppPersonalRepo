export const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    window.location.href = "/signin"; // fallback redirect
};