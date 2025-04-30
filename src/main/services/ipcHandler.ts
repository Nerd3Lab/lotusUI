import { NodeService } from '@/main/services/nodeService';
import { ProjectService } from '@/main/services/projectService';
import { ipcMain, BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';

export class IpcHandler {
  private projectService: ProjectService;
  private nodeService: NodeService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.projectService = new ProjectService(window, appUpdater);
    this.nodeService = new NodeService(window, appUpdater, this.projectService);
  }
}
