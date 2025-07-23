import api from "../../src/interceptors/axiosInterceptors";


export const uploadMusicApi = async (formData: FormData) => {
    try {
        const token = await localStorage.getItem("token");

        if (!token) throw new Error("Authorization token not found");

        const response = await api.post("music/uploadMusic", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("~ uploadMusicApi response:", response.data)
        return response.data;

    } catch (error) {
        console.error('Error uploading music:', error);
        throw error;
    }
};



export const getAllMusicApi = async (page: number, limit: 50) => {
    try {
        const response = await api.get(`music/getAllMusic?limit=${limit}&page=${page}`);
        console.log("~ getAllMusicApi response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching all music:", error);
        throw error;
    }
};

export const deleteSelectedMusicApi = async (ids: string[]) => {
    try {
        const token = await localStorage.getItem("token");

        if (!token) throw new Error("Authorization token not found");

        const response = await api.delete(`music/deleteSelectedMusic`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: { ids },
        });

        console.log("deleteSelectedMusic response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting music:", error);
        throw error;
    }
};

export const deleteAllMusicApi = async () => {
    try {
        const token = await localStorage.getItem("token");

        if (!token) throw new Error("Authorization token not found");

        const response = await api.delete("music/deleteAllMusic", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log("deleteAllMusic response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error deleting all music:", error);
        throw error;
    }
};


export const exportAllMusicCsvApi = async () => {
    try {
        const token = await localStorage.getItem("token");

        if (!token) throw new Error("Authorization token not found");

        const response = await api.post("music/exportAllMusic", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'musics.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error exporting music CSV:", error);
        throw error;
    }
};


export const updateMusicStatus = async (id: any, status: any) => {
    try {
        const token = await localStorage.getItem("token");
        if (!token) throw new Error("Authorization token not found");


        const response = await api.put(
            `music/updateMusic/${id}`,
            status,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("updateMusicStatus response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error exporting selected music:", error);
        throw error;
    }
};


export const exportSelectedMusicApi = async (ids: string[]) => {
    try {
        const response = await api.post(
            "music/exportSelectedMusic",
            { ids },
            { responseType: "blob" }
        );

        const blob = new Blob([response.data], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "music.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
        return response.data;
    } catch (error) {
        console.error("CSV export failed:", error);
        throw error;
    }
};


// 688111d0cc9c6856f519681e