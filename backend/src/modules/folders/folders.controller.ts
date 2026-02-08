import { CreateFolderRequestBody } from "../folders/folder.validations.ts";
import { mkdir, rm, stat } from "node:fs/promises";
import type { NextFunction, Request, Response } from "express";
import path from "node:path";
import { STORAGE_ROOT } from "../../config/server.ts";
import type { ApiResponse } from "../../../types/index.ts";

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

export const deleteFolder = async (
  req: Request,
  res: Response<ApiResponse>,
  next: NextFunction
) => {
  try {
    const relativePath = (req.query.path as string) || "";
    if (!relativePath)
      res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid folder path",
        data: null,
        errors: null,
      });
    const fullPath = path.resolve(STORAGE_ROOT, "." + relativePath);

    if (!fullPath.startsWith(STORAGE_ROOT)) {
      return res.status(403).json({
        success: false,
        status: 403,
        message: "You don't have access to this path",
        data: null,
        errors: null,
      });
    }

    await rm(fullPath, { recursive: true });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Folder is deleted successfully",
      data: null,
      errors: null,
    });
  } catch (error) {
    next(error);
  }
};
