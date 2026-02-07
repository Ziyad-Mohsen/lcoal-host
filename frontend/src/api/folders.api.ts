import { axiosInstance } from "@/lib/axios";
import { AxiosError, type AxiosResponse } from "axios";

export async function createFolder(data: { path: string; folderName: string }) {
  try {
    if (!data.path || !data.folderName) {
      throw new Error("Missing folderName or path");
    }

    const res: AxiosResponse<{ message: string }> = await axiosInstance.post(
      "/folder",
      data,
    );
    return { message: res.data.message, success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        message: error.response?.data.message || error.message || error,
        success: false,
      };
    }
  }
}
