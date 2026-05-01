/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorSources = [
    {
      path: "",
      message: err.message || "Something went wrong!",
    },
  ];

  // Handle Zod Validation Errors
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorSources = err.issues.map((issue) => ({
      path: issue.path[issue.path.length - 1] as string,
      message: issue.message,
    }));
  }
  // Handle Prisma Unique Constraint Errors (e.g., Email already exists)
  else if (err.code === "P2002") {
    statusCode = 400;
    message = "Duplicate Entry";
    errorSources = [
      {
        path: err.meta?.target?.[0] || "",
        message: `${err.meta?.target?.[0]} already exists`,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
