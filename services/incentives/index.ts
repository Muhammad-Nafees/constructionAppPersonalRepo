import axios from "axios";
import { localBaseUrl } from "../../src/constant/index";
import { AddIncentivesPayload } from "../../src/interface";

// ✅ POST Incentives
export const addIncentivesApi = async (values: AddIncentivesPayload) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await axios.post(
      `${localBaseUrl}incentives/addincentives`,
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

// ✅ GET Incentives
export const getIncentivesApi = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await axios.get(`${localBaseUrl}incentives/getIncentives`, {
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
