import { getDB } from "../db/database.js";

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
