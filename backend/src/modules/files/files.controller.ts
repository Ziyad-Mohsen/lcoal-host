import { readdir, stat } from "node:fs/promises";
import type { Request, Response } from "express";
import path from "node:path";
import { MAX_TOTAL_SIZE, STORAGE_ROOT } from "../../config/server.ts";
import type { FileStats } from "../../../types/index.ts";
import getFolderSize from "get-folder-size";

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
        const extension = name.split(".").at(-1);

        return {
          name,
          size: stats.size,
          extension: stats.isFile() ? extension : null,
          isFile: stats.isFile(),
          createdAt: stats.birthtime,
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
    // TODO: use error middleware
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

    return res.status(200).json({
      maxSize: MAX_TOTAL_SIZE,
      size,
      percentage: (size / MAX_TOTAL_SIZE) * 100,
    });
  } catch (error) {
    console.error("Failed to calculate storage size:", error);

    return res.status(500).json({
      message: "Failed to calculate storage size",
    });
  }
};
