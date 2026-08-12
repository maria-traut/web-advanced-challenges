import { Router } from "express";
import {
  createBlogEntryController,
  deleteBlogEntryController,
  updateBlogEntryController,
} from "../controllers/blogController.js";
import { getAllBlogEntriesByAuthorController } from "../controllers/blogController.js";

const router = Router();

router.post("/", createBlogEntryController);

router.put("/:id", updateBlogEntryController);

router.delete("/:id", deleteBlogEntryController);

router.get("/", getAllBlogEntriesByAuthorController);

export default router;
