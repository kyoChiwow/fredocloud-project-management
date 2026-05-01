export type WorkspaceRole = "ADMIN" | "MEMBER";

export interface ICreateWorkspace {
  name: string;
  description?: string;
  accentColor?: string;
}

export interface IWorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
}

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  accentColor: string;
  createdAt: Date;
  updatedAt: Date;
}