import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'koki-favorites';

function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {}
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => { saveFavorites(favorites); }, [favorites]);

  const addFavorite = useCallback((recipe) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === recipe.id)) return prev;
      return [{ ...recipe, savedAt: Date.now() }, ...prev];
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const isFavorite = useCallback((id) => {
    return favorites.some((f) => f.id === id);
  }, [favorites]);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}
