import express from "express";
import nunjucks from "nunjucks";
import content from "./data/content.json";
import inputFields from "./data/inputFields.json";
import { getFormattedDate } from "./utils/dateFormatService";

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true, // Reload templates on change
});
app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (req, res) => {
  const formattedContent = content.map((post) => ({
    ...post,
    createdAt: getFormattedDate(post.createdAt),
    slug: post.title.replace(/ /g, "-").toLowerCase(),
  }));

  res.render("index.njk", { title: "Blog", content: formattedContent });
});

app.get("/post/:slug", (req, res) => {
  const formattedContent = content.map((post) => ({
    ...post,
    createdAt: getFormattedDate(post.createdAt),
  }));
  const uniquePost = formattedContent.find(
    (post) => post.title.replace(/ /g, "-").toLowerCase() === req.params.slug,
  );
  if (!uniquePost) {
    return res.status(404).send("Post not found");
  }
  res.render("post.njk", { title: uniquePost.title, post: uniquePost });
});

app.get("/contact", (req, res) => {
  res.render("contact.njk", { title: "Contact", inputFields });
});

app.listen(3000, () => {
  console.log(`Server läuft auf http://localhost:${3000}`);
});
