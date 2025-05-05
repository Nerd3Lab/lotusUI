import { AccountService } from '@/main/services/accountService';
import { NodeService } from '@/main/services/nodeService';
import { ProjectService } from '@/main/services/projectService';
import { ipcMain, BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';

export class IpcHandler {
  private projectService: ProjectService;
  private nodeService: NodeService;
  private accountService: AccountService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.projectService = new ProjectService(window, appUpdater);
    this.nodeService = new NodeService(window, appUpdater);
    this.accountService = new AccountService(window, appUpdater);
    // Set circular references
    this.projectService.setNodeService(this.nodeService);
    this.nodeService.setProjectService(this.projectService);
    this.accountService.setNodeService(this.nodeService);
  }
}
