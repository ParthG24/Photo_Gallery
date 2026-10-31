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

  // Side effect: keep localStorage in sync whenever favourites changes.
  // This is the right place for it — not inside the reducer.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch {
      // localStorage might be blocked in some browsers (e.g. private mode)
    }
  }, [favourites]);

  // useCallback keeps the function reference stable across re-renders.
  // SearchBar is wrapped in React.memo, so it only re-renders when its props change.
  // Without useCallback here, a new function reference would be passed on every render,
  // making React.memo on SearchBar useless.
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleToggleFavourite = useCallback((photoId) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: photoId });
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return photos;
    return photos.filter((photo) => photo.author.toLowerCase().includes(query));
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
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800/80 text-xs text-neutral-400">
            <p>
              Showing{' '}
              <span className="text-white font-medium">{filteredPhotos.length}</span>{' '}
              of{' '}
              <span className="text-white font-medium">{photos.length}</span>{' '}
              photos
            </p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
              <span>
                <span className="text-white font-medium">{favourites.length}</span>{' '}
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
