import { NodeService } from '@/main/services/nodeService';
import { ParentService } from '@/main/services/parentService';
import {
  ProjectCreatePayload,
  ProjectInterface,
  ProjectJsonInterface,
} from '@/main/types/index';
import { appPath } from '@/main/utils/config';
import { readJsonFile } from '@/main/utils/index';
import axios from 'axios';
import { BrowserWindow, ipcMain } from 'electron';
import { AppUpdater } from 'electron-updater';
import fs from 'fs';

export class ProjectService extends ParentService {
  private nodeService?: NodeService;

  constructor(window: BrowserWindow, appUpdater: AppUpdater) {
    super(window, appUpdater);
    this.registerEvents();
  }

  setNodeService(nodeService: NodeService) {
    this.nodeService = nodeService;
  }

  registerEvents() {
    ipcMain.handle('project:check', async (_) => {
      return 'ok';
    });

    ipcMain.handle('project:getReleases', async (_) => {
      return this.getReleases();
    });

    ipcMain.handle('project:getProjects', async (_) => {
      return this.getProjects();
    });

    ipcMain.handle(
      'project:create',
      async (_, payload: ProjectCreatePayload) => {
        return this.createProject(payload);
      },
    );

    ipcMain.handle('project:remove', async (_, name: string) => {
      return this.removeProject(name);
    });

    ipcMain.handle('project:get', async (_, name: string) => {
      return this.getProject(name);
    });
  }

  getProjects(): ProjectInterface[] {
    const projectPath = appPath.projects;

    if (!fs.existsSync(projectPath)) {
      fs.mkdirSync(projectPath, { recursive: true });
      return [];
    }

    const projects = fs.readdirSync(projectPath);
    const projectConfigs: ProjectInterface[] = [];

    for (const project of projects) {
      const projectDir = `${projectPath}/${project}`;
      const configPath = `${projectDir}/config.json`;

      const configJson = readJsonFile<ProjectJsonInterface>(configPath);

      if (configJson) {
        projectConfigs.push({
          configJson,
          path: projectDir,
        });
      }
    }

    projectConfigs.sort(
      (a, b) => b.configJson.lastedActive - a.configJson.lastedActive,
    );

    return projectConfigs;
  }

  getProject(name: string): ProjectInterface | undefined {
    const projectPath = appPath.projects;
    const projectDir = `${projectPath}/${name}`;
    const configPath = `${projectDir}/config.json`;

    if (!fs.existsSync(projectDir)) {
      return undefined;
    }

    const configJson = readJsonFile<ProjectJsonInterface>(configPath);

    if (!configJson) {
      return undefined;
    }

    return {
      configJson,
      path: projectDir,
    };
  }

  createProject(payload: ProjectCreatePayload): ProjectInterface | undefined {
    try {
      const projectPath = appPath.projects;
      const projectDir = `${projectPath}/${payload.name}`;

      if (fs.existsSync(projectDir)) {
        throw new Error('Project already exists');
      }

      fs.mkdirSync(projectDir, { recursive: true });

      const timestamp = new Date().getTime();

      const configPath = `${projectDir}/config.json`;
      fs.writeFileSync(
        configPath,
        JSON.stringify(
          {
            ...payload,
            createdAt: timestamp,
            lastedActive: timestamp,
          },
          null,
          2,
        ),
      );

      this.nodeService!.createSuiGenesis(payload.name);

      return {
        configJson: {
          ...payload,
          createdAt: timestamp,
          lastedActive: timestamp,
        },
        path: projectDir,
      };
    } catch (error) {
      return undefined;
    }
  }

  removeProject(name: string): boolean {
    const projectPath = appPath.projects;
    const projectDir = `${projectPath}/${name}`;

    if (!fs.existsSync(projectDir)) {
      throw new Error('Project does not exist');
    }

    fs.rmSync(projectDir, { recursive: true, force: true });

    return true;
  }

  updateProject(
    name: string,
    key: string,
    value: any,
  ): ProjectInterface | undefined {
    try {
      const projectPath = appPath.projects;
      const projectDir = `${projectPath}/${name}`;
      const configPath = `${projectDir}/config.json`;

      if (!fs.existsSync(projectDir)) {
        throw new Error('Project does not exist');
      }

      const configJson = readJsonFile<ProjectJsonInterface>(configPath);

      if (!configJson) {
        throw new Error('Invalid config file');
      }

      const updatedConfig = {
        ...configJson,
        [key]: value,
        lastedActive: new Date().getTime(),
      };

      fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2));

      return {
        configJson: updatedConfig,
        path: projectDir,
      };
    } catch (error) {
      return undefined;
    }
  }

  updateLastedActive(name: string): ProjectInterface | undefined {
    return this.updateProject(name, 'lastedActive', new Date().getTime());
  }

  async getReleases() {
    try {
      const response = await axios.get(
        'https://api.github.com/repos/MystenLabs/sui/releases',
      );
      const releases = response.data as any[];

      if (!releases) {
        return [];
      }

      return (releases || []).map((release) => {
        return {
          tag_name: release.tag_name,
          name: release.name,
        } as {
          tag_name: string;
          name: string;
        };
      });
    } catch (error) {
      return [];
    }
  }
}
