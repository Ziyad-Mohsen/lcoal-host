import {
  type NextFunction,
  type RequestHandler,
  type Request,
  type Response,
} from "express";
import getFolderSize from "get-folder-size";
import path from "node:path";
import { rm } from "node:fs/promises";
import { MAX_TOTAL_SIZE, STORAGE_ROOT } from "../../config/server.ts";

type RequestWithFile = Request & { file?: Express.Multer.File };

/**
 * Runs after multer. Rejects if current storage (including this file and any
 * other uploads already on disk) exceeds max. On reject, deletes the uploaded
 * file so storage stays within limit.
 */
export const checkStorageSize: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const file = (req as RequestWithFile).file;
  if (!file) {
    return next();
  }

  try {
    const storageFolderSize = await getFolderSize.strict(STORAGE_ROOT);
    if (storageFolderSize > MAX_TOTAL_SIZE) {
      await rm(file.path).catch(() => {});
      res.status(507).json({
        success: false,
        status: 507,
        message: "Storage limit reached. Delete some files to free space.",
        data: null,
        errors: null,
      });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};

export const validateUploadPath: RequestHandler = (
  req: Request,
  res: Response,
  next
) => {
  const rawPath = (req.query.path as string) || "/";
  const normalized = path.posix.normalize(
    rawPath.startsWith("/") ? rawPath : `/${rawPath}`
  );

  const lastSegment = path.posix.basename(normalized);
  const looksLikeFile =
    lastSegment !== "" &&
    lastSegment.includes(".") &&
    !normalized.endsWith("/");

  if (looksLikeFile) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Upload path must be a folder, not a file name",
      data: null,
      errors: null,
    });
  }

  next();
};

export const cleanupOnAbort: RequestHandler = (req, _res, next) => {
  req.on("aborted", () => {
    const filePath = (req as { _uploadedFilePath?: string })._uploadedFilePath;
    if (!filePath) return;

    void rm(filePath).catch(() => {
      // Swallow errors from cleanup
    });
  });

  next();
};
