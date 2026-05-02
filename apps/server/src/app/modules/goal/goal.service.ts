import { prisma } from "../../../../lib/prisma";
import { GoalStatus } from "../../../prisma/enums";
import { getIO } from "../../../sockets";
import { ICreateGoal, ICreateMilestone } from "./goal.interface";

const createGoalService = async (data: ICreateGoal) => {
  const goal = await prisma.goal.create({
    data: {
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      workspaceId: data.workspaceId,
      ownerId: data.ownerId,
    },
    include: {
      owner: true,
      workspace: true,
      milestones: true,
      activities: true,
    },
  });

  await prisma.goalActivity.create({
    data: {
      goalId: goal.id,
      userId: data.ownerId,
      type: "CREATED",
      message: `Goal "${goal.title}" created`,
    },
  });

  return goal;
};

const getGoalsByWorkspaceService = async (workspaceId: string) => {
  return prisma.goal.findMany({
    where: { workspaceId },
    include: {
      owner: true,
      milestones: true,
      activities: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
};

const addMilestoneService = async (data: ICreateMilestone & { userId: string }) => {
  const milestone = await prisma.milestone.create({
    data: {
      title: data.title,
      progress: data.progress || 0,
      goalId: data.goalId,
    },
  });

  await prisma.goalActivity.create({
    data: {
      goalId: data.goalId,
      userId: data.userId,
      type: "MILESTONE",
      message: `Milestone "${data.title}" added`,
    },
  });

  return milestone;
};

const updateGoalStatusService = async (
  goalId: string,
  status: GoalStatus,
  userId: string
) => {
  const goal = await prisma.goal.update({
    where: { id: goalId },
    data: { status },
  });

  await prisma.goalActivity.create({
    data: {
      goalId,
      userId,
      type: "UPDATED",
      message: `Status changed to ${status}`,
    },
  });

  getIO().to(goal.workspaceId).emit("goal-updated", goal);

  return goal;
};

export const GoalService = {
  createGoalService,
  getGoalsByWorkspaceService,
  addMilestoneService,
  updateGoalStatusService,
};