import api from "../../src/interceptors/axiosInterceptors.ts";

export const celebrityUploadApi = async (
  acceptedFiles: File[],
  onUploadSuccess: (url: string, fileName: string) => void,
  onUploadProgress?: (progress: number) => void
) => {
  const file = acceptedFiles[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("files", file);

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

    const imageUrl = response.data?.data?.[0]?.url;
    const fileName = response.data?.data?.[0]?.filename;
    onUploadSuccess(imageUrl, fileName);

    return response.data;
  } catch (error) {
    console.error("Upload failed", error);
  }
};