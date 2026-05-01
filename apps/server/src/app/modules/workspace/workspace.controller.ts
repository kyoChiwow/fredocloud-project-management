import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { WorkspaceService } from "./workspace.service";

const getParam = (req: Request, key: string): string => {
  const value = req.params[key];
  return Array.isArray(value) ? value[0] : value;
};

const createWorkspace = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await WorkspaceService.createWorkspaceService(
    userId,
    req.body
  );

  res.status(201).json({
    success: true,
    message: "Workspace created successfully",
    data: result,
  });
});

const getMyWorkspaces = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const result = await WorkspaceService.getUserWorkspacesService(userId);

  res.status(200).json({
    success: true,
    message: "Workspaces retrieved successfully",
    data: result,
  });
});

const getWorkspace = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = getParam(req, "workspaceId"); // FIX applied here

  const result = await WorkspaceService.getWorkspaceByIdService(
    workspaceId
  );

  res.status(200).json({
    success: true,
    message: "Workspace retrieved successfully",
    data: result,
  });
});

const deleteWorkspace = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;
  const workspaceId = getParam(req, "workspaceId"); // FIX applied here

  await WorkspaceService.deleteWorkspaceService(workspaceId, userId);

  res.status(200).json({
    success: true,
    message: "Workspace deleted successfully",
    data: null,
  });
});

export const WorkspaceController = {
  createWorkspace,
  getMyWorkspaces,
  getWorkspace,
  deleteWorkspace,
};