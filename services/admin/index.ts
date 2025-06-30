import axios, { AxiosResponse } from "axios";
import { base_url, localBaseUrl } from "../../src/constant/index";
import { ICreateAdminValues, SignInValues } from "../../src/interface";

export const createAdmin = (values: ICreateAdminValues) => {
    try {
        const token = localStorage.getItem("token");
        console.log("🚀 ~ createAdmin ~ token:", token)
        const response: Promise<AxiosResponse<any, any>> = axios.post(localBaseUrl + "admin/create-admin", values, {
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



export const getAdmins = () => {
    try {
        const token = localStorage.getItem("token");
        console.log("🚀 ~ getAdmins ~ token:", token)
        const response = axios.get(base_url + "admin/all-admins", {
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

export const deleteAdmin = (id: string) => {
    try {
        const token = localStorage.getItem("token");
        const response = axios.delete(base_url + `admin/delete-admin/${id}`, {
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



export const loginAdmin = (values: SignInValues) => {
    try {
        const response: Promise<AxiosResponse<any, any>> = axios.post(localBaseUrl + "auth/loginAdmin", values)
        console.log("🚀 ~ createAdmin ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ createAdmin ~ error:", error)
        throw error;
    }
};