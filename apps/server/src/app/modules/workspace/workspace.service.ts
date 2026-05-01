import { prisma } from "../../../../lib/prisma";
import { ICreateWorkspace } from "./workspace.interface";

const createWorkspaceService = async (
  userId: string,
  payload: ICreateWorkspace
) => {
  const result = await prisma.workspace.create({
    data: {
      name: payload.name,
      description: payload.description,
      accentColor: payload.accentColor || "#3B82F6",
      members: {
        create: {
          userId,
          role: "ADMIN",
        },
      },
    },
    include: {
      members: true,
    },
  });

  return result;
};

const getUserWorkspacesService = async (userId: string) => {
  return prisma.workspaceMember.findMany({
    where: { userId },
    include: {
      workspace: true,
    },
  });
};

const getWorkspaceByIdService = async (workspaceId: string) => {
  return prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
};

const deleteWorkspaceService = async (
  workspaceId: string,
  userId: string
) => {
  const member = await prisma.workspaceMember.findFirst({
    where: {
      workspaceId,
      userId,
      role: "ADMIN",
    },
  });

  if (!member) {
    throw new Error("Not authorized to delete workspace");
  }

  return prisma.workspace.delete({
    where: { id: workspaceId },
  });
};

export const WorkspaceService = {
  createWorkspaceService,
  getUserWorkspacesService,
  getWorkspaceByIdService,
  deleteWorkspaceService,
};