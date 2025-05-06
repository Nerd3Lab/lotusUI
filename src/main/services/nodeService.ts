import { ParentService } from '@/main/services/parentService';
import { ProjectService } from '@/main/services/projectService';
import { appPath } from '@/main/utils/config';
import { app, BrowserWindow, ipcMain } from 'electron';
import { AppUpdater } from 'electron-updater';
import path from 'path';
import fs from 'fs';
import {
  ChildProcessWithoutNullStreams,
  exec,
  execSync,
  spawn,
} from 'child_process';
import https from 'https';
import extract from 'extract-zip';
import { ProjectInterface } from '@/main/types/index';

let SUI_LOCAL_NODE_PROCESS: ChildProcessWithoutNullStreams | null = null;
let SUI_LOCAL_NODE_STATUS: {
  isRunning: boolean;
  transactionBlocks: number;
} | null = null;

export class NodeService extends ParentService {
  private projectService?: ProjectService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    super(window, appUpdater);
    this.registerEvents();
  }

  setProjectService(projectService: ProjectService) {
    this.projectService = projectService;
  }

  registerEvents() {
    ipcMain.handle('node:runProject', async (_, name: string) => {
      return this.runProject(name);
    });

    ipcMain.handle('node:getSuiVersion', async () => {
      return this.getSuiVersion();
    });

    ipcMain.handle('node:stopProject', async () => {
      return this.stopProject();
    });

    app.on('before-quit', () => {
      if (SUI_LOCAL_NODE_PROCESS) {
        SUI_LOCAL_NODE_PROCESS.kill();
        SUI_LOCAL_NODE_PROCESS = null;
        SUI_LOCAL_NODE_STATUS = null;
      }
    });
  }

  async runProject(name: string) {
    try {
      const project = this.projectService!.getProject(name);

      if (!project) {
        {
          return {
            isSuccess: false,
            error: `Project ${name} not found`,
          };
        }
      }

      const suiVersion = await this.getSuiVersion();

      this.projectService!.updateLastedActive(name);

      if (!suiVersion.isSuccess) {
        return {
          isSuccess: false,
          error: suiVersion.error,
          isSuiNotInstalled: true,
        };
      }

      console.log({ SUI_LOCAL_NODE_PROCESS });

      if (SUI_LOCAL_NODE_PROCESS) {
        console.log({
          message: 'Sui local node is already running',
          loading: false,
          running: true,
          error: false,
        });
        if (this.isActive()) {
          this.window?.webContents.send('node-run-log', {
            message: 'Sui local node is already running',
            loading: false,
            running: true,
            error: false,
          });
          return;
        }
      }

      const projectPath = appPath.projects;
      const projectDir = `${projectPath}/${name}`;
      const dataDir = `${projectDir}/data`;

      const env = { RUST_LOG: 'off,sui_node=info' };
      const args = ['start', `--network.config '${dataDir}'`, '--with-faucet'];

      console.log({ args });

      try {
        SUI_LOCAL_NODE_PROCESS = spawn('sui', args, {
          env: {
            ...process.env,
            ...env,
          },
          shell: true,
        });

        // console.log({ SUI_LOCAL_NODE_PROCESS });

        // SUI_LOCAL_NODE_PROCESS.stdout.on('data', async (data) => {
        //   const message = data.toString();
        //   const suiNodeStatus = await this.getSuiNodeStatus();

        //   if (suiNodeStatus && suiNodeStatus.isSuccess) {
        //     SUI_LOCAL_NODE_STATUS = {
        //       isRunning: suiNodeStatus.isRunning!,
        //       transactionBlocks: suiNodeStatus.transactionBlocks || 0,
        //     };
        //   }

        //   if (this.isActive() && SUI_LOCAL_NODE_STATUS?.isRunning) {
        //     this.window?.webContents.send('node-run-log', {
        //       loading: false,
        //       running: true,
        //       error: false,
        //       transactionBlocks: SUI_LOCAL_NODE_STATUS.transactionBlocks,
        //     });
        //   }
        // });

        SUI_LOCAL_NODE_PROCESS.stderr.on('data', async (data) => {
          const message = data.toString();
          // console.log({ message });

          const suiNodeStatus = await this.getSuiNodeStatus();

          if (suiNodeStatus && suiNodeStatus.isSuccess) {
            const transactionBlocks = suiNodeStatus.transactionBlocks;
            SUI_LOCAL_NODE_STATUS = {
              isRunning: suiNodeStatus.isRunning!,
              transactionBlocks: transactionBlocks || 0,
            };

            const project = this.projectService!.getProject(name);

            const checkpointDone =
              +transactionBlocks >= project!.configJson.transactionBlocks;

            console.log({
              transactionBlocks,
              lastest: project!.configJson.transactionBlocks,
            });

            if (checkpointDone) {
              this.projectService!.updateProject(
                name,
                'transactionBlocks',
                +transactionBlocks,
              );
            }

            if (this.isActive() && SUI_LOCAL_NODE_STATUS?.isRunning) {
              this.window?.webContents.send('node-run-log', {
                message,
                loading: false,
                running: true,
                error: false,
                transactionBlocks: SUI_LOCAL_NODE_STATUS.transactionBlocks,
                checkpointDone,
                lastestCheckpoint: project!.configJson.transactionBlocks,
              });
            }
          }

          // console.log({ message, suiNodeStatus, SUI_LOCAL_NODE_STATUS });
        });
      } catch (error) {
        SUI_LOCAL_NODE_STATUS = null;
        return {
          isSuccess: false,
          error:
            error instanceof Error
              ? error.message
              : 'Unknown error occurred on spawn',
        };
      }

      return {
        isSuccess: true,
        error: undefined,
      };
    } catch (error) {
      SUI_LOCAL_NODE_STATUS = null;
      return {
        isSuccess: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async stopProject() {
    if (SUI_LOCAL_NODE_PROCESS) {
      SUI_LOCAL_NODE_PROCESS.kill();
      SUI_LOCAL_NODE_PROCESS = null;
      SUI_LOCAL_NODE_STATUS = null;

      if (this.isActive()) {
        this.window?.webContents.send('node-run-log', {
          message: 'Sui local node stopped',
          loading: false,
          running: false,
          error: false,
        });
      }
    } else {
      console.log('Sui local node is not running');

      if (this.isActive()) {
        this.window?.webContents.send('node-run-log', {
          message: 'Sui local node is not running',
          loading: false,
          running: false,
          error: true,
        });
      }
    }
  }

  async getSuiVersion(): Promise<{
    isSuccess: boolean;
    error?: string;
    version?: string;
  }> {
    return new Promise((resolve) => {
      exec('sui -V', (error, stdout, stderr) => {
        if (error) {
          console.log('Error checking sui version:', error);
          resolve({
            isSuccess: false,
            error: error.message,
          });
          return;
        }

        if (stderr) {
          console.log('Stderr from sui version check:', stderr);
          resolve({
            isSuccess: false,
            error: stderr,
          });
          return;
        }

        const version = stdout.trim();
        resolve({
          isSuccess: true,
          version,
        });
      });
    });
  }

  async createSuiGenesis(
    name: string,
    reForce = false,
    epochDurationMs = 3600,
  ) {
    const projectPath = appPath.projects;
    const projectDir = `${projectPath}/${name}`;

    try {
      if (!fs.existsSync(projectDir)) {
        throw new Error('Project directory does not exist');
      }

      const dataDir = `${projectDir}/data`;

      if (reForce && fs.existsSync(dataDir)) {
        fs.rmSync(dataDir, { recursive: true, force: true });
      }

      fs.mkdirSync(dataDir, { recursive: true });

      return new Promise((resolve) => {
        exec(
          `sui genesis --working-dir '${dataDir}' --epoch-duration-ms ${epochDurationMs} --with-faucet`,
          (error, stdout, stderr) => {
            if (error) {
              console.log('Error creating sui genesis:', error);
              resolve({
                isSuccess: false,
                error: error.message,
              });
              return;
            }

            if (stderr) {
              console.log('Stderr from sui genesis:', stderr);
              resolve({
                isSuccess: false,
                error: stderr,
              });
              return;
            }

            // console.log(stdout);

            resolve({
              isSuccess: true,
            });
          },
        );
      });
    } catch (error) {
      return {
        isSuccess: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async getSuiNodeStatus() {
    if (SUI_LOCAL_NODE_PROCESS) {
      try {
        const response = await fetch('http://127.0.0.1:9000', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: 'sui_getTotalTransactionBlocks',
            params: [],
          }),
        });

        const data = await response.json();

        if (data.result !== undefined) {
          return {
            isSuccess: true,
            isRunning: true,
            transactionBlocks: data.result,
          };
        }

        return {
          isSuccess: true,
          isRunning: false,
        };
      } catch (error) {
        return {
          isSuccess: false,
          error:
            error instanceof Error ? error.message : 'Unknown error occurred',
        };
      }
    }
  }
}
