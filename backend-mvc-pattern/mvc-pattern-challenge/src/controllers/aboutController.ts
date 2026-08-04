import { type Request, type Response } from "express";

export const aboutController = (req: Request, res: Response) => {
  res.render("about.html");
};
