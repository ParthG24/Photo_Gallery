import React, { useState, useReducer, useCallback, useMemo, useEffect } from 'react';
import { useFetchPhotos } from '../hooks/useFetchPhotos';
import { favouritesReducer, getInitialFavourites, STORAGE_KEY } from '../reducers/favouritesReducer';
import SearchBar from './SearchBar';
import PhotoCard from './PhotoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

export default function Gallery() {
  const { photos, loading, error, refetch } = useFetchPhotos();

  // manage favourites list and load any saved ones on first render
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    [],
    getInitialFavourites
  );

  const [searchQuery, setSearchQuery] = useState('');

  // sync to localStorage whenever favourites state updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // ignore if storage is blocked (e.g. private browsing)
    }
  }, [favourites]);

  // with this useCallback function we make sure the child component doesn't re-render needlessly
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  // dispatch the toggle action when someone clicks a heart
  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  // with this useMemo function we make sure we don't re-run the filter on every re-render
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
          {/* simple count bar at the top */}
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#e2e7dc] text-xs text-[#64705c]">
            <p>
              Showing{' '}
              <span className="text-[#1f291c] font-medium">
                {filteredPhotos.length}
              </span>{' '}
              of{' '}
              <span className="text-[#1f291c] font-medium">{photos.length}</span>{' '}
              photos
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#445e39] inline-block" />
              <span>
                <span className="text-[#1f291c] font-medium">
                  {favourites.length}
                </span>{' '}
                favourites
              </span>
            </p>
          </div>

          {filteredPhotos.length === 0 ? (
            <div className="text-center py-20 bg-white border border-[#e2e7dc] rounded-2xl p-8 shadow-xs">
              <p className="text-sm font-medium text-[#1f291c] mb-1">
                No matching photos found
              </p>
              <p className="text-xs text-[#788570]">
                No photographer matched &ldquo;{searchQuery}&rdquo;. Try another name.
              </p>
            </div>
          ) : (
            /* responsive grid: 4 cols desktop, 2 cols tablet, 1 col mobile */
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
