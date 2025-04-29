// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { ProjectCreatePayload, ProjectInterface } from '@/main/types/index';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
  project: {
    getReleases: () =>
      ipcRenderer.invoke('project:getReleases') as Promise<
        Promise<
          {
            tag_name: string;
            name: string;
          }[]
        >
      >,
    getProjects: () =>
      ipcRenderer.invoke('project:getProjects') as Promise<ProjectInterface[]>,
    createProject: (payload: ProjectCreatePayload) =>
      ipcRenderer.invoke('project:create', payload) as Promise<
        ProjectInterface | undefined
      >,
    removeProject: (name: string) =>
      ipcRenderer.invoke('project:remove', name) as Promise<boolean>,
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
