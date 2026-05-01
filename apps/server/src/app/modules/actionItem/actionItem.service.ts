import { prisma } from "../../../../lib/prisma";
import { ICreateActionItem, IUpdateStatus } from "./actionItem.interface";

const createActionItemService = async (data: ICreateActionItem) => {
  return prisma.actionItem.create({
    data: {
      title: data.title,
      description: data.description,
      workspaceId: data.workspaceId,
      goalId: data.goalId,
      assigneeId: data.assigneeId,
      priority: data.priority,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    },
    include: {
      assignee: true,
      goal: true,
    },
  });
};

const getActionItemsByWorkspaceService = async (workspaceId: string) => {
  return prisma.actionItem.findMany({
    where: { workspaceId },
    include: {
      assignee: true,
      goal: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateStatusService = async (
  id: string,
  data: IUpdateStatus
) => {
  return prisma.actionItem.update({
    where: { id },
    data: { status: data.status },
  });
};

const assignUserService = async (
  id: string,
  assigneeId: string
) => {
  return prisma.actionItem.update({
    where: { id },
    data: { assigneeId },
  });
};

export const ActionService = {
  createActionItemService,
  getActionItemsByWorkspaceService,
  updateStatusService,
  assignUserService,
};