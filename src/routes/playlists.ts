import { Router } from "express";
import { getPlaylistsWithTracks } from "../controllers/playlistController";

const router = Router();

router.get("/api/playlists", getPlaylistsWithTracks); // Update this route to the new method

export { router as playlistRouter };
