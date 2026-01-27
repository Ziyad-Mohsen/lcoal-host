import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import filesRouter from "./modules/files/files.routes.ts";

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1/files", filesRouter);

app.get("/api/v1", (_req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
