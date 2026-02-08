import express from "express";
import { createFolder, deleteFolder } from "./folders.controller.ts";

const router = express.Router();

router.post("/", createFolder);
router.delete("/", deleteFolder);

export default router;
