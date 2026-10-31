import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pull photos from the API
  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch photos');
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, []);

  // run once as soon as the page opens
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // also return refetch so the retry button can call it
  return { photos, loading, error, refetch: fetchPhotos };
}
