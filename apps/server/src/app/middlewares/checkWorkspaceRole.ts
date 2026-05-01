/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../lib/prisma";

export const checkWorkspaceRole = (requiredRole: "ADMIN" | "MEMBER") => {
  return async (req: any, res: any, next: any) => {
    try {
      // 🔒 ensure auth ran first
      if (!req.user?.id) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: user missing",
        });
      }

      let workspaceId =
        req.body?.workspaceId || req.params?.workspaceId;

      // 🔥 handle routes like /pin/:id
      if (!workspaceId && req.params?.id) {
        const announcement = await prisma.announcement.findUnique({
          where: { id: req.params.id },
          select: { workspaceId: true },
        });

        if (!announcement) {
          return res.status(404).json({
            success: false,
            message: "Announcement not found",
          });
        }

        workspaceId = announcement.workspaceId;
      }

      // ❗ still no workspaceId → bad request
      if (!workspaceId) {
        return res.status(400).json({
          success: false,
          message: "workspaceId is required for authorization",
        });
      }

      const membership = await prisma.workspaceMember.findFirst({
        where: {
          workspaceId,
          userId: req.user.id,
        },
      });

      if (!membership || membership.role !== requiredRole) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Not enough workspace permissions",
        });
      }

      next();
    } catch (error: any) {
      console.error("WorkspaceRole Error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Authorization failed",
      });
    }
  };
};