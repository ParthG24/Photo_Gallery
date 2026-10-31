import { useState, useEffect } from 'react';

const API_URL = 'https://picsum.photos/v2/list?limit=30';

export function useFetchPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchPhotos() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error('Failed to fetch photos from Picsum API');
        }

        const data = await res.json();
        if (isMounted) {
          setPhotos(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Something went wrong');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchPhotos();

    return () => {
      isMounted = false;
    };
  }, []);

  return { photos, loading, error };
}
