import express from "express";
import { downloadFile, getStorageSize, listFiles } from "./files.controller.ts";

const router = express.Router();

router.get("/", listFiles);
router.get("/download", downloadFile);
router.get("/storage", getStorageSize);

export default router;
