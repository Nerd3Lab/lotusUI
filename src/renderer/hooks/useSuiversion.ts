import { useState, useEffect } from 'react';

export function useSuiVersion() {
  const [data, setData] = useState<{tag_name: string; name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchReleases() {
      try {
        const res = await window.electron.project.getReleases();
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch releases');
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  return { data, loading, error };
}
