// import { ParentService } from '@/main/services/parentService';
// import { ProjectService } from '@/main/services/projectService';
// import { appPath } from '@/main/utils/config';
// import { BrowserWindow, ipcMain } from 'electron';
// import { AppUpdater } from 'electron-updater';
// import path from 'path';
// import fs from 'fs';
// import { exec, execSync, spawn } from 'child_process';
// import https from 'https';
// import extract from 'extract-zip';
// import { ProjectInterface } from '@/main/types/index';

// const RUST_DOWNLOAD_URL =
//   'https://github.com/rust-lang/rust/archive/refs/tags/1.86.0.tar.gz';

// export class NodeService extends ParentService {
//   private projectService: ProjectService;

//   constructor(
//     window: BrowserWindow,
//     appUpdater: AppUpdater,
//     projectService: ProjectService,
//   ) {
//     super(window, appUpdater);
//     this.registerEvents();
//     this.projectService = projectService;
//   }

//   registerEvents() {
//     ipcMain.handle('node:runProject', async (_, name: string) => {
//       return this.runProject(name);
//     });
//   }

//   async runProject(name: string) {
//     try {
//       const project = this.projectService.getProject(name);

//       const releases = await this.projectService.getReleases();

//       if (!releases || releases.length === 0) {
//         return {
//           isSuccess: false,
//           error: 'No releases found',
//         };
//       }

//       if (!project) {
//         {
//           return {
//             isSuccess: false,
//             error: `Project ${name} not found`,
//           };
//         }
//       }

//       const selectVersion = project.configJson.suiVersion;

//       const release = releases.find((r) => r.tag_name === selectVersion);
//       if (!release) {
//         return {
//           isSuccess: false,
//           error: `Release ${selectVersion} not found`,
//         };
//       }

//       const suiList = await this.getAvailableSuiVersion();
//       const selectSui = suiList.find((s) => s.version === selectVersion);

//       if (!selectSui) {
//         await this.downloadSui(selectVersion);
//       }

//       if (selectSui && !selectSui.active) {
//         await this.downloadSui(selectVersion, true);
//       }

//       const suiBinaryPath = getSuiBanaryPath(selectVersion, true);
//       const suiSelectPath = path.join(appPath.sui, selectVersion);

//       const checkVersion = await this.checkSuiDowloaded(selectVersion);
//       console.log({ checkVersion });

//       const env = { RUST_LOG: 'off,sui_node=info' };
//       const args = ['start', '--with-faucet', '--force-regenesis'];

//       // if (!fs.existsSync(suiBinaryPath)) {
//       //   console.error('Sui binary not found at:', `${suiBinaryPath}`);
//       //   // You can trigger a fallback download or error message here
//       // } else {
//       //   console.log(`found sui!!`);
//       // }

//       try {
//         const suiProcess = spawn(suiBinaryPath, args, {
//           env: {
//             ...process.env,
//             ...env,
//           },
//         });

//         suiProcess.stdout.on('data', (data) => {
//           const message = data.toString();
//           console.log({ message });
//           this.window?.webContents.send('node-run-log', {
//             message,
//             loading: false,
//             running: true,
//             error: false,
//           });
//         });

//         suiProcess.stderr.on('data', (data) => {
//           const message = data.toString();
//           console.log({ message });
//           // this.window?.webContents.send('node-run-log', {});
//         });
//       } catch (error) {
//         return {
//           isSuccess: false,
//           error:
//             error instanceof Error
//               ? error.message
//               : 'Unknown error occurred on spawn',
//         };
//       }

//       return {
//         isSuccess: true,
//         error: undefined,
//       };
//     } catch (error) {
//       return {
//         isSuccess: false,
//         error:
//           error instanceof Error ? error.message : 'Unknown error occurred',
//       };
//     }
//   }

//   async downloadSui(version: string, reDowload = false) {
//     const SuiPath = appPath.sui;

//     const { url, filename } = getDownloadUrl(version);
//     const suiVersionPathdir = path.join(SuiPath, version);

//     if (reDowload && fs.existsSync(suiVersionPathdir)) {
//       fs.rmSync(suiVersionPathdir, { recursive: true, force: true });
//     }

//     if (!fs.existsSync(suiVersionPathdir)) {
//       fs.mkdirSync(suiVersionPathdir, { recursive: true });
//     }

