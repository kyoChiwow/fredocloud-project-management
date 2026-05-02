import { Router } from "express";
import { InviteController } from "./invite.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkWorkspaceRole } from "../../middlewares/checkWorkspaceRole";

const router = Router();

// Invite user (ADMIN only)
router.post(
  "/invite",
  checkAuth(),
  checkWorkspaceRole("ADMIN"),
  InviteController.inviteMember
);

// Accept invite
router.post(
  "/accept",
  checkAuth(),
  InviteController.acceptInvite
);

// Get my invites
router.get(
  "/my-invites",
  checkAuth(),
  InviteController.getMyInvites
);

// Update role (ADMIN only)
router.patch(
  "/role",
  checkAuth(),
  checkWorkspaceRole("ADMIN"),
  InviteController.updateMemberRole
);

export const InviteRoutes = router;