import { useEffect, useRef, useState } from 'react';

export function useApi(resource, token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const cache = useRef({});

  useEffect(() => {
    if (cache.current[resource]) {
      setData(cache.current[resource]);
      setLoading(false);
      return;
    }

    fetch(resource, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(json => {
        cache.current[resource] = json;
        setData(json);
        setLoading(false);
      });
  }, [resource]);

  return { data, loading };
}
