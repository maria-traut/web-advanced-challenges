import express from "express";
import { bookmarks } from "./data";
import {
  getAllBookmarks,
  getBookMarkById,
  getNewBookmarkId,
} from "./bookmarkService";

const app = express();

app.use(express.json()); // body parser middleware, necessary for post request

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/bookmarks", (req, res) => {
  const bookmarks = getAllBookmarks();

  if (bookmarks.length === 0) {
    res.status(400).send("No bookmarks found");
    return;
  }

  res.json(bookmarks);
});

app.get("/bookmarks/:id", (req, res) => {
  const { id } = req.params;
  const numId = Number(id);

  if (isNaN(numId)) {
    res.status(400).json({ message: "bad request" });
    return;
  }

  const bookmark = getBookMarkById(numId);

  if (!bookmarks) {
    res.status(404).send({ error: "Bookmark not found" });
    return;
  }
  res.json(bookmark);
});

app.post("/bookmarks", (req, res) => {
  const newBookmark = { id: getNewBookmarkId(), ...req.body };
  bookmarks.push(newBookmark);
  res.status(201).json(newBookmark);
});

app.delete("/bookmarks/:id", (req, res) => {
  const bookmarks = getAllBookmarks();
  bookmarks.filter((bookmark) => bookmark.id !== Number(req.params.id));
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
