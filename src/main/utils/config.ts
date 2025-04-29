import log from 'electron-log';
import path from 'path';
import { app } from 'electron';

const root = app.getPath('userData');

export const appPath = {
  log: log.transports.file.getFile().path,
  root,
  sui: path.join(root, 'sui'),
  projects: path.join(root, 'projects'),
};

export const suiRepository = {
  mystenLabsSui: 'https://github.com/MystenLabs/sui.git',
};
