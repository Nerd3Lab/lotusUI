// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import {
  AddressType,
  CreateAccountPayload,
  CreateAccountResult,
  ObjectDataResultItem,
  ProjectCreatePayload,
  ProjectInterface,
} from '@/main/types/index';
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels =
  | 'node-run-log'
  | 'download-progress'
  | 'update-downloaded-success';

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
    getProject: (name: string) =>
      ipcRenderer.invoke('project:get', name) as Promise<
        ProjectInterface | undefined
      >,
    createProject: (payload: ProjectCreatePayload) =>
      ipcRenderer.invoke('project:create', payload) as Promise<
        ProjectInterface | undefined
      >,
    removeProject: (name: string) =>
      ipcRenderer.invoke('project:remove', name) as Promise<boolean>,
  },
  node: {
    runProject: (name: string) =>
      ipcRenderer.invoke('node:runProject', name) as Promise<{
        isSuccess: boolean;
        error: string;
        isSuiNotInstalled?: boolean;
      }>,
    stopProject: () => ipcRenderer.invoke('node:stopProject') as Promise<void>,
  },
  account: {
    getAccounts: () =>
      ipcRenderer.invoke('account:getAccounts') as Promise<AddressType[]>,
    generateNewAccount: (payload: CreateAccountPayload) =>
      ipcRenderer.invoke('account:generateNewAccount', payload) as Promise<
        CreateAccountResult | undefined
      >,
    setActiveAccount: (address: string) =>
      ipcRenderer.invoke(
        'account:setActiveAccount',
        address,
      ) as Promise<boolean>,
    requestFaucet: (address: string) =>
      ipcRenderer.invoke('account:requestFaucet', address) as Promise<boolean>,
    getObjects: (address: string) =>
      ipcRenderer.invoke('account:getObjects', address) as Promise<
        ObjectDataResultItem[]
      >,
    deleteAccount: (address: string) =>
      ipcRenderer.invoke('account:deleteAccount', address) as Promise<boolean>,
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
