import { useEffect, useState } from "react";

export default function useFetchImage(url, method) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [result, setResult] = useState();

  useEffect(() => {
    async function fetchImage() {
      try {
        setLoading(true);
        setError(false);

        const API_KEY = import.meta.env.VITE_REACT_PEXEL_API_KEY;
        const response = await fetch(url, {
          method: method,
          headers: {
            Authorization: API_KEY,
          },
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        const photoUrl = data.photos[0].src.medium;

        setResult(photoUrl);
      } catch (error) {
        setError(true);
        setLoading(false);

        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [url, method]);

  return { result, error, loading };
}
