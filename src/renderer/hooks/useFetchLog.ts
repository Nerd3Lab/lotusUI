import { NodeRunLogInterface } from '@/main/types/index';
import { useAppDispatch } from '@/renderer/states/hooks';
import { ProjectSlide } from '@/renderer/states/project/reducer';
import { useEffect } from 'react';

export const useFetchLog = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    window.electron.ipcRenderer.on('node-run-log', (message) => {
      const {
        message: messageLog,
        loading,
        running,
        error,
        transactionBlocks,
      } = message as NodeRunLogInterface;

      console.log({ messageLog, transactionBlocks });

      dispatch(ProjectSlide.actions.setStatus({ loading, running, error }));
      if (transactionBlocks) {
        dispatch(ProjectSlide.actions.setTransactionBlocks(transactionBlocks));
      }

      if (messageLog) {
        dispatch(ProjectSlide.actions.addLog(messageLog));
      }
    });
  }, []);
};
