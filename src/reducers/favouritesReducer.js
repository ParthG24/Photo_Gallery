export const STORAGE_KEY = 'gallery_favourites';

// Load saved favourites from localStorage once on initial render
export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Pure reducer: adds or removes a photo ID from the list
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = action.payload;
      return state.includes(id)
        ? state.filter((favId) => favId !== id)
        : [...state, id];
    }
    default:
      return state;
  }
}
