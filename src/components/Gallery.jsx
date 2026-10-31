import React, { useState, useReducer, useCallback, useMemo } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import {
  favouritesReducer,
  getInitialFavourites,
} from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

/**
 * Gallery component: Core hub of the Photo Gallery App.
 *
 * Requirements fulfilled:
 * 1. Uses useFetchPhotos custom hook to fetch photos.
 * 2. Manages favourites using useReducer and persists to localStorage.
 * 3. Uses useCallback for the search input handler.
 * 4. Uses useMemo for computing the filtered photo list by author name.
 * 5. Responsive grid (1 col mobile, 2 cols tablet, 4 cols desktop).
 */
export default function Gallery() {
  // Requirement 6: Extract fetch logic into custom hook
  const { photos, loading, error } = useFetchPhotos();

  // Requirement 5: Manage favourites with useReducer + localStorage persistence
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );

  // Search filter state
  const [searchQuery, setSearchQuery] = useState('');

  // Requirement 7: useCallback on search filter handler
  const handleSearchChange = useCallback((event) => {
    setSearchQuery(event.target.value);
  }, []);

  // Action dispatcher to toggle favourite photo
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  // Requirement 7: useMemo to compute filtered photo list in real-time
  const filteredPhotos = useMemo(() => {
    const cleanQuery = searchQuery.trim().toLowerCase();

    // If search is empty, return all fetched photos
    if (!cleanQuery) {
      return photos;
    }

    // Filter already-fetched photos by author name (case-insensitive)
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(cleanQuery)
    );
  }, [photos, searchQuery]);

  return (
    <div className="w-full">
      {/* Search Filter Header (Requirement 4) */}
      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {/* Loading State (Requirement 2) */}
      {loading && <LoadingSpinner />}

      {/* Error State (Requirement 2) */}
      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      )}

      {/* Loaded & Ready Gallery Content */}
      {!loading && !error && (
        <>
          {/* Subheader info: total counts */}
          <div className="flex items-center justify-between mb-6 text-sm text-gray-500 px-1">
            <p>
              Showing{' '}
              <span className="font-semibold text-gray-800">
                {filteredPhotos.length}
              </span>{' '}
              of{' '}
              <span className="font-semibold text-gray-800">
                {photos.length}
              </span>{' '}
              photos
            </p>
            <p className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
              <span>
                <span className="font-semibold text-gray-800">
                  {favourites.length}
                </span>{' '}
                favourited
              </span>
            </p>
          </div>

          {/* Empty Search Result State */}
          {filteredPhotos.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-gray-100 text-gray-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-base font-semibold text-gray-800 mb-1">
                No photos found
              </h4>
              <p className="text-sm text-gray-500">
                No photographers matched &ldquo;{searchQuery}&rdquo;. Try another name.
              </p>
            </div>
          ) : (
            /* Requirement 3: Responsive Grid (Desktop 4 cols, Tablet 2 cols, Mobile 1 col) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPhotos.map((photo) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  isFavourite={favourites.includes(photo.id)}
                  onToggleFavourite={handleToggleFavourite}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
