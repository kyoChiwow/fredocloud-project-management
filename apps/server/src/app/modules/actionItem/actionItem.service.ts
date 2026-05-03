import { prisma } from "../../../../lib/prisma";
import { ActionStatus } from "../../../prisma/enums";
import { getIO } from "../../../sockets";
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

const updateStatusService = async (id: string, data: IUpdateStatus) => {
  const item = await prisma.actionItem.update({
    where: { id },
    data: { status: data.status },
  });

  getIO().to(`workspace:${item.workspaceId}`).emit("action-updated", item);
};

const assignUserService = async (id: string, assigneeId: string) => {
  return prisma.actionItem.update({
    where: { id },
    data: { assigneeId },
  });
};

const moveActionItemService = async (
  id: string,
  data: { status: ActionStatus; position: number }
) => {
  const item = await prisma.actionItem.update({
    where: { id },
    data: {
      status: data.status,
      position: data.position,
    },
  });

  getIO().to(`workspace:${item.workspaceId}`).emit("action-moved", item);

  return item;
};

const getActionItemStatsService = async (workspaceId: string) => {
  const total = await prisma.actionItem.count({ where: { workspaceId } });

  const completed = await prisma.actionItem.count({
    where: { workspaceId, status: "DONE" },
  });

  const overdue = await prisma.actionItem.count({
    where: {
      workspaceId,
      dueDate: { lt: new Date() },
      status: { not: "DONE" },
    },
  });

  return { total, completed, overdue };
};

const getPriorityStatsService = async (workspaceId: string) => {
  return prisma.actionItem.groupBy({
    by: ["priority"],
    where: { workspaceId },
    _count: { priority: true },
  });
};

export const ActionService = {
  createActionItemService,
  getActionItemsByWorkspaceService,
  updateStatusService,
  assignUserService,
  moveActionItemService,
  getActionItemStatsService,
  getPriorityStatsService,
  
};
