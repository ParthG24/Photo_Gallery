const STORAGE_KEY = 'gallery_favourites';

export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// A reducer should only compute and return new state — nothing else.
// Saving to localStorage is a side effect, so it belongs in a useEffect in Gallery.jsx.
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = action.payload;
      return state.includes(id)
        ? state.filter((fav) => fav !== id)
        : [...state, id];
    }
    default:
      return state;
  }
}

export { STORAGE_KEY };
