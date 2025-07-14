import { AddIncentivesPayload } from "../../src/interface";
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



export const getIncentivesApi = async (page: number, limit = 50) => {
  console.log("incentivesApiIIINNNN ~ page:", page)
  try {
    const token = await localStorage.getItem("token");
    if (!token) throw new Error("Authorization token not found");

    const response = await api.get(
      `incentives/getIncentives?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("🚀 ~ getIncentivesApi ~ response:", response?.data?.docs)
    return response.data;
  } catch (error) {
    console.error("getIncentivesApi error:", error);
    throw error;
  }
};



export const deleteAllIncentivesApi = async () => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");
    console.log("🚀 ~ deleteAllIncentives ~ token:", token)

    const response = await api.get("incentives/deleteAllIncentives", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🚀 ~ deleteAllIncentives response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ deleteAllIncentives error:", error);
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



export const updateIncentiveApi = async (id: any, valuesIncentives: any) => {
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

export const uploadCsvIncentivesApi = async (
  file: File,
  onUploadSuccess: (message: string) => void,
  onUploadProgress?: (progress: number) => void
) => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post("incentives/upload-csv", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / (event.total || 1));
        if (onUploadProgress) {
          onUploadProgress(percent);
        }
      },
    });

    if (response.data?.message) {
      onUploadSuccess(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error("CSV upload failed:", error);
    throw error;
  }
};


export const exportCsvIncentivesApi = async () => {
  try {
    const response = await api.get("incentives/exportIncentives", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data], { type: 'text/csv' }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "incentives.csv"); // 🎯 file name
    document.body.appendChild(link);
    link.click();
    link.remove();

  } catch (error) {
    console.error("CSV export failed:", error);
    throw error;
  }
};


// router.post("/upload-csv", upload.single("file"), uploadCSVIncentives);
// router.get("/exportIncentives", exportAllIncentives); // Bulk export
