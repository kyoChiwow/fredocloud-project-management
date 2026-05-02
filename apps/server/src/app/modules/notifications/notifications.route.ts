import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { NotificationController } from "./notifications.controller";

const router = Router();

router.get(
  "/",
  checkAuth(),
  NotificationController.getMyNotifications
);

router.patch(
  "/read",
  checkAuth(),
  NotificationController.markAsRead
);

export const NotificationRoutes = router;