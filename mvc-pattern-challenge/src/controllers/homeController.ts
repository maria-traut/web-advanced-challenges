import { type Request, type Response } from "express";
import { formatDate, slugify } from "../models/postModel";
import { loadPosts } from "../models/postModel";



export const homeController = (req: Request, res: Response) => {
 
const 

  res.render("index.html", {
    posts: view,
    controls: {
      author: authorFilter,
      sort,
      page: currentPage,
      totalPages,
      hasPrev: currentPage > 1,
      hasNext: currentPage < totalPages,
    },
  });
};
