import { ProjectService } from '@/main/services/projectService';
import { ipcMain, BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';

export class IpcHandler {
  private projectService: ProjectService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.projectService = new ProjectService(window, appUpdater);
  }
}
