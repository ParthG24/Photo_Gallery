const STORAGE_KEY = 'gallery_favourites';

// Get saved favourites from localStorage on initial page load
export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Reducer for managing favourite photos state
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photoId = action.payload;
      const isAlreadyFav = state.includes(photoId);

      const nextState = isAlreadyFav
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
      } catch {
        // Fallback gracefully if localStorage is unavailable
      }

      return nextState;
    }

    default:
      return state;
  }
}
