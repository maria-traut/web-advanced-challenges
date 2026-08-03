import { getDB } from "../db/database.js";

export async function getAllBlogEntries() {
  const db = getDB();
  return await db.all("SELECT * FROM blog_entries");
}

export async function getBlogEntryById(id: number) {
  const db = getDB();
  return await db.get("SELECT * FROM blog_entries WHERE id = ?", [id]);
}
