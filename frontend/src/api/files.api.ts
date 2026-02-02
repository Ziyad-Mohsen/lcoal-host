import { AxiosError, type AxiosResponse } from "axios";
import { axiosInstance } from "../lib/axios";
import {
  type FileStats,
  type StorageInfo,
} from "@/../../backend/types/index.ts";

export async function getAllFiles(path?: string): Promise<FileStats[]> {
  try {
    const res: AxiosResponse<{ files: FileStats[] }> = await axiosInstance.get(
      `/files?path=${path}`,
    );
    return res.data.files;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    console.error(error);
    throw new Error("Failed to fetch files");
  }
}

export async function getStorageInfo() {
  try {
    const res: AxiosResponse<StorageInfo> =
      await axiosInstance.get("/files/storage");
    return res.data;
  } catch (error) {
    console.error(error);
  }
}
