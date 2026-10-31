import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch photos from the API
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

  // Fetch once when the component mounts
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error, refetch: fetchPhotos };
}
