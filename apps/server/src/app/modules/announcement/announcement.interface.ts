export interface ICreateAnnouncement {
  title: string;
  content: string;
  workspaceId: string;
}

export interface ITogglePin {
  id: string;
}

export interface IReactAnnouncement {
  announcementId: string;
  emoji: string;
}

export interface ICommentAnnouncement {
  announcementId: string;
  content: string;
}