import { AxiosError, type AxiosResponse } from "axios";
import { axiosInstance } from "../lib/axios";
import {
  type ApiResponse,
  type FileStats,
  type StorageInfo,
} from "@/../../backend/types/index.ts";

export async function getAllFiles(path?: string): Promise<FileStats[] | null> {
  try {
    const res: AxiosResponse<ApiResponse<FileStats[]>> =
      await axiosInstance.get(`/files?path=${path}`);
    return res.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    console.error(error);
    throw new Error("Failed to fetch files");
  }
}

export async function deleteFile(filePath: string) {
  try {
    const res: AxiosResponse<ApiResponse> = await axiosInstance.delete(
      `/files/delete`,
      { params: { path: filePath } },
    );
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error.response?.data;
    }
    throw { message: "Something went wrong, Try again later" };
  }
}

export async function getStorageInfo() {
  try {
    const res: AxiosResponse<ApiResponse<StorageInfo>> =
      await axiosInstance.get("/files/storage");
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
}
