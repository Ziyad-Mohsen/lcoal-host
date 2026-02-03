import { readdir, stat } from "node:fs/promises";
import type { Request, Response } from "express";
import path from "node:path";
import { MAX_TOTAL_SIZE, STORAGE_ROOT } from "../../config/server.ts";
import type { FileStats, StorageInfo } from "../../../types/index.ts";
import getFolderSize from "get-folder-size";
import mime from "mime-types";

export const listFiles = async (req: Request, res: Response) => {
  try {
    const relativePath = (req.query.path as string) || "/";
    const fullPath = path.resolve(STORAGE_ROOT, "." + relativePath);

    // TODO: extract to middleware
    if (!fullPath.startsWith(STORAGE_ROOT)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const fileNames = await readdir(fullPath, {
      recursive: false,
    });

    const files: FileStats[] = await Promise.all(
      fileNames.map(async (name) => {
        const filePath = path.join(fullPath, name);
        const stats = await stat(filePath);
        const extension = stats.isFile() ? name.split(".").at(-1) : null;
        const mimeType = mime.lookup(extension || "") || null;

        return {
          name,
          size: stats.size,
          extension,
          mimeType,
          isFile: stats.isFile(),
          createdAt: stats.birthtime.toString(),
        };
      })
    );
    const sortedFiles = files.sort((a, b) => {
      if (a.isFile && !b.isFile) {
        return 1;
      }
      if (!a.isFile && b.isFile) {
        return -1;
      }
      return 0;
    });

    res.status(200).json({
      files: sortedFiles,
    });
  } catch (error) {
    // TODO: better error response
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const downloadFile = async (req: Request, res: Response) => {
  try {
    const relativePath = (req.query.path as string) || "/";
    const fullPath = path.resolve(STORAGE_ROOT, "." + relativePath);

    if (!fullPath.startsWith(STORAGE_ROOT)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const fileStat = await stat(fullPath);
    if (!fileStat.isFile()) {
      res.status(422).json({ message: "Provided path is not a file" });
    }

    res.download(fullPath);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
};

export const getStorageSize = async (_req: Request, res: Response) => {
  try {
    const size = await getFolderSize.strict(STORAGE_ROOT);

    const storageInfo: StorageInfo = {
      maxSize: MAX_TOTAL_SIZE,
      size,
      percentage: (size / MAX_TOTAL_SIZE) * 100,
    };

    return res.status(200).json(storageInfo);
  } catch (error) {
    console.error("Failed to calculate storage size:", error);

    return res.status(500).json({
      message: "Failed to calculate storage size",
    });
  }
};
