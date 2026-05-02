export interface IInviteMember {
  email: string;
  workspaceId: string;
  role?: "ADMIN" | "MEMBER";
}

export interface IAcceptInvite {
  inviteId: string;
}

export interface IUpdateMemberRole {
  workspaceId: string;
  memberId: string;
  role: "ADMIN" | "MEMBER";
}