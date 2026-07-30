import express from "express";
import nunjucks from "nunjucks";
import { access, constants, writeFile } from "node:fs/promises";
import type { NextFunction, Request, Response } from "express";
import { appendFile } from "node:fs/promises";
import path from "node:path";
import router from "./routes/message.route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use("/messages", router);

nunjucks.configure("src/views", {
  autoescape: true,
  express: app,
  watch: true,
});
app.set("view engine", "njk");

const LOG_FILE = path.join(process.cwd(), "logs", "logs.txt");

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

async function ensureLogFile(filePath: string): Promise<void> {
  const exists = await fileExists(filePath);

  if (!exists) {
    await writeFile(filePath, "", { encoding: "utf-8" });
  }
}

async function addLogMessage(message: string): Promise<void> {
  await appendFile(LOG_FILE, message + "\n", { encoding: "utf-8" });
}

export function logger(req: Request, res: Response, next: NextFunction) {
  res.on("finish", async () => {
    const logEntry = [
      new Date().toISOString(),
      req.method,
      req.ip,
      req.originalUrl,
      res.statusCode,
    ].join(" ");

    await addLogMessage(logEntry);
  });

  next();
}

await ensureLogFile(LOG_FILE);

app.get("/", (req, res) => {
  res.send("Go to /views and make a wish!");
});

app.get("/views", (req, res) => {
  res.render("index.njk", { title: "One Wish Willow" });
});

app.post("/messages/:id", (req, res) => {
  const message = req.body.message;
  res.render("index.njk", { title: "One Wish Willow", content: message });
});

app.listen(3000, () => {
  console.log("Server läuft auf http://localhost:3000");
});
