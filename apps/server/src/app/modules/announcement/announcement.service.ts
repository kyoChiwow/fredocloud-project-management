import { prisma } from "../../../../lib/prisma";
import { getIO } from "../../../sockets";
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
    orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
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

  getIO()
    .to(announcement.workspaceId)
    .emit("reaction-created", reaction);

  return reaction;
};

const addCommentService = async (
  data: ICommentAnnouncement & { userId: string },
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

  const announcement = await prisma.announcement.findUnique({
    where: { id: data.announcementId },
    select: { workspaceId: true },
  });

  if (!announcement) {
    throw new Error("Announcement not found");
  }

  getIO()
    .to(announcement.workspaceId)
    .emit("comment-created", comment);

  return comment;
};

export const AnnouncementService = {
  createAnnouncementService,
  getAnnouncementsService,
  togglePinAnnouncementService,
  reactToAnnouncementService,
  addCommentService,
};
