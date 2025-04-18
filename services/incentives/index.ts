// {{fameOflame}}api/incentives/addincentives

import axios, { AxiosResponse } from "axios";
import { localBaseUrl } from "../../src/constant/index";
import { AddIncentivesPayload } from "../../src/interface";

export const addIncentivesApi = (values: AddIncentivesPayload) => {

    try {
        const token = localStorage.getItem("token");
        const response: Promise<AxiosResponse<any, any>> = axios.post(localBaseUrl + "incentives/addincentives", values, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log("🚀 ~ addIncentives ~ response:", response)
        return response
    } catch (error) {
        console.log("🚀 ~ addIncentives ~ error:", error)
        throw error;
    }
};