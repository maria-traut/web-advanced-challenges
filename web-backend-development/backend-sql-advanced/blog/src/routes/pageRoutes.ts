import { Router } from "express";
import {
  getContactPageController,
  getIndexPageController,
  getPostPageController,
} from "../controllers/pageController.js";

const router = Router();

router.get("/", getIndexPageController);

router.get("/post/:id", getPostPageController);

router.get("/contact", getContactPageController);

export default router;
