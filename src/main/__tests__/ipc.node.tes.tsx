import { IpcHandler } from '@/main/services/ipcHandler';
import { ProjectService } from '@/main/services/projectService';
import { BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import mockFs from 'mock-fs';

jest.mock('electron', () => ({
  ipcMain: {
    on: jest.fn(),
    handle: jest.fn(),
  },
  BrowserWindow: jest.fn(),
  app: {
    getPath: jest.fn().mockReturnValue('/mock/path'),
  },
}));

jest.mock('electron-updater', () => ({
  AppUpdater: jest.fn(),
}));

describe('IpcHandler', () => {
  let window: BrowserWindow;
  let ipcHandler: IpcHandler;
  let projectService: ProjectService;

  const createProject = async (name: string) => {
    const testHandler = (ipcMain.handle as jest.Mock).mock.calls.find(
      ([eventName]: [string]) => eventName === 'project:create',
    )[1];

    const payload = {
      name,
      fullnode: true,
      epochDuration: 100,
      suiVersion: '1.0.0',
      isAutoReset: false,
      description: 'test',
    };

    return await testHandler(null, payload);
  };

  beforeEach(() => {
    window = new BrowserWindow();
    ipcHandler = new IpcHandler(window, autoUpdater);
    projectService = new ProjectService(window, autoUpdater);

    // Set up mock filesystem, excluding node_modules
    mockFs({
      '/mock/path': {},
      node_modules: mockFs.load('node_modules'),
    });
  });

  afterEach(() => {
    // Restore the real filesystem
    mockFs.restore();
  });

  // afterAll(() => {
  //   // Restore the real filesystem
  //   mockFs.restore();
  // });

  it('should create an instance of IpcHandler', () => {
    expect(ipcHandler).toBeInstanceOf(IpcHandler);
  });
});
