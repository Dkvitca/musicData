import { Router } from "express";
import { authRouter } from "./auth";
import { playlistRouter } from "./playlists"; // Import playlistRouter
import { getCurrentUser } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.use(authRouter);
router.use(playlistRouter); // Use playlistRouter

router.get("/api/current_user", isAuthenticated, getCurrentUser);

export { router };
