import { type Request, type Response } from "express";

export const examplePostController = (req: Request, res: Response) => {
  res.render("postExample.html");
};
