import type { NextFunction, Request, Response } from "express";
import type { ApiResponse } from "../../types";

// TODO: return better error message
function getPublicErrorMessage(err: Error) {
  if ("code" in err) {
    switch ((err as NodeJS.ErrnoException).code) {
      case "ENOENT":
        return "Resource not found";
      case "EACCES":
      case "EPERM":
        return "Permission denied";
      case "ENOTDIR":
        return "Invalid path";
      default:
        return "File system error";
    }
  }

  return "Internal server error";
}

export async function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) {
  const message = getPublicErrorMessage(err);
  console.error({ message: err.message, stack: err.stack });
  return res.status(500).json({
    success: false,
    status: 500,
    message,
    data: null,
    errors: null,
  });
}
