import axios, { AxiosResponse } from "axios";
import { localBaseUrl } from "../../src/constant/index";
import { SignInValues } from "../../src/interface";

export const createAdmin = () => {
    try {
        const response: Promise<AxiosResponse<any, any>> = axios.post(localBaseUrl + "admin/create-admin",)
        console.log("🚀 ~ createAdmin ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ createAdmin ~ error:", error)
        throw error;
    }
};

export const getAdmins = () => {
    try {
        const response: Promise<AxiosResponse<any, any>> = axios.get(localBaseUrl + "admin/all-admins")
        console.log("🚀 ~ createAdmin ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ createAdmin ~ error:", error)
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