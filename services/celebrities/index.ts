import api from "../../src/interceptors/axiosInterceptors";

export const getCelebritiesApi = async (page: number = 1, limit: number = 50) => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.get(`uploadfiles/getCelebrities?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🚀 ~ getCelebritiesApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ getCelebritiesApi error:", error);
    throw error;
  }
};

export const celebrityUploadApi = async (formData: FormData) => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.post("uploadfiles/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    
    console.log("🚀 ~ celebrityUploadApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ celebrityUploadApi error:", error);
    throw error;
  }
};

export const multipleCelebrityUploadApi = async (
  formData: FormData,
  onUploadProgress?: (progress: number) => void
) => {
  console.log("🚀 ~ formData:", formData)
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.post("uploadfiles/multiple", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / (event.total || 1));
        if (onUploadProgress) {
          onUploadProgress(percent);
        }
      },
    });

    console.log("🚀 ~ multipleCelebrityUploadApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ multipleCelebrityUploadApi error:", error);
    throw error;
  }
};



export const exportCsvCelebritiesApi = async () => {
  try {

    const response = await api.get("uploadfiles/exportCelebrities", {
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'celebrities_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return response.data;

  } catch (error) {
    console.error("CSV export failed:", error);
    throw error;
  }
};


// export const updateCelebrityApi = async (id: string, formData: FormData) => {
//   try {
//     const token = await localStorage.getItem("token");

//     if (!token) throw new Error("Authorization token not found");

//     const response = await api.put(`uploadfiles/updateCelebrity/${id}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("🚀 ~ updateCelebrityApi response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("🚀 ~ updateCelebrityApi error:", error);
//     throw error;
//   }
// };



export const updateCelebrityApi = async (id: string, data: any) => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.put(`uploadfiles/updateCelebrity/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ updateCelebrityApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("updateCelebrityApi error:", error);
    throw error;
  }
};

export const exportDownloadCelebrityCSVApi = async (ids: string[]) => {
  try {
    // const token = localStorage.getItem("token");
    const response = await api.post(
      "uploadfiles/exportSelectedCelebrities",
      { ids },
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response.data]));
    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `celebrities.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCelebritiesApi = async (celebritiesIds: string[]) => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.delete("uploadfiles/deleteCelebrities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: celebritiesIds,
      },
    });

    console.log("🚀 ~ deleteCelebritiesApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ deleteCelebritiesApi error:", error);
    throw error;
  }
};




export const deleteAllCelebritiesApi = async () => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");

    const response = await api.delete("uploadfiles/deleteAllCelebrities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("🚀 ~ deleteCelebritiesApi response:", response.data);
    return response.data;
  } catch (error) {
    console.error("🚀 ~ deleteAllCelebrities error:", error);
    throw error;
  }
};



// export const exportSelectedCelebritiesApi = async (celebritiesIds: string[]) => {
//   try {
//     const token = await localStorage.getItem("token");

//     if (!token) throw new Error("Authorization token not found");

//     const response = await api.post("uploadfiles/export", { ids: celebritiesIds }, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     console.log("🚀 ~ exportSelectedCelebritiesApi response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("🚀 ~ exportSelectedCelebritiesApi error:", error);
//     throw error;
//   }
// };