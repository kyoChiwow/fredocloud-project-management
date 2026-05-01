import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { GoalService } from "./goal.service";

const createGoal = catchAsync(async (req: Request, res: Response) => {
  const result = await GoalService.createGoalService({
    ...req.body,
    ownerId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Goal created successfully",
    data: result,
  });
});

const getGoalsByWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = Array.isArray(req.params.workspaceId)
    ? req.params.workspaceId[0]
    : req.params.workspaceId;

  const result = await GoalService.getGoalsByWorkspaceService(workspaceId);

  res.status(200).json({
    success: true,
    message: "Goals fetched successfully",
    data: result,
  });
});

const addMilestone = catchAsync(async (req: Request, res: Response) => {
  const result = await GoalService.addMilestoneService({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Milestone added",
    data: result,
  });
});

const updateGoalStatus = catchAsync(async (req: Request, res: Response) => {
  const goalId = Array.isArray(req.params.goalId)
    ? req.params.goalId[0]
    : req.params.goalId;

  const result = await GoalService.updateGoalStatusService(
    goalId,
    req.body.status,
    req.user.id,
  );

  res.status(200).json({
    success: true,
    message: "Goal updated",
    data: result,
  });
});

export const GoalController = {
  createGoal,
  getGoalsByWorkspace,
  addMilestone,
  updateGoalStatus,
};
