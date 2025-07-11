import api from "../../src/interceptors/axiosInterceptors.ts";

export const celebrityUploadApi = async (
  acceptedFiles: File[],
  values: {
    celebrityName: string;
    celebrityGender: string;
    celebrityProfession: string;
    celebrityImage: string;
  },
  onUploadSuccess: (url: string, fileName: string) => void,
  onUploadProgress?: (progress: number) => void
) => {

  if (!acceptedFiles || acceptedFiles.length === 0) return;

  const formData = new FormData();

  acceptedFiles.forEach((file) => {
    formData.append("files", file);
  });

  const entry = {
    celebrityName: values.celebrityName,
    celebrityGender: values.celebrityGender,
    professionNationality: values.celebrityProfession,
  };

  formData.append("entries", JSON.stringify(entry));

  try {
    const response = await api.post("uploadfiles/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        const percent = Math.round((event.loaded * 100) / (event.total || 1));
        if (onUploadProgress) {
          onUploadProgress(percent);
        }
      },
    });

    const firstItem = response.data?.data?.[0];
    const firstImage = firstItem?.images?.[0];

    if (firstImage?.url && firstImage?.filename) {
      onUploadSuccess(firstImage.url, firstImage.filename);
    }

    return response.data;
  } catch (error) {
    console.error("Upload failed", error);
  }
};



export const getCelebritiesApi = async () => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");
    console.log("🚀 ~ getIncentivesApi ~ token:", token)

    const response = await api.get("uploadfiles/getCelebrities", {
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



export const deleteCelebritiesApi = async (celebritiesIds: number[]) => {
  try {
    const token = await localStorage.getItem("token");

    if (!token) throw new Error("Authorization token not found");
    console.log("deleteIncentivesApi ~ token:", token)

    const response = await api.delete("uploadfiles/deleteCelebrities", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        ids: celebritiesIds
      }
    });

    console.log("delete incnetrive response:", response.data);
    return response;
  } catch (error) {
    throw error;
  }
};
