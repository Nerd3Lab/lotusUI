import { BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';
import { exec } from 'child_process';
export class ParentService {
  window: BrowserWindow | undefined = undefined;
  appUpdater: AppUpdater;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    this.window = window;
    this.appUpdater = appUpdater;
  }

  isActive() {
    if (this.window && !this.window.isDestroyed()) return true;
    return false;
  }

  async execCmd(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) reject(error);
        resolve(stdout);
      });
    });
  }
}
