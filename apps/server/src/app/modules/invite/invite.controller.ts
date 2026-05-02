/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { InviteService } from "./invite.service";

const inviteMember = catchAsync(async (req: Request, res: Response) => {
  const result = await InviteService.inviteMemberService({
    ...req.body,
    invitedById: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Invitation sent",
    data: result,
  });
});

const acceptInvite = catchAsync(async (req: Request, res: Response) => {
  const result = await InviteService.acceptInviteService({
    inviteId: req.body.inviteId,
    userId: req.user.id,
  });

  res.status(200).json({
    success: true,
    message: "Invite accepted",
    data: result,
  });
});

const getMyInvites = catchAsync(async (req: Request, res: Response) => {
  const result = await InviteService.getMyInvitesService(req.user.email);

  res.status(200).json({
    success: true,
    message: "Invites fetched",
    data: result,
  });
});

const updateMemberRole = catchAsync(
  async (req: Request, res: Response) => {
    const result = await InviteService.updateMemberRoleService(req.body);

    res.status(200).json({
      success: true,
      message: "Role updated",
      data: result,
    });
  }
);

export const InviteController = {
  inviteMember,
  acceptInvite,
  getMyInvites,
  updateMemberRole,
};