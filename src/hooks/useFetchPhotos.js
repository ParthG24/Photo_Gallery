import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async () => {
    let isMounted = true;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch photos. Please try again.');
      const data = await res.json();
      if (isMounted) setPhotos(data);
    } catch (err) {
      if (isMounted) setError(err.message);
    } finally {
      if (isMounted) setLoading(false);
    }

    // This cleanup runs when the component using this hook unmounts mid-fetch
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // We expose refetch so the ErrorMessage retry button can call it
  // instead of reloading the entire page with window.location.reload()
  return { photos, loading, error, refetch: fetchPhotos };
}
