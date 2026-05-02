import { prisma } from "../../../../lib/prisma";
import { getIO } from "../../../sockets";
import { NotificationService } from "../notifications/notifications.service";
import {
  ICommentAnnouncement,
  ICreateAnnouncement,
  IReactAnnouncement,
} from "./announcement.interface";

const createAnnouncementService = async (
  data: ICreateAnnouncement & { authorId: string },
) => {
  const announcement = await prisma.announcement.create({
    data: {
      title: data.title,
      content: data.content,
      workspaceId: data.workspaceId,
      authorId: data.authorId,
    },
    include: {
      author: true,
    },
  });

  getIO().to(`workspace:${data.workspaceId}`).emit("announcement-created", announcement);
  return announcement;
};

const getAnnouncementsService = async (workspaceId: string) => {
  return prisma.announcement.findMany({
    where: { workspaceId },
    include: {
      author: true,
      reactions: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
  });
};

const togglePinAnnouncementService = async (id: string) => {
  const existing = await prisma.announcement.findUnique({
    where: { id },
  });

  if (!existing) throw new Error("Announcement not found");

  const updated = await prisma.announcement.update({
    where: { id },
    data: {
      isPinned: !existing.isPinned,
    },
    include: {
      author: true,
      reactions: true,
      comments: { include: { user: true } }
    }
  });

  getIO().to(`workspace:${updated.workspaceId}`).emit("announcement-updated", updated);

  return updated;
};

const reactToAnnouncementService = async (
  data: IReactAnnouncement & { userId: string },
) => {
  const reaction = await prisma.reaction.upsert({
    where: {
      announcementId_userId: {
        announcementId: data.announcementId,
        userId: data.userId,
      },
    },
    update: {
      emoji: data.emoji,
    },
    create: {
      announcementId: data.announcementId,
      userId: data.userId,
      emoji: data.emoji,
    },
  });

  const announcement = await prisma.announcement.findUnique({
    where: { id: data.announcementId },
    select: { workspaceId: true },
  });

  if (!announcement) {
    throw new Error("Announcement not found");
  }

  getIO().to(`workspace:${announcement.workspaceId}`).emit("reaction-created", reaction);

  return reaction;
};

const addCommentService = async (
  data: ICommentAnnouncement & { userId: string }
) => {
  const comment = await prisma.comment.create({
    data: {
      announcementId: data.announcementId,
      userId: data.userId,
      content: data.content,
    },
    include: {
      user: true,
    },
  });

  // 🔥 Get workspaceId safely
  const announcement = await prisma.announcement.findUnique({
    where: { id: data.announcementId },
    select: { workspaceId: true },
  });

  if (!announcement) throw new Error("Announcement not found");

  // 🔥 Extract mentions (@username)
  const mentions = data.content.match(/@(\w+)/g);

  if (mentions && mentions.length > 0) {
    const usernames = mentions.map((m) => m.replace("@", ""));

    const users = await prisma.user.findMany({
      where: {
        name: {
          in: usernames,
        },
      },
    });

    // 🔥 Create notifications for each mentioned user
    await Promise.all(
      users.map((user) =>
        NotificationService.createNotificationService({
          userId: user.id,
          workspaceId: announcement.workspaceId,
          message: `You were mentioned in a comment`,
        })
      )
    );
  }

  // 🔥 Real-time comment emit
  getIO().to(`workspace:${announcement.workspaceId}`).emit("comment-created", comment);

  return comment;
};

export const AnnouncementService = {
  createAnnouncementService,
  getAnnouncementsService,
  togglePinAnnouncementService,
  reactToAnnouncementService,
  addCommentService,
};
