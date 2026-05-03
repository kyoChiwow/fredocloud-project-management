export interface ICreateNotification {
  userId: string;
  workspaceId: string;
  message: string;
  type?: string;
  meta?: any;
}

export interface IMarkAsRead {
  notificationId: string;
}