// src/routes/index.ts

import { Router } from "express";
import { artistRouter } from "./artist";
import { authRouter } from "./auth";
import { playlistRouter } from "./playlists";
import { getCurrentUser } from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = Router();

router.use(authRouter);
router.use(playlistRouter);
router.use(artistRouter);

router.get("/current_user", isAuthenticated, getCurrentUser);

export { router };
