import express from "express";
import { downloadFile, getAllFiles } from "./files.controller.ts";

const router = express.Router();

router.get("/", getAllFiles);
router.get("/download", downloadFile);

export default router;
