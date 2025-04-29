import { BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';

export class ParentService {
  window: BrowserWindow | null = null;
  appUpdater: AppUpdater;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.window = window;
    this.appUpdater = appUpdater;
  }

  isActive() {
    if (this.window && !this.window.isDestroyed()) return true;
    return false;
  }
}
