import { NodeService } from '@/main/services/nodeService';
import { ParentService } from '@/main/services/parentService';
import { AddressType } from '@/main/types/index';
import { BrowserWindow, ipcMain } from 'electron';
import { AppUpdater } from 'electron-updater';

export class AccountService extends ParentService {
  private nodeService?: NodeService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    super(window, appUpdater);
    this.registerEvents();
  }

  setNodeService(nodeService: NodeService) {
    this.nodeService = nodeService;
  }

  registerEvents() {
    ipcMain.handle('account:getAccounts', async () => {
      return await this.getAccounts();
    });
  }

  async getAccounts() {
    const cmd = 'sui client addresses --json';
    try {
      const addresses = await this.execCmd(cmd);
      const addressesJson = JSON.parse(addresses);
      const result: AddressType[] = [];

      const activeAddress = addressesJson.activeAddress;
      const addressList = addressesJson.addresses;

      for (const item of addressList) {
        const alias = item[0];
        const address = item[1];
        result.push({
          alias,
          address,
          isActive: activeAddress === address,
        });
      }

      return result;
    } catch (error) {
      return [];
    }
  }
}
