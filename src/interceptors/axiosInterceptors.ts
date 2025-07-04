import axios from "axios";
import { localBaseUrl } from "../constant";
import { toast } from "react-toastify";
import { logoutHandler } from "../../src/utils/logoutHandler";
// const navigate = useNavigate();

const api = axios.create({
    baseURL: localBaseUrl,
    withCredentials: true // So cookies are sent
});



api.interceptors.response.use(
    (response) => {
        console.log("🚀 ~ response:", response);
        // Successful response - no changes
        return response;
    },
    async (error) => {
        console.log("🚀 ~ error:", error)
        if (
            error.response?.status === 401 &&
            error.response?.data?.message === "Invalid Token"
        ) {
            try {
                const refreshRes = await api.post("auth/refresh-token");
                console.log("🚀 ~ refreshRes:", refreshRes.data)
                const newAccessToken = refreshRes.data.userAccessToken;
                //original request with new token
                error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return api(error.config);
            } catch (refreshError) {
                console.log("Refresh token failed", refreshError);
                logoutHandler();
                toast.error("Session expired. Please login again.");
                return Promise.reject(refreshError);
            }
        };
        const message = error.response?.data?.message || "Something went wrong";
        toast.error(message);

        return Promise.reject(error);
    }
);

export default api;