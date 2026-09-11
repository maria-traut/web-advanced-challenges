"use client";

import useFavoritesStore from "@/components/store/useFavoritesStore";
import { getSnippetById } from "@/lib/services/snippetsService";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const favoriteSnippets = await getSnippetById(favoriteIds);
  return (
    <>
      <h2>My Favorite Snippets</h2>
      <ul>{}</ul>
    </>
  );
}
