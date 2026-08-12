import { Request, Response } from "express";
import {
  createBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
} from "../models/blogModel.js";
import { getAllBlogEntriesByAuthor } from "../models/authorsModel.js";

export async function createBlogEntryController(req: Request, res: Response) {
  try {
    const newId = await createBlogEntry(req.body);
    res.status(201).json({ id: newId });
  } catch (err) {
    res.status(500).json({ error: "Failed to create blog entry" });
  }
}

export async function updateBlogEntryController(req: Request, res: Response) {
  try {
    await updateBlogEntry(Number(req.params.id), req.body);
    res.status(200).json({ message: "Blog entry updated" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog entry" });
  }
}

export async function deleteBlogEntryController(req: Request, res: Response) {
  try {
    await deleteBlogEntry(Number(req.params.id));
    res.status(200).json({ message: "Blog entry deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog entry" });
  }
}

export async function getAllBlogEntriesByAuthorController(
  req: Request,
  res: Response,
) {
  try {
    const entries = await getAllBlogEntriesByAuthor();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog entries" });
  }
}
