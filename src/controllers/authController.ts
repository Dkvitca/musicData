import { Request, Response } from "express";

export const handleSpotifyCallback = (req: Request, res: Response) => {
  res.redirect("/loggedIn");
};

export const logout = (req: Request, res: Response) => {
  req.logout((err: any) => {
    if (err) {
      console.error("Error logging out:", err);
    }
    res.redirect("/");
  });
};
