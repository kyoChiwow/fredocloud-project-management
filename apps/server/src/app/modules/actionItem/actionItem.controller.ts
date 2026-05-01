import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ActionService } from "./actionItem.service";

const createActionItem = catchAsync(async (req: Request, res: Response) => {
  const result = await ActionService.createActionItemService(req.body);

  res.status(201).json({
    success: true,
    message: "Action item created",
    data: result,
  });
});

const getActionItems = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = Array.isArray(req.params.workspaceId)
    ? req.params.workspaceId[0]
    : req.params.workspaceId;

  const result =
    await ActionService.getActionItemsByWorkspaceService(workspaceId);

  res.json({
    success: true,
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const result = await ActionService.updateStatusService(id, req.body);

  res.json({
    success: true,
    message: "Status updated",
    data: result,
  });
});

const assignUser = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const result = await ActionService.assignUserService(
    id,
    req.body.assigneeId
  );

  res.json({
    success: true,
    message: "User assigned",
    data: result,
  });
});

export const ActionController = {
  createActionItem,
  getActionItems,
  updateStatus,
  assignUser,
};