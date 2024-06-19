// src/routes/artist.ts

import { Router } from "express";
import { Artist } from "../models/Artist";

const router = Router();

router.get("/api/artists", async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = 20;

  try {
    const artists = await Artist.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const total = 600;

    res.json({
      artists,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
    res.status(500).send("Server error");
  }
});

export { router as artistRouter };
