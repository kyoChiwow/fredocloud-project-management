export interface ICreateNotification {
  userId: string;
  workspaceId: string;
  message: string;
}

export interface IMarkAsRead {
  notificationId: string;
}