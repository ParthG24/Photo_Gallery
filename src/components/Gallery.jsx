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

export default function Gallery() {
  const { photos, loading, error } = useFetchPhotos();

  // Favourites state managed by useReducer, loaded from localStorage
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );

  const [searchQuery, setSearchQuery] = useState('');

  // useCallback memoizes the input handler function across re-renders
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // Dispatch toggle favourite action
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  // useMemo computes filtered list without re-running on unrelated renders
  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return photos;

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchQuery]);

  return (
    <div className="w-full">
      <SearchBar value={searchQuery} onChange={handleSearchChange} />

      {loading && <LoadingSpinner />}

      {!loading && error && (
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      )}

      {!loading && !error && (
        <>
          {/* Subtle status bar */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800/80 text-xs text-neutral-400">
            <p>
              Showing{' '}
              <span className="text-white font-medium">
                {filteredPhotos.length}
              </span>{' '}
              of{' '}
              <span className="text-white font-medium">{photos.length}</span>{' '}
              photos
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              <span>
                <span className="text-white font-medium">
                  {favourites.length}
                </span>{' '}
                favourites
              </span>
            </p>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-neutral-900/40 border border-neutral-800/80 rounded-2xl p-8">
              <p className="text-sm font-medium text-neutral-300 mb-1">
                No matching photos found
              </p>
              <p className="text-xs text-neutral-500">
                No photographer matched &ldquo;{searchQuery}&rdquo;. Try another name.
              </p>
            </div>
          ) : (
            /* Responsive Grid: Desktop 4, Tablet 2, Mobile 1 */
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
