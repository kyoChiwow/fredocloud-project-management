import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { ActionController } from "./actionItem.controller";

const router = Router();

router.post("/", checkAuth(), ActionController.createActionItem);

router.get(
  "/:workspaceId",
  checkAuth(),
  ActionController.getActionItems
);

router.patch(
  "/status/:id",
  checkAuth(),
  ActionController.updateStatus
);

router.patch(
  "/assign/:id",
  checkAuth(),
  ActionController.assignUser
);

router.patch("/move/:id", checkAuth(), ActionController.moveActionItem);

router.get(
  "/stats/:workspaceId", 
  checkAuth(), 
  ActionController.getActionItemStats
);

router.get(
  "/priority-stats/:workspaceId", 
  checkAuth(), 
  ActionController.getPriorityStats
);

export const ActionItemRoutes = router;