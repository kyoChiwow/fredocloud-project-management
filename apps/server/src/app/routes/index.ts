import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { WorkspaceRoutes } from "../modules/workspace/workspace.router";
import { GoalRoutes } from "../modules/goal/goal.router";
import { AnnouncementRoutes } from "../modules/announcement/announcement.route";
import { ActionItemRoutes } from "../modules/actionItem/actionItem.routes";
import { InviteRoutes } from "../modules/invite/invite.route";
import { NotificationRoutes } from "../modules/notifications/notifications.route";
import { AnalyticsRoutes } from "../modules/analytics/analytics.router";

export const router = Router();

const moduleRoutes = [
    {
        path: "/user",
        route: UserRoutes,
    },
    {
        path: "/auth",
        route: AuthRoutes,
    },
    {
        path: "/workspace",
        route: WorkspaceRoutes,
    },
    {
        path: "/goals",
        route: GoalRoutes,
    },
    {
        path: "/announcements",
        route: AnnouncementRoutes,
    },
    {
        path: "/action",
        route: ActionItemRoutes,
    },
    {
        path: "/invite",
        route: InviteRoutes,
    },
    {
        path: "/notifications",
        route: NotificationRoutes,
    },
    {
        path: "/analytics",
        route: AnalyticsRoutes,
    }
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});