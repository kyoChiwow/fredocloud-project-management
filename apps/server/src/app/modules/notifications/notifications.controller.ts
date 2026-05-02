/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { NotificationService } from "./notifications.service";

const getMyNotifications = catchAsync(
  async (req: Request, res: Response) => {
    const result = await NotificationService.getMyNotificationsService(
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Notifications fetched",
      data: result,
    });
  }
);

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const result = await NotificationService.markAsReadService(
    req.body.notificationId
  );

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
    data: result,
  });
});

export const NotificationController = {
  getMyNotifications,
  markAsRead,
};