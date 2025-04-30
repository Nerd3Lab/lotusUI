import { ParentService } from '@/main/services/parentService';
import { ProjectService } from '@/main/services/projectService';
import { BrowserWindow } from 'electron';
import { AppUpdater } from 'electron-updater';

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

  registerEvents() {}

  async runProject(name: string) {
    const project = this.projectService.getProject(name);

    const releases = await this.projectService.getReleases();

    if (!releases || releases.length === 0) {
      throw new Error('No releases found');
    }

    if (!project) {
      throw new Error('Project not found');
    }

    const release = releases.find(
      (r) => r.tag_name === project.configJson.suiVersion,
    );
    if (!release) {
      throw new Error('Release version not found');
    }
  }
}
