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

export const ActionItemRoutes = router;