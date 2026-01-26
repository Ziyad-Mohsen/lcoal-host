import express, {
  type Application,
  type Request,
  type Response,
} from "express";

const app: Application = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

app.get("/api", (_req: Request, res: Response) => {
  res.send("sladkjf");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
