import { Router } from "express";
import { randomUUID } from "node:crypto";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const router = Router();

router.post("/", async (req, res) => {
  const id = randomUUID();
  try {
    const message = req.body.message;
    const filePath = path.join(process.cwd(), "messages", `${id}.txt`);
    await writeFile(filePath, message);

    res.render("message.njk", { title: `Wish ${id}`, id: id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).send(`Error:  ${error.message}`);
      return;
    }
    res.status(500).send("Internal Server Error");
  }
});

export default router;
