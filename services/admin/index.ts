import { ICreateAdminValues, SettingsValuesSchema, SignInValues } from "../../src/interface";
import api from "../../src/interceptors/axiosInterceptors.ts";

export const createAdmin = async (values: ICreateAdminValues) => {
    try {
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ createAdmin ~ token:", token)
        const response = await api.post("auth/create-admin", values, {
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



export const updateSuperAdminApi = async (values: SettingsValuesSchema) => {
    try {
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ updateAdmin ~ token:", token)
        const response = await api.put(`auth/update-super-admin`, values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🚀 ~ updateAdmin ~ response:", response);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ updateAdmin ~ error:", error);
        throw error;
    }
};


export const updateSubAdminApi = async (values: SettingsValuesSchema & { id: string }) => {
    try {
        const { id, ...payload } = values;
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ updateAdmin ~ token:", token);
        console.log("🚀 ~ updateAdmin ~ id:", id);
        console.log("🚀 ~ updateAdmin ~ payload:", payload);
        const response = await api.put(`auth/update-sub-admin/${id}`, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🚀 ~ updateAdmin ~ response:", response);
        return response.data;
    } catch (error) {
        console.log("🚀 ~ updateAdmin ~ error:", error);
        throw error;
    }
};


export const deleteAdminApi = async (id: any) => {
    try {

    } catch (error) {
        console.log("🚀 ~ deleteAdminApi ~ error:", error)
        throw error;
    }
};

export const deleteAllAdminsApi = async () => {
    try {

    } catch (error) {
        console.log("🚀 ~ deleteAdminApi ~ error:", error)
        throw error;
    }
}



export const createSuperAdminApi = async (values: ICreateAdminValues) => {
    console.log("🚀 ~ createSuperAdminApi ~ values:", values)
    try {
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ createSuperAdmin ~ token:", token)
        const response = await api.post("auth/createSuperAdmin", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🚀 ~ createSuperAdmin ~ response:", response)
        return response.data;
    } catch (error) {
        console.log("🚀 ~ createSuperAdmin ~ error:", error)
        throw error;
    }
};

export const getAllAdminsApi = async (page: number, limit = 50) => {
    try {
        const token = await localStorage.getItem("token");
        console.log("🚀 ~ getAdmins ~ token:", token)

        const response = await api.get(`auth/all-admins?limit=${limit}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("🚀 ~ getAdmins ~ response:", response);
        return response?.data;
    } catch (error) {
        console.log("🚀 ~ getAdmins ~ error:", error);
        throw error;
    }
};



export const deleteAdmin = async (id: string) => {
    try {
        const token = await localStorage.getItem("token");
        const response = await api.delete(`auth/delete-admin/${id}`, {
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
