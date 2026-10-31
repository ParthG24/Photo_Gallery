import { useState, useEffect } from 'react';

// API endpoint to fetch 30 photos
const PICSUM_API_URL = 'https://picsum.photos/v2/list?limit=30';

/**
 * Custom hook to handle fetching photos from the Picsum API.
 * Encapsulates data fetching, loading state, and error handling.
 *
 * @returns {{ photos: Array, loading: boolean, error: string|null }}
 */
export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(PICSUM_API_URL);

        if (!response.ok) {
          throw new Error(`Failed to load photos (Status: ${response.status})`);
        }

        const data = await response.json();

        if (isMounted) {
          setPhotos(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong while fetching photos.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPhotos();

    // Cleanup to prevent state updates if unmounted while fetching
    return () => {
      isMounted = false;
    };
  }, []);

  return { photos, loading, error };
}
