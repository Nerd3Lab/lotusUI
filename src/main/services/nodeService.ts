import { ParentService } from '@/main/services/parentService';
import { ProjectService } from '@/main/services/projectService';
import { appPath } from '@/main/utils/config';
import { BrowserWindow, ipcMain } from 'electron';
import { AppUpdater } from 'electron-updater';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import https from 'https';
import extract from 'extract-zip';

export class NodeService extends ParentService {
  private projectService: ProjectService;

  constructor(
    window: BrowserWindow,
    appUpdater: AppUpdater,
    projectService: ProjectService,
  ) {
    super(window, appUpdater);
    this.registerEvents();
    this.projectService = projectService;
  }

  registerEvents() {
    ipcMain.handle('node:runProject', async (_, name: string) => {
      return this.runProject(name);
    });
  }

  async runProject(name: string) {
    try {
      const project = this.projectService.getProject(name);

      const releases = await this.projectService.getReleases();

      if (!releases || releases.length === 0) {
        return {
          isSuccess: false,
          error: 'No releases found',
        };
      }

      if (!project) {
        {
          return {
            isSuccess: false,
            error: `Project ${name} not found`,
          };
        }
      }

      const release = releases.find(
        (r) => r.tag_name === project.configJson.suiVersion,
      );
      if (!release) {
        return {
          isSuccess: false,
          error: `Release ${project.configJson.suiVersion} not found`,
        };
      }

      // await this.downloadSui(project.configJson.suiVersion);

      const suiList = this.getAvailableSuiVersion();

      return {
        isSuccess: true,
        error: undefined,
      };
    } catch (error) {
      return {
        isSuccess: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async downloadSui(version: string) {
    const SuiPath = appPath.sui;

    const { url, filename } = getDownloadUrl(version);
    const suiVersionPathdir = path.join(SuiPath, version);

    if (!fs.existsSync(suiVersionPathdir)) {
      fs.mkdirSync(suiVersionPathdir, { recursive: true });
    }

    const downloadZipPath = path.join(suiVersionPathdir, filename);

    return new Promise<void>((resolve, reject) => {
      const file = fs.createWriteStream(downloadZipPath);

      function followRedirect(response: any, window: BrowserWindow) {
        if (response.statusCode === 302 || response.statusCode === 301) {
          https.get(response.headers.location, (res) =>
            followRedirect(res, window),
          );
        } else if (response.statusCode !== 200) {
          reject(new Error(`Failed to download file: ${response.statusCode}`));
        } else {
          let downloadedBytes = 0;
          const totalBytes = parseInt(response.headers['content-length'], 10);

          response.on('data', (chunk: Buffer) => {
            downloadedBytes += chunk.length;
            const progress = (downloadedBytes / totalBytes) * 100;
            // console.log(`Downloading: ${progress.toFixed(1)}%`);
            // console.log('window', window);
            if (window) {
              window.webContents.send('node-run-log', {
                message: `Downloading sui version ${version}: ${progress.toFixed(1)}%`,
                loading: true,
                running: false,
                error: false,
              });
            }
          });

          response.pipe(file);

          file.on('finish', async () => {
            file.close();
            console.log(`Downloaded: ${downloadZipPath}`);

            if (window) {
              window.webContents.send('node-run-log', {
                message: 'Extracting files...',
                loading: true,
                running: false,
                error: false,
              });
            }

            try {
              if (filename.endsWith('.zip')) {
                await extract(downloadZipPath, { dir: suiVersionPathdir });
              } else {
                console.log(
                  `tar -xzf "${downloadZipPath}" -C "${suiVersionPathdir}"`,
                );
                execSync(
                  `tar -xzf "${downloadZipPath}" -C "${suiVersionPathdir}"`,
                );
              }

              // Delete the zip file after extraction
              fs.unlinkSync(downloadZipPath);

              if (window) {
                window.webContents.send('node-run-log', {
                  message: 'Download and extraction complete!',
                  loading: false,
                  running: false,
                  error: false,
                });
              }
              resolve();
            } catch (error) {
              if (window) {
                window.webContents.send('node-run-log', {
                  message:
                    error instanceof Error
                      ? error.message
                      : 'Extraction failed',
                  loading: false,
                  running: false,
                  error: true,
                });
              }
              reject(error);
            }
          });
        }
      }

      https
        .get(url, (response) => followRedirect(response, this.window!))
        .on('error', (error) => {
          console.log('Download error:', error);
          reject(error);
        });
    });
  }

  async getAvailableSuiVersion() {
    const SuiPath = appPath.sui;
  }
}

function getDownloadUrl(version: string): { url: string; filename: string } {
  const DOWNLOAD_BASE_URL = `https://github.com/MystenLabs/sui/releases/download/${version}`;
  const platform = process.platform;
  const arch = process.arch;

  if (platform === 'win32') {
    return {
      url: `${DOWNLOAD_BASE_URL}/sui-${version}-windows-x86_64.tgz`,
      filename: `sui-${version}-windows-x86_64.tgz`,
    };
  } else if (platform === 'darwin') {
    return {
      url: `${DOWNLOAD_BASE_URL}/sui-${version}-macos-x86_64.tgz`,
      filename: `sui-${version}-macos-x86_64.tgz`,
    };
  } else if (platform === 'linux') {
    return {
      url: `${DOWNLOAD_BASE_URL}/sui-${version}-ubuntu-x86_64.tgz`,
      filename: `sui-${version}-ubuntu-x86_64.tgz`,
    };
  } else {
    throw new Error('Unsupported OS');
  }
}
