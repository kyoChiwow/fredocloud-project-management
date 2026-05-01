export type GoalStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface ICreateGoal {
  title: string;
  description?: string;
  dueDate?: Date;
  workspaceId: string;
  ownerId: string;
}

export interface ICreateMilestone {
  title: string;
  progress?: number;
  goalId: string;
}

export interface IGoalActivity {
  message: string;
  type: "CREATED" | "UPDATED" | "MILESTONE";
  goalId: string;
  userId: string;
}