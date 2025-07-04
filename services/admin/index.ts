import { ICreateAdminValues, SignInValues } from "../../src/interface";
import api from "../../src/interceptors/axiosInterceptors.ts";

export const createAdmin = async (values: ICreateAdminValues) => {
    try {
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ createAdmin ~ token:", token)
        const response = await api.post("admin/create-admin", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log("🚀 ~ createAdmin ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ createAdmin ~ error:", error)
        throw error;
    }
};



export const getAdmins = async () => {
    try {
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ getAdmins ~ token:", token)
        const response = await api.get("admin/all-admins", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🚀 ~ getAdmins ~ response:", response);
        return response;
    } catch (error) {
        console.log("🚀 ~ getAdmins ~ error:", error);
        throw error;
    }
};

export const deleteAdmin = async (id: string) => {
    try {
        const token = await localStorage.getItem("token");
        const response = await api.delete(`admin/delete-admin/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🚀 ~ getAdmins ~ response:", response);
        return response;
    } catch (error) {
        console.log("🚀 ~ getAdmins ~ error:", error);
        throw error;
    }
};



export const loginAdmin = async (values: SignInValues) => {
    try {
        const response = await api.post("auth/loginAdmin", values)
        console.log("🚀 ~ createAdmin ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ createAdmin ~ error:", error)
        throw error;
    }
};

export const logoutApi = async () => {
    await localStorage.removeItem("token");
    await localStorage.removeItem("userData");
    try {
        const response = await api.post("auth/logout",)
        console.log("🚀 ~ delete ~ response:", response.data)
        return response;
    } catch (error) {
        console.log("🚀 ~ createAdmin ~ error:", error)
        throw error;
    }
};

// navigate("/signin");
