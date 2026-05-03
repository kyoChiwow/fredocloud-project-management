/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../lib/prisma";
import { getIO } from "../../../sockets";
import { NotificationService } from "../notifications/notifications.service";
import {
  IInviteMember,
  IUpdateMemberRole,
} from "./invite.interface";

const inviteMemberService = async (
  data: IInviteMember & { invitedById: string }
) => {
  const invite = await prisma.workspaceInvite.create({
    data: {
      email: data.email,
      workspaceId: data.workspaceId,
      role: data.role || "MEMBER",
      invitedById: data.invitedById,
    },
  });

  const user = await prisma.user.findUnique({
  where: { email: data.email },
});

const workspace = await prisma.workspace.findUnique({
  where: { id: data.workspaceId },
});

if (user) {
 await NotificationService.createNotificationService({
  userId: user.id,
  workspaceId: data.workspaceId,
  message: `You were invited to ${workspace?.name}`,
  type: "INVITE",
  meta: {
    inviteId: invite.id,
  },
});
}

  return invite;
};

const acceptInviteService = async (data: any) => {
  const invite = await prisma.workspaceInvite.findUnique({
    where: { id: data.inviteId },
  });

  if (!invite) throw new Error("Invite not found");

  // 1. Create membership
  const membership = await prisma.workspaceMember.create({
    data: {
      userId: data.userId,
      workspaceId: invite.workspaceId,
      role: invite.role,
    },
    include: {
      workspace: true, // 🔥 IMPORTANT
    },
  });

  // 2. Update invite
  await prisma.workspaceInvite.update({
    where: { id: invite.id },
    data: { status: "ACCEPTED" },
  });

  await NotificationService.createNotificationService({
  userId: invite.invitedById,
  workspaceId: invite.workspaceId,
  message: `Invite accepted by user`,
  type: "INFO",
});

  // 🔥 3. EMIT REALTIME EVENT TO USER
  const io = getIO();

  io.to(`user:${data.userId}`).emit("workspace-joined", {
    workspace: membership.workspace,
    role: membership.role,
  });

  return membership;
};

const getMyInvitesService = async (email: string) => {
  return prisma.workspaceInvite.findMany({
    where: {
      email,
      status: "PENDING",
    },
    include: {
      workspace: true,
    },
  });
};

const updateMemberRoleService = async (data: IUpdateMemberRole) => {
  return prisma.workspaceMember.update({
    where: {
      userId_workspaceId: {
        userId: data.memberId,
        workspaceId: data.workspaceId,
      },
    },
    data: {
      role: data.role,
    },
  });
};

export const InviteService = {
  inviteMemberService,
  acceptInviteService,
  getMyInvitesService,
  updateMemberRoleService,
};