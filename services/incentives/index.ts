import { AddIncentivesPayload, AddIncentivesValues } from "../../src/interface";
import api from "../../src/interceptors/axiosInterceptors.ts";

// ✅ POST Incentives
export const addIncentivesApi = async (values: AddIncentivesPayload) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.post("incentives/addincentives",
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("🚀 ~ addIncentivesApi response:", response.data);
    return response.data; // Return only useful data
  } catch (error) {
    console.error("🚀 ~ addIncentivesApi error:", error);
    throw error;
  }
};


export const getIncentivesApi = async () => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");
    console.log("🚀 ~ getIncentivesApi ~ token:", token)

    const response = await api.get("incentives/getIncentives", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🚀 ~ getIncentivesApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ getIncentivesApi error:", error);
    throw error;
  }
};



export const deleteIncentivesApi = async (incentivesIds: number[]) => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");
    console.log("deleteIncentivesApi ~ token:", token)

    const response = await api.delete("incentives/deleteIncentives", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: incentivesIds
      }
    });

    console.log("delete incnetrive response:", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};



export const updateIncentiveApi = async (id: string, valuesIncentives: AddIncentivesValues) => {
  try {
    const token = await localStorage.getItem("token");
    if (!token) throw new Error("Authorization token not found");

    const response = await api.put(
      `incentives/updateIncentive/${id}`,
      valuesIncentives,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("update incentive response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
