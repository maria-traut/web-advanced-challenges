"use client";

import useFavoritesStore from "../store/useFavoritesStore";

export default function FavoriteButton({ id }: { id: number }) {
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  function toggleFavorite() {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }
  return <button onClick={toggleFavorite}>{isFavorite ? "💜" : "🤍"}</button>;
}
