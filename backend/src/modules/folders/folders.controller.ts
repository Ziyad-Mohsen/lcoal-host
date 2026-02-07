import { CreateFolderRequestBody } from "../folders/folder.validations.ts";
import { mkdir, stat } from "node:fs/promises";
import type { NextFunction, Request, Response } from "express";
import path from "node:path";
import { STORAGE_ROOT } from "../../config/server.ts";

export const createFolder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { success, error, data } = CreateFolderRequestBody.safeParse(
      req.body
    );

    if (!success) {
      return res.status(422).json({
        message: `Error with ${error.issues[0].path}: ${error.issues[0].message}`,
      });
    }

    const fullPath = path.resolve(
      STORAGE_ROOT + data.path + "/" + data.folderName
    );

    const stats = await stat(path.resolve(STORAGE_ROOT + data.path));

    if (!stats.isDirectory()) {
      return res.status(409).json({ message: "Path is not a directory" });
    }
    console.log(fullPath);
    await mkdir(fullPath);
    return res.json({ message: "Folder created successfully" });
  } catch (error) {
    next(error);
  }
};
