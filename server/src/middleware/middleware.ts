import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/utils.js";

export function errorHandler(
  err: ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof ApiError) {
    console.error(`[Error]: ${err.message}`);

    return res.status(err.statusCode).json({
      success: false,
      error: {
        status: err.statusCode,
        message: err.message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
      },
    });
  }

  console.error(`[Error]: ${err.message}`);

  return res.status(500).json({
    success: false,
    error: {
      status: 500,
      message: "Internal Server Error",
    },
  });
}