//     const downloadZipPath = path.join(suiVersionPathdir, filename);

//     return new Promise<void>((resolve, reject) => {
//       const file = fs.createWriteStream(downloadZipPath);

//       function followRedirect(response: any, window: BrowserWindow) {
//         if (response.statusCode === 302 || response.statusCode === 301) {
//           https.get(response.headers.location, (res) =>
//             followRedirect(res, window),
//           );
//         } else if (response.statusCode !== 200) {
//           reject(new Error(`Failed to download file: ${response.statusCode}`));
//         } else {
//           let downloadedBytes = 0;
//           const totalBytes = parseInt(response.headers['content-length'], 10);

//           response.on('data', (chunk: Buffer) => {
//             downloadedBytes += chunk.length;
//             const progress = (downloadedBytes / totalBytes) * 100;
//             // console.log(`Downloading: ${progress.toFixed(1)}%`);
//             // console.log('window', window);
//             if (window) {
//               window.webContents.send('node-run-log', {
//                 message: `Downloading sui version ${version}: ${progress.toFixed(1)}%`,
//                 loading: true,
//                 running: false,
//                 error: false,
//               });
//             }
//           });

//           response.pipe(file);

//           file.on('finish', async () => {
//             file.close();
//             console.log(`Downloaded: ${downloadZipPath}`);

//             if (window) {
//               window.webContents.send('node-run-log', {
//                 message: 'Extracting files...',
//                 loading: true,
//                 running: false,
//                 error: false,
//               });
//             }

//             try {
//               if (filename.endsWith('.zip')) {
//                 await extract(downloadZipPath, { dir: suiVersionPathdir });
//               } else {
//                 console.log(
//                   `tar -xzf "${downloadZipPath}" -C "${suiVersionPathdir}"`,
//                 );
//                 execSync(
//                   `tar -xzf "${downloadZipPath}" -C "${suiVersionPathdir}"`,
//                 );
//               }


//               // Delete the zip file after extraction
//               fs.unlinkSync(downloadZipPath);

//               if (window) {
//                 window.webContents.send('node-run-log', {
//                   message: 'Download and extraction complete!',
//                   loading: false,
//                   running: false,
//                   error: false,
//                 });
//               }

//               try {
//                 const suiSelectPath = getSuiBanaryPath(version);
//                 const suiBinaryPath = getSuiBanaryPath(version, true);
//                 fs.chmodSync(suiSelectPath.replace(/"/g, ''), '755');

//                 // check permission of suiBinaryPath
//                 const stats = fs.statSync(suiBinaryPath.replace(/"/g, ''));
//                 const isExecutable = !!(stats.mode & fs.constants.S_IXUSR);

//                 console.log({ isExecutable });

//                 if (!isExecutable) {
//                   throw new Error(
//                     'Sui binary does not have executable permissions',
//                   );
//                 }
//               } catch (error) {
//                 console.error('Error setting file permissions:', error);
//               }

//               resolve();
//             } catch (error) {
//               if (window) {
//                 window.webContents.send('node-run-log', {
//                   message:
//                     error instanceof Error
//                       ? error.message
//                       : 'Extraction failed',
//                   loading: false,
//                   running: false,
//                   error: true,
//                 });
//               }
//               reject(error);
//             }
//           });
//         }
//       }

//       https
//         .get(url, (response) => followRedirect(response, this.window!))
//         .on('error', (error) => {
//           console.log('Download error:', error);
//           reject(error);
//         });
//     });
//   }

//   async downloadRust(reDowload = false) {
//     return new Promise((resolve, reject) => {
//       const rustPath = appPath.rust;
//       const rustBinaryPath = path.join(rustPath);

//       if (!reDowload && fs.existsSync(rustBinaryPath)) {
//         if (this.window) {
//           this.window.webContents.send('node-run-log', {
//             message: 'Rust already downloaded',
//             loading: false,
//             running: false,
//             error: false,
//           });
//         }
//         resolve(true);
//         return;
//       }

//       if (!fs.existsSync(rustPath)) {
//         fs.mkdirSync(rustPath, { recursive: true });
//       }

//       const downloadZipPath = path.join(rustPath, 'rust.tar.gz');
//       const fileStream = fs.createWriteStream(downloadZipPath);

