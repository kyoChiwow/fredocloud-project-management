import { ActionStatus } from "../../../prisma/enums";

export interface ICreateActionItem {
  title: string;
  description?: string;
  workspaceId: string;
  goalId?: string;
  assigneeId: string;
  priority?: "LOW" | "MEDIUM" | "HIGH";
  dueDate?: string;
}

export interface IUpdateStatus {
  status: ActionStatus;
}