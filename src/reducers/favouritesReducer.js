export const STORAGE_KEY = 'gallery_favourites';

// check if the user previously saved any favourites
export function getInitialFavourites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// simple reducer: toggle an id in or out of our array
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const id = action.payload;
      // if it's already there, remove it. otherwise add it
      return state.includes(id)
        ? state.filter((favId) => favId !== id)
        : [...state, id];
    }
    default:
      return state;
  }
}
