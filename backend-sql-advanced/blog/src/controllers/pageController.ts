import { Request, Response } from "express";
import { getAllBlogEntries, getBlogEntryById } from "../models/blogModel.js";
import { getFormattedDate } from "../utils/dateFormatService.js";
import inputFields from "../data/inputFields.json" with { type: "json" };

export async function getIndexPageController(req: Request, res: Response) {
  const posts = await getAllBlogEntries();
  const formattedContent = posts.map((post) => ({
    ...post,
    createdAt: getFormattedDate(post.createdAt),
  }));
  res.render("index.njk", { title: "Blog", content: formattedContent });
}

export async function getPostPageController(req: Request, res: Response) {
  const post = await getBlogEntryById(Number(req.params.id));
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const formattedPost = {
    ...post,
    createdAt: getFormattedDate(post.createdAt),
  };
  res.render("post.njk", { title: formattedPost.title, post: formattedPost });
}

export async function getContactPageController(req: Request, res: Response) {
  res.render("contact.njk", { title: "Contact", inputFields });
}
