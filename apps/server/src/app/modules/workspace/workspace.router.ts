import { Router } from "express";
import { WorkspaceController } from "./workspace.controller";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post("/", checkAuth(), WorkspaceController.createWorkspace);

router.get("/", checkAuth(), WorkspaceController.getMyWorkspaces);

router.get("/:workspaceId", checkAuth(), WorkspaceController.getWorkspace);

router.delete("/:workspaceId", checkAuth(), WorkspaceController.deleteWorkspace);

export const WorkspaceRoutes = router;