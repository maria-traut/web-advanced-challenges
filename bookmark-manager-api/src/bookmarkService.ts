import { bookmarks, type Bookmark } from "./data";

export function getAllBookmarks(): Bookmark[] {
  return bookmarks;
}

export function getBookMarkById(id: number): Bookmark | null {
  return bookmarks.find((bookmark) => bookmark.id === id) || null;
}
