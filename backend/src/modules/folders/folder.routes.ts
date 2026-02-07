import express from "express";
import { createFolder } from "./folders.controller.ts";

const router = express.Router();

router.post("/", createFolder);

export default router;
