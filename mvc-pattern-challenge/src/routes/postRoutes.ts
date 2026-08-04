import { Router } from "express";

import { homeController } from "../controllers/homeController";
import { postController } from "../controllers/postController";
import { contactController } from "../controllers/contactController";
import { aboutController } from "../controllers/aboutController";
import { examplePostController } from "../controllers/examplePostController";

const router = Router();

router.get("/", homeController);

router.get("/posts/:slug", postController);

router.get("/contact", contactController);

router.get("/about", aboutController);

router.get("/example-post", examplePostController);

export default router;
