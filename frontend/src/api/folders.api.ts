import { axiosInstance } from "@/lib/axios";
import { AxiosError, type AxiosResponse } from "axios";
import type { ApiResponse } from "../../../backend/types";

export async function createFolder(data: { path: string; folderName: string }) {
  try {
    if (!data.path || !data.folderName) {
      throw { message: "Missing folderName or path" };
    }

    const res: AxiosResponse<{ message: string }> = await axiosInstance.post(
      "/folder",
      data,
    );
    return { message: res.data.message, success: true };
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw { message: "Something went wrong, Try again later" };
  }
}

export async function deleteFolder(folderPath: string) {
  try {
    const res: AxiosResponse<ApiResponse> = await axiosInstance.delete(
      `/folder`,
      { params: { path: folderPath } },
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw { message: "Something went wrong, Try again later" };
  }
}
