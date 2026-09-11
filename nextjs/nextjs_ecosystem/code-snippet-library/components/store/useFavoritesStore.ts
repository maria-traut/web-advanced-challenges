import { create } from "zustand";

interface FavoritesState {
  favoriteIds: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favoriteIds: [],

  addFavorite: (id) =>
    set((state) => ({
      favoriteIds: [...state.favoriteIds, id],
    })),

  removeFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.filter((favId) => favId !== id),
    })),

  isFavorite: (id) => get().favoriteIds.includes(id),
}));

export default useFavoritesStore;
