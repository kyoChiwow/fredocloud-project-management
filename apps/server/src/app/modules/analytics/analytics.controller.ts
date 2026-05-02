/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AnalyticsService } from "./analytics.service";

const getWorkspaceStats = catchAsync(
  async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;

    const result =
      await AnalyticsService.getWorkspaceStatsService(workspaceId);

    res.status(200).json({
      success: true,
      message: "Workspace stats fetched",
      data: result,
    });
  }
);

const getGoalChart = catchAsync(
  async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;

    const result =
      await AnalyticsService.getGoalChartService(workspaceId);

    res.status(200).json({
      success: true,
      message: "Chart data fetched",
      data: result,
    });
  }
);

const exportCSV = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = req.params.workspaceId as string;

  const csv =
    await AnalyticsService.exportWorkspaceCSVService(workspaceId);

  res.header("Content-Type", "text/csv");
  res.attachment("workspace-data.csv");
  res.send(csv);
});

export const AnalyticsController = {
  getWorkspaceStats,
  getGoalChart,
  exportCSV,
};