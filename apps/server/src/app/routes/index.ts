import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { WorkspaceRoutes } from "../modules/workspace/workspace.router";
import { GoalRoutes } from "../modules/goal/goal.router";
import { AnnouncementRoutes } from "../modules/announcement/announcement.route";
import { ActionItemRoutes } from "../modules/actionItem/actionItem.routes";

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
    }
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});