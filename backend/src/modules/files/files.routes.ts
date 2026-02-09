import express from "express";
import {
  deleteFile,
  downloadFile,
  getStorageSize,
  listFiles,
} from "./files.controller.ts";

const router = express.Router();

router.get("/", listFiles);
router.get("/download", downloadFile);
router.delete("/delete", deleteFile);
router.get("/storage", getStorageSize);

export default router;
