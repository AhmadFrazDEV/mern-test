// src/hooks/useApi.js
import { useEffect, useState } from 'react';

export function useApi(resource, token) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(resource, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [resource]);

  return { data, loading };
}
