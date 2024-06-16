import { Router } from "express";
import { getUserPlaylists } from "../controllers/playlistController";

const router = Router();

router.get("/api/playlists", getUserPlaylists); // Note the route here

export { router as playlistRouter };
