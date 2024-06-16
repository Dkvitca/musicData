import { Request, Response } from "express";

export const getCurrentUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ error: "You must log in!" });
  }
  res.send(req.user);
};
