import { Router } from "express";
import { GoalController } from "./goal.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { checkPermission } from "../../middlewares/checkPermissions";

const router = Router();

router.post("/", checkAuth(), GoalController.createGoal);
router.post("/milestone", checkAuth(), GoalController.addMilestone);

router.get(
  "/workspace/:workspaceId",
  checkAuth(),
  GoalController.getGoalsByWorkspace
);


router.patch("/:goalId/status", checkAuth(), GoalController.updateGoalStatus);

export const GoalRoutes = router;