import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { AnnouncementService } from "./announcement.service";

const createAnnouncement = catchAsync(async (req: Request, res: Response) => {
  const result = await AnnouncementService.createAnnouncementService({
    ...req.body,
    authorId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Announcement created successfully",
    data: result,
  });
});

const getAnnouncements = catchAsync(async (req: Request, res: Response) => {
  const workspaceId = Array.isArray(req.params.workspaceId)
    ? req.params.workspaceId[0]
    : req.params.workspaceId;

  const result =
    await AnnouncementService.getAnnouncementsService(workspaceId);

  res.status(200).json({
    success: true,
    message: "Announcements fetched successfully",
    data: result,
  });
});

const togglePin = catchAsync(async (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id)
    ? req.params.id[0]
    : req.params.id;

  const result =
    await AnnouncementService.togglePinAnnouncementService(id);

  res.status(200).json({
    success: true,
    message: "Pin status updated",
    data: result,
  });
});

const react = catchAsync(async (req: Request, res: Response) => {
  const result = await AnnouncementService.reactToAnnouncementService({
    ...req.body,
    userId: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: "Reaction updated",
    data: result,
  });
});

const comment = catchAsync(async (req: Request, res: Response) => {
  const result = await AnnouncementService.addCommentService({
    ...req.body,
    userId: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Comment added",
    data: result,
  });
});

export const AnnouncementController = {
  createAnnouncement,
  getAnnouncements,
  togglePin,
  react,
  comment,
};