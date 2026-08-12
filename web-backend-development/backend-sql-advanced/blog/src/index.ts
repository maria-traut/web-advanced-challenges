import express from "express";
import nunjucks from "nunjucks";
import { connectDB, closeDB } from "./db/database.js";
import blogRoutes from "./routes/blogRoutes.js";
import pageRoutes from "./routes/pageRoutes.js";

const app = express();

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true, // Reload templates on change
});
app.set("view engine", "njk");

app.use(express.static("public"));
app.use(express.json());

await connectDB();

app.use("/blog/entries", blogRoutes);
app.use("/", pageRoutes);

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
