/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import { prisma } from "../../../lib/prisma";

export const checkAuth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get token from header (standard for APIs)
      const token = req.headers.authorization?.split(" ")[1] || req.cookies.accessToken;

      if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
      }

      // 2. Verify Token
      const decoded = jwt.verify(token, envVars.JWT_ACCESS_SECRET) as JwtPayload;

      // 3. Check if user exists in DB and isn't deleted
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user || user.isDeleted) {
        return res.status(401).json({ success: false, message: "User not found or deleted" });
      }

      // 4. Role check (if roles are provided)
      if (roles.length > 0 && !roles.includes(user.role)) {
        return res.status(403).json({ success: false, message: "Forbidden: Insufficient permissions" });
      }

      // 5. Success: Attach user to request
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
  };
};
