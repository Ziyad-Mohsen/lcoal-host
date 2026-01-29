import { readdir, stat } from "node:fs/promises";
import type { Request, Response } from "express";
import path from "node:path";
import { STORAGE_ROOT } from "../../config/server.ts";
import type { FileStats } from "../../../types/index.ts";

export const getAllFiles = async (req: Request, res: Response) => {
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

        return {
          name,
          size: stats.size,
          isFile: stats.isFile(),
          createdAt: stats.birthtime,
        };
      })
    );
    res.status(200).json({ files });
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
