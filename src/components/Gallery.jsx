import React, { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favouritesReducer, getInitialFavourites, STORAGE_KEY } from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Gallery() {
  const { photos, loading, error, refetch } = useFetchPhotos();

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );

  const [searchQuery, setSearchQuery] = useState('');

  // Keep localStorage synchronized whenever favourites changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // Handle blocked storage gracefully
    }
  }, [favourites]);

  // useCallback stabilizes the function reference passed to SearchBar
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
        <ErrorMessage message={error} onRetry={refetch} />
      )}

      {!loading && !error && (
        <>
          {/* Subtle minimal status bar */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-200/80 text-xs text-zinc-500">
            <p>
              Showing{' '}
              <span className="text-zinc-900 font-medium">
                {filteredPhotos.length}
              </span>{' '}
              of{' '}
              <span className="text-zinc-900 font-medium">{photos.length}</span>{' '}
              photos
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
              <span>
                <span className="text-zinc-900 font-medium">
                  {favourites.length}
                </span>{' '}
                favourites
              </span>
            </p>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-white border border-zinc-200/80 rounded-2xl p-8 shadow-xs">
              <p className="text-sm font-medium text-zinc-800 mb-1">
                No matching photos found
              </p>
              <p className="text-xs text-zinc-500">
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
