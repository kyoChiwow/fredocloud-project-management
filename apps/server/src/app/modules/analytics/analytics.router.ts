import { Router } from "express";
import { AnalyticsController } from "./analytics.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.get(
  "/stats/:workspaceId",
  checkAuth(),
  AnalyticsController.getWorkspaceStats
);

router.get(
  "/chart/:workspaceId",
  checkAuth(),
  AnalyticsController.getGoalChart
);

router.get(
  "/export/:workspaceId",
  checkAuth(),
  AnalyticsController.exportCSV
);

export const AnalyticsRoutes = router;