// Key used for saving favourites in browser localStorage
export const FAVOURITES_STORAGE_KEY = 'celebrare_favourite_photos';

/**
 * Lazy initializer function for useReducer.
 * Reads existing favourites array from localStorage on initial page load.
 *
 * @returns {string[]} Array of favorited photo IDs
 */
export function getInitialFavourites() {
  try {
    const stored = localStorage.getItem(FAVOURITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to parse favourites from localStorage:', error);
    return [];
  }
}

/**
 * Reducer function for managing favourites state.
 *
 * @param {string[]} state - Current list of favourite photo IDs
 * @param {{ type: string, payload: string }} action - Dispatched action
 * @returns {string[]} New state
 */
export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const photoId = action.payload;
      const isAlreadyFavourite = state.includes(photoId);

      // Add if not present, remove if already present
      const updatedFavourites = isAlreadyFavourite
        ? state.filter((id) => id !== photoId)
        : [...state, photoId];

      // Save to localStorage for persistence across reloads
      try {
        localStorage.setItem(FAVOURITES_STORAGE_KEY, JSON.stringify(updatedFavourites));
      } catch (error) {
        console.error('Failed to save favourites to localStorage:', error);
      }

      return updatedFavourites;
    }

    default:
      return state;
  }
}
