import { getDB } from "../db/database.js";
import type { IBlogEntry } from "../types/blogEntryType.js";

export async function getAllBlogEntries() {
  const db = getDB();
  const result = await db.all("SELECT * FROM blog_entries");
  return result;
}

export async function getBlogEntryById(id: number) {
  const db = getDB();
  const result = await db.get("SELECT * FROM blog_entries WHERE id = ?", [id]);
  return result;
}

export async function createBlogEntry(
  entry: Omit<IBlogEntry, "id">,
): Promise<number> {
  const db = getDB();
  const result = await db.run(
    `INSERT INTO blog_entries (title, teaser, author, createdAt, image, content)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      entry.title,
      entry.teaser,
      entry.author,
      entry.createdAt,
      entry.image,
      entry.content,
    ],
  );
  return result.lastID!; // or: return {id: result.lastID, ...entry};
}

export async function updateBlogEntry(
  id: number,
  entry: Omit<IBlogEntry, "id">,
): Promise<void> {
  const db = getDB();
  await db.run(
    `UPDATE blog_entries
     SET title = ?, teaser = ?, author = ?, createdAt = ?, image = ?, content = ?
     WHERE id = ?`,
    [
      entry.title,
      entry.teaser,
      entry.author,
      entry.createdAt,
      entry.image,
      entry.content,
      id,
    ],
  );
}

export async function deleteBlogEntry(id: number): Promise<void> {
  const db = getDB();
  await db.run(`DELETE FROM blog_entries WHERE id = ?`, [id]);
}
