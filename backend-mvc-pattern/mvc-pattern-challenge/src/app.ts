console.log("Server startet...");
import express from "express";
import nunjucks from "nunjucks";
import postRoutes from "./routes/postRoutes";

import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();

// filrURLToPath converts ULR to file path
// import.meta.url contains URL of current file
const __filename = fileURLToPath(import.meta.url);

// path.dirname cuts file name and returns folder
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const assetsDir = path.join(projectRoot, "src", "assets");
const cssDir = path.join(projectRoot, "src", "css");
console.log(cssDir);
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

app.use(postRoutes);

nunjucks.configure(projectRoot, { autoescape: true, express: app });

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
