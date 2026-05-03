/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "../../../../lib/prisma";
import { getIO } from "../../../sockets";
import { ICreateNotification } from "./notifications.interface";

const createNotificationService = async (data: ICreateNotification) => {
  const notification = await prisma.notification.create({
    data: {
      userId: data.userId,
      workspaceId: data.workspaceId,
      message: data.message,
      type: data.type ?? null,
      meta: data.meta ?? null,
    },
  });

  getIO().to(`user:${data.userId}`).emit("notification", notification);

  return notification;
};

const getMyNotificationsService = async (userId: string) => {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

const markAsReadService = async (notificationId: string) => {
  return prisma.notification.update({
    where: { id: notificationId },
    data: { isRead: true },
  });
};

export const NotificationService = {
  createNotificationService,
  getMyNotificationsService,
  markAsReadService,
};