import { NodeService } from '@/main/services/nodeService';
import { ParentService } from '@/main/services/parentService';
import {
  AddressType,
  CreateAccountPayload,
  CreateAccountResult,
} from '@/main/types/index';
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

    ipcMain.handle(
      'account:generateNewAccount',
      async (event, payload: CreateAccountPayload) => {
        return await this.addAccount(payload);
      },
    );

    ipcMain.handle(
      'account:setActiveAccount',
      async (event, address: string) => {
        return await this.setActiveAccount(address);
      },
    );

    ipcMain.handle('account:requestFaucet', async (event, address: string) => {
      return await this.requestFaucet(address);
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

  async addAccount(
    payload: CreateAccountPayload,
  ): Promise<CreateAccountResult | undefined> {
    const cmd = `sui client new-address ${payload.keyScheme} ${payload.alias} ${payload.wordLength} --json`;
    try {
      const result = await this.execCmd(cmd);
      const resultJson = JSON.parse(result);
      return resultJson;
    } catch (error) {
      return undefined;
    }
  }

  async setActiveAccount(address: string): Promise<boolean> {
    const cmd = `sui client switch --address ${address}`;
    try {
      await this.execCmd(cmd);
      return true;
    } catch (error) {
      return false;
    }
  }

  async requestFaucet(address: string): Promise<boolean> {
    const cmd = `sui client faucet --address ${address}`;
    try {
      await this.execCmd(cmd);
      return true;
    } catch (error) {
      return false;
    }
  }
}
