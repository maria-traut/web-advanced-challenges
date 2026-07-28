import express from "express";
import nunjucks from "nunjucks";
import content from "./data/content.json";

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true, // Reload templates on change
});
app.set("view engine", "njk");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.njk", { title: "Blog", content });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
