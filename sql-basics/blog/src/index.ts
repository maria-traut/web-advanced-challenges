import express from "express";
import nunjucks from "nunjucks";
import { getAllBlogEntries, getBlogEntryById } from "./models/blogModel.js";
import inputFields from "./data/inputFields.json" with { type: "json" };
import { getFormattedDate } from "./utils/dateFormatService.js";
import { connectDB, closeDB } from "./db/database.js";

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true, // Reload templates on change
});
app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  const posts = await getAllBlogEntries();
  const formattedContent = posts.map((post) => ({
    ...post,
    createdAt: getFormattedDate(post.createdAt),
  }));
  res.render("index.njk", { title: "Blog", content: formattedContent });
});

app.get("/post/:id", async (req, res) => {
  const post = await getBlogEntryById(Number(req.params.id));
  if (!post) {
    return res.status(404).send("Post not found");
  }
  const formattedPost = {
    ...post,
    createdAt: getFormattedDate(post.createdAt),
  };
  res.render("post.njk", { title: formattedPost.title, post: formattedPost });
});

app.get("/contact", (req, res) => {
  res.render("contact.njk", { title: "Contact", inputFields });
});

await connectDB();

app.listen(3000, () => {
  console.log(`Server läuft auf http://localhost:${3000}`);
});

process.on("SIGINT", async () => {
  console.log("SIGINT received. Closing database connection...");
  await closeDB();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Closing database connection...");
  await closeDB();
  process.exit(0);
});
