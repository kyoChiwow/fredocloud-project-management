import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middlewares/checkAuth";


const router = Router();

router.post("/login", AuthController.login);
router.get("/me", checkAuth(), AuthController.getMe);
router.post("/logout", AuthController.logout);

export const AuthRoutes = router;