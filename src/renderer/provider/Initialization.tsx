import { useFetchAccount } from '@/renderer/hooks/useFetchAccount';
import { useFetchLog } from '@/renderer/hooks/useFetchLog';
import { useRefresh } from '@/renderer/hooks/useRefresh';
import { useEffect } from 'react';

function Initialization() {
  useRefresh();
  useFetchLog();
  useFetchAccount();

  return null;
}

export default Initialization;
