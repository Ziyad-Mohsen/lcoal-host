import os from "os";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import filesRouter from "./modules/files/files.routes.ts";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/files", filesRouter);

app.get("/api/v1", (_req: Request, res: Response) => {
  res.json({ message: "hello world" });
});

const getLocalIpAddress = () => {
  const networkInterfaces = os.networkInterfaces();

  for (const interfaceName in networkInterfaces) {
    const interfaces = networkInterfaces[interfaceName];
    for (const iface of interfaces || []) {
      // Check for IPv4, not internal (loopback), and within the 192.168 range
      if (
        iface.family === "IPv4" &&
        !iface.internal &&
        iface.address.startsWith("192.168")
      ) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1 (Local IP not found)";
};

const myIp = getLocalIpAddress();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on:`);
  console.log(`Local: http://localhost:${port}`);
  console.log(`Network: http://${myIp}:${port}`);
});
