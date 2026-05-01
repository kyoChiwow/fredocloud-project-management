import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { AnnouncementController } from "./announcement.controller";
import { checkWorkspaceRole } from "../../middlewares/checkWorkspaceRole";

const router = Router();

router.post("/", checkAuth(), checkWorkspaceRole("ADMIN"), AnnouncementController.createAnnouncement);
router.get(
  "/:workspaceId",
  checkAuth(),
  AnnouncementController.getAnnouncements,
);
router.patch("/pin/:id", checkAuth(), checkWorkspaceRole("ADMIN"), AnnouncementController.togglePin);
router.post("/react", checkAuth(), AnnouncementController.react);
router.post("/comment", checkAuth(), AnnouncementController.comment);

export const AnnouncementRoutes = router;
