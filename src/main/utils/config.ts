import log from 'electron-log';
import path from 'path';
import { app } from 'electron';

const root = app.getPath('userData');

export const appPath = {
  log: log.transports.file.getFile().path,
  root,
  sui: path.join(root, 'sui'),
  projects: path.join(root, 'projects'),
  rust: path.join(root, 'rust'),
};

export const suiRepository = {
  mystenLabsSui: 'https://github.com/MystenLabs/sui.git',
};


export const suiBinaryPath = () => {
  if (process.platform === 'darwin') {
    return '/usr/local/opt/sui/bin/sui';
  } else if (process.platform === 'win32') {
    return 'C:\\ProgramData\\chocolatey\\bin\\sui.exe';
  } else {
    // Linux
    return '/usr/bin/sui';
  }
};
