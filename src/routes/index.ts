import { Router } from "express";
import { getPlaylistsWithTracks } from "../controllers/playlistController";
import { authRouter } from "./auth";
import { playlistRouter } from "./playlists";
import { getCurrentUser } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.use(authRouter);
router.use(playlistRouter);

router.get("/current_user", isAuthenticated, getCurrentUser);
router.get("/api/playlists", isAuthenticated, getPlaylistsWithTracks);

export { router };
