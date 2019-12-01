import { useEffect, useState } from 'react';

// TODO: in the future replace with Suspense once it supports data fetching.
export function useFetchJson (url) {
  const [json, setJson] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Effect hook applied after every render.
  useEffect(() => {
    fetch(url)
      .then(
        response => {
          if (!response.ok || response.status !== 200) {
            throw new Error(
              `HTTP Status Code: ${response.status} ${response.statusText}`
            );
          }

          return response.json();
        }
      )
      .then(
        json => {
          setJson(json);
          setLoading(false);
        },
        error => {
          setError(error);
          setLoading(false);
        }
      );
  },
  [url]);

  return {json, error, loading};
}
