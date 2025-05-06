import { useState, useEffect } from 'react';
import { ProjectInterface } from '@/main/types/index';

export function useProjectList(reload?: boolean) {
  const [data, setData] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await window.electron.project.getProjects();
        setData(res);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, [reload]);

  return { data, loading, error };
}
