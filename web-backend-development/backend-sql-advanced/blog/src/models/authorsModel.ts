import { getDB } from "../db/database.js";

export async function getAllBlogEntriesByAuthor() {
  const db = getDB();
  const result = await db.all(
    "SELECT authors.name, blog_entries.title FROM blog_entries INNER JOIN authors ON blog_entries.author_id = authors.id",
  );
  return result;
}
