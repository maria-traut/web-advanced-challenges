import express from "express";
import nunjucks from "nunjucks";
import postRoutes from "./routes/postRoutes";
import { projectRoot, assetsDir, cssDir } from "./models/postModel";

const app = express();

app.use(postRoutes);

nunjucks.configure(projectRoot, { autoescape: true, express: app });
app.use("/assets", express.static(assetsDir));
app.use("/css", express.static(cssDir));

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
