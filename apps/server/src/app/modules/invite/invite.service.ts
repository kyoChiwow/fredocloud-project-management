/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../lib/prisma";
import {
  IInviteMember,
  IAcceptInvite,
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

  return invite;
};

const acceptInviteService = async (
  data: IAcceptInvite & { userId: string }
) => {
  const invite = await prisma.workspaceInvite.findUnique({
    where: { id: data.inviteId },
  });

  if (!invite) throw new Error("Invite not found");

  // Create membership
  await prisma.workspaceMember.create({
    data: {
      userId: data.userId,
      workspaceId: invite.workspaceId,
      role: invite.role,
    },
  });

  // Update invite status
  await prisma.workspaceInvite.update({
    where: { id: invite.id },
    data: { status: "ACCEPTED" },
  });

  return { message: "Joined workspace successfully" };
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