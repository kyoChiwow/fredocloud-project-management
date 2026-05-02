import { prisma } from "../../../../lib/prisma";
import { getIO } from "../../../sockets";
import {
  ICreateAnnouncement,
  IReactAnnouncement,
  ICommentAnnouncement,
} from "./announcement.interface";

const createAnnouncementService = async (
  data: ICreateAnnouncement & { authorId: string }
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

  getIO().to(data.workspaceId).emit("announcement-created", announcement);
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
    orderBy: [
      { isPinned: "desc" },
      { createdAt: "desc" },
    ],
  });
};

const togglePinAnnouncementService = async (id: string) => {
  const existing = await prisma.announcement.findUnique({
    where: { id },
  });

  return prisma.announcement.update({
    where: { id },
    data: {
      isPinned: !existing?.isPinned,
    },
  });
};

const reactToAnnouncementService = async (
  data: IReactAnnouncement & { userId: string }
) => {
  return prisma.reaction.upsert({
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
};

const addCommentService = async (
  data: ICommentAnnouncement & { userId: string }
) => {
  return prisma.comment.create({
    data: {
      announcementId: data.announcementId,
      userId: data.userId,
      content: data.content,
    },
    include: {
      user: true,
    },
  });
};

export const AnnouncementService = {
  createAnnouncementService,
  getAnnouncementsService,
  togglePinAnnouncementService,
  reactToAnnouncementService,
  addCommentService,
};