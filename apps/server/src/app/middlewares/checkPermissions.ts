/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../lib/prisma";
import { ROLE_PERMISSIONS } from "../../rbacConstants";

export const checkPermission = (permission: string) => {
  return async (req: any, res: any, next: any) => {
    try {
      let workspaceId = req.body.workspaceId || req.params.workspaceId;

      // 🔥 handle routes like /pin/:id
      if (!workspaceId && req.params.id) {
        const announcement = await prisma.announcement.findUnique({
          where: { id: req.params.id },
          select: { workspaceId: true },
        });

        if (!announcement) {
          return res.status(404).json({
            success: false,
            message: "Resource not found",
          });
        }

        workspaceId = announcement.workspaceId;
      }

      const membership = await prisma.workspaceMember.findFirst({
        where: {
          workspaceId,
          userId: req.user.id,
        },
      });

      if (!membership) {
        return res.status(403).json({
          success: false,
          message: "Not part of workspace",
        });
      }

      const allowedPermissions =
        ROLE_PERMISSIONS[membership.role as "ADMIN" | "MEMBER"];

      if (!allowedPermissions.includes(permission)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: Permission denied",
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Authorization failed",
      });
    }
  };
};