//       if (this.window) {
//         this.window.webContents.send('node-run-log', {
//           message: 'Downloading Rust...',
//           loading: true,
//           running: true,
//           error: false,
//         });
//       }

//       const followRedirect = (response: any, window: BrowserWindow) => {
//         if (response.statusCode === 302 || response.statusCode === 301) {
//           https.get(response.headers.location, (res) =>
//             followRedirect(res, window),
//           );
//         } else {
//           response.pipe(fileStream);

//           fileStream.on('finish', async () => {
//             try {
//               if (this.window) {
//                 this.window.webContents.send('node-run-log', {
//                   message: 'Extracting Rust...',
//                   loading: true,
//                   running: true,
//                   error: false,
//                 });
//               }

//               if (process.platform === 'win32') {
//                 await extract(downloadZipPath, { dir: rustPath });
//               } else {
//                 execSync(`tar -xzf "${downloadZipPath}" -C "${rustPath}"`);
//               }

//               fs.unlinkSync(downloadZipPath);

//               if (this.window) {
//                 this.window.webContents.send('node-run-log', {
//                   message: 'Rust download and extraction complete!',
//                   loading: false,
//                   running: false,
//                   error: false,
//                 });
//               }
//               resolve(true);
//             } catch (error) {
//               if (this.window) {
//                 this.window.webContents.send('node-run-log', {
//                   message:
//                     error instanceof Error
//                       ? error.message
//                       : 'Rust extraction failed',
//                   loading: false,
//                   running: false,
//                   error: true,
//                 });
//               }
//               reject(error);
//             }
//           });
//         }
//       };

//       https
//         .get(RUST_DOWNLOAD_URL, (response) =>
//           followRedirect(response, this.window!),
//         )
//         .on('error', (error) => {
//           console.log('Rust download error:', error);
//           reject(error);
//         });
//     });
//   }

//   async getAvailableSuiVersion() {
//     const SuiPath = appPath.sui;

//     const result: {
//       version: string;
//       active: boolean;
//     }[] = [];

//     try {
//       const directories = fs.readdirSync(SuiPath);
//       for (const version of directories) {
//         if (fs.statSync(path.join(SuiPath, version)).isDirectory()) {
//           const active = await this.checkSuiDowloaded(version);

//           result.push({
//             version,
//             active: active,
//           });
//         }
//       }
//       return result;
//     } catch (error) {
//       console.error('Error reading Sui versions:', error);
//       return [];
//     }
//   }

//   async checkSuiDowloaded(version: string): Promise<boolean> {
//     const SuiPath = appPath.sui;

//     const suiBinary = getSuiBanaryPath(version);
//     console.log({ suiBinary });
//     return new Promise((resolve) => {
//       exec([suiBinary, '-V'].join(' '), (error, stdout, stderr) => {
//         console.log({ error, stdout, stderr });
//         if (error) {
//           resolve(false);
//         } else {
//           resolve(true);
//         }
//       });
//     });
//   }
// }

// function getSuiBanaryPath(version: string, noQuote = false) {
//   const isWin32 = process.platform === 'win32';
//   const SuiPath = appPath.sui;

//   const pathSui = path.join(SuiPath, version, isWin32 ? 'sui.exe' : 'sui');
//   const result = `"${pathSui}"`;
//   if (!noQuote) {
//     return result;
//   }
//   return pathSui;
// }

// function getDownloadUrl(version: string): { url: string; filename: string } {
//   const DOWNLOAD_BASE_URL = `https://github.com/MystenLabs/sui/releases/download/${version}`;
//   const platform = process.platform;
//   const arch = process.arch;

//   if (platform === 'win32') {
//     return {
//       url: `${DOWNLOAD_BASE_URL}/sui-${version}-windows-x86_64.tgz`,
//       filename: `sui-${version}-windows-x86_64.tgz`,
//     };
//   } else if (platform === 'darwin') {
//     return {
//       url: `${DOWNLOAD_BASE_URL}/sui-${version}-macos-x86_64.tgz`,
//       filename: `sui-${version}-macos-x86_64.tgz`,
//     };
//   } else if (platform === 'linux') {
//     return {
//       url: `${DOWNLOAD_BASE_URL}/sui-${version}-ubuntu-x86_64.tgz`,
//       filename: `sui-${version}-ubuntu-x86_64.tgz`,
//     };
//   } else {
//     throw new Error('Unsupported OS');
//   }
// }
