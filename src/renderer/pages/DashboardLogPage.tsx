import { useAppSelector } from '@/renderer/states/hooks';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

function DashboardLogPage() {
  const logContainerRef = useRef<HTMLDivElement>(null);

  const getLogLevel = (log: string) => {
    if (log.includes('WARN')) return 'warning';
    return 'info';
  };

  const logs = useAppSelector((state) => state.project.logs);

  useEffect(() => {
    // Auto-scroll to the latest log
    setTimeout(() => {
      logContainerRef.current?.scrollTo({
        top: logContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);
  }, [logs]);

  return (
    <div className="w-full px-8">
      <div className="p-4 bg-gray-900 text-white rounded-lg shadow-lg w-full max-w-full mx-auto">
        <h2 className="text-lg font-bold text-blue-400">Live Logs</h2>
        <div
          className="h-[70vh] overflow-auto border border-gray-700 p-2 mt-2 rounded"
          ref={logContainerRef}
        >
          {logs.map((log, index) => {
            const level = getLogLevel(log);
            return (
              <div
                key={index}
                className="flex gap-2 p-1 border-b border-gray-700 items-start text-sm"
              >
                <span
                  className={`px-2 w-[5rem] py-1 rounded text-xs font-semibold ${
                    level === 'warning'
                      ? 'bg-yellow-500 text-black'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {level.toUpperCase()}
                </span>
                <span className="whitespace-pre-wrap">{log}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DashboardLogPage;
