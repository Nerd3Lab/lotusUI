import { useFetchLog } from '@/renderer/hooks/useFetchLog';
import { useRefresh } from '@/renderer/hooks/useRefresh';
import { useEffect } from 'react';

function Initialization() {
  useRefresh();
  useFetchLog();

  return null;
}

export default Initialization;
