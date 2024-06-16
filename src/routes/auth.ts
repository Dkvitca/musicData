import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/auth/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-email",
      "user-read-private",
      "playlist-read-private",
      "playlist-read-collaborative",
    ],
  })
);

router.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", {
    failureRedirect: "http://localhost:3001",
  }),
  (req, res) => {
    res.redirect("http://localhost:3001/loggedIn");
  }
);

router.get("/api/logout", (req, res) => {
  req.logout((err: any) => {
    if (err) {
      console.error(err);
    }
    res.redirect("http://localhost:3001");
  });
});

router.get("/api/current_user", (req, res) => {
  res.send(req.user);
});

export { router as authRouter };
