export interface ICreateNotification {
  userId: string;
  workspaceId: string;
  message: string;
  type?: string;
  meta?: Record<string, any>;
}

export interface IMarkAsRead {
  notificationId: string;
}