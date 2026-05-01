import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { WorkspaceRoutes } from "../modules/workspace/workspace.router";
import { GoalRoutes } from "../modules/goal/goal.router";

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
    }
]

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});