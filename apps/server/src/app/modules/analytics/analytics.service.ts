/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../lib/prisma";
import { Parser } from "json2csv";

// 📊 Dashboard Stats
const getWorkspaceStatsService = async (workspaceId: string) => {
  const totalGoals = await prisma.goal.count({
    where: { workspaceId },
  });

  const completedThisWeek = await prisma.goal.count({
    where: {
      workspaceId,
      status: "COMPLETED",
      updatedAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  const overdue = await prisma.goal.count({
    where: {
      workspaceId,
      dueDate: {
        lt: new Date(),
      },
      status: {
        not: "COMPLETED",
      },
    },
  });

  return {
    totalGoals,
    completedThisWeek,
    overdue,
  };
};

// 📈 Chart Data (Recharts ready)
const getGoalChartService = async (workspaceId: string) => {
  const data = await prisma.goal.groupBy({
    by: ["status"],
    where: { workspaceId },
    _count: {
      status: true,
    },
  });

  // Format for Recharts
  return data.map((item) => ({
    status: item.status,
    count: item._count.status,
  }));
};

// 📄 CSV Export
const exportWorkspaceCSVService = async (workspaceId: string) => {
  const [goals, actions] = await Promise.all([
    prisma.goal.findMany({ where: { workspaceId } }),
    prisma.actionItem.findMany({ where: { workspaceId } }),
  ]);

  const data = [
    ...goals.map((g) => ({
      type: "GOAL",
      title: g.title,
      status: g.status,
      dueDate: g.dueDate,
    })),
    ...actions.map((a) => ({
      type: "ACTION",
      title: a.title,
      status: a.status,
      priority: a.priority,
      dueDate: a.dueDate,
    })),
  ];

  return new Parser().parse(data);
};

export const AnalyticsService = {
  getWorkspaceStatsService,
  getGoalChartService,
  exportWorkspaceCSVService,
};