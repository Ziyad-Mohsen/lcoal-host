import express from "express";
import multer, { type StorageEngine } from "multer";
import path from "node:path";
import { access, mkdir } from "node:fs/promises";
import {
  deleteFile,
  downloadFile,
  filesCount,
  getStorageSize,
  listFiles,
  uploadFile,
} from "./files.controller.ts";
import { MAX_FILE_SIZE, STORAGE_ROOT } from "../../config/server.ts";
import {
  checkStorageSize,
  cleanupOnAbort,
  validateUploadPath,
} from "./files.middlewares.ts";

const router = express.Router();

const storage: StorageEngine = multer.diskStorage({
  destination(req, _file, cb): void {
    try {
      const rawPath = (req.query.path as string) || "/";
      const normalized = path.posix.normalize(
        rawPath.startsWith("/") ? rawPath : `/${rawPath}`
      );

      const targetPath =
        normalized === "/"
          ? STORAGE_ROOT
          : path.resolve(STORAGE_ROOT, "." + normalized);
      const dir = targetPath;

      if (!dir.startsWith(STORAGE_ROOT)) {
        return cb(new Error("Invalid upload path"), STORAGE_ROOT);
      }

      void mkdir(dir, { recursive: true })
        .then(() => cb(null, dir))
        .catch((error: unknown) =>
          cb(
            error instanceof Error ? error : new Error("Upload path error"),
            dir
          )
        );
    } catch (error) {
      cb(error as Error, STORAGE_ROOT);
    }
  },
  filename(req, file, cb): void {
    const rawPath = (req.query.path as string) || "/";
    const normalized = path.posix.normalize(
      rawPath.startsWith("/") ? rawPath : `/${rawPath}`
    );

    const basePath =
      normalized === "/"
        ? STORAGE_ROOT
        : path.resolve(STORAGE_ROOT, "." + normalized);

    const originalName = file.originalname;
    const ext = path.extname(originalName);
    const base = path.basename(originalName, ext);

    const buildName = (attempt: number) =>
      attempt === 0 ? `${base}${ext}` : `${base}${attempt}${ext}`;

    const resolveName = async (
      attempt: number
    ): Promise<{
      fileName: string;
      fullPath: string;
    }> => {
      const fileName = buildName(attempt);
      const fullPath = path.join(basePath, fileName);

      try {
        await access(fullPath);
        return resolveName(attempt + 1);
      } catch {
        return { fileName, fullPath };
      }
    };

    void resolveName(0)
      .then(({ fileName, fullPath }) => {
        (req as { _uploadedFilePath?: string })._uploadedFilePath = fullPath;
        cb(null, fileName);
      })
      .catch((error: unknown) => {
        cb(
          error instanceof Error ? error : new Error("Upload filename error"),
          originalName
        );
      });
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
});

router.get("/count", filesCount);
router.get("/", listFiles);
router.get("/download", downloadFile);
router.delete("/delete", deleteFile);
router.get("/storage", getStorageSize);
router.post(
  "/upload",
  validateUploadPath,
  cleanupOnAbort,
  upload.single("file"),
  checkStorageSize,
  uploadFile
);

export default router;
