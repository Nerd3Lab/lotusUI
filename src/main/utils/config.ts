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
  const { execSync } = require('child_process');
  try {
    if (process.platform === 'win32') {
      try {
        const whereSui = execSync('where sui').toString().trim();
        if (whereSui) {
          return (
            whereSui.split('\r\n')[0] ||
            'C:\\ProgramData\\chocolatey\\bin\\sui.exe'
          );
        }
      } catch (error) {
        // where command failed, fallback to default path
      }
      return 'C:\\ProgramData\\chocolatey\\bin\\sui.exe';
    }
    const paths = execSync('which sui', {
      env: {
        PATH: '/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
      },
    })
      .toString()
      .trim();
    if (!paths) {
      return process.platform === 'darwin'
        ? '/usr/local/opt/sui/bin/sui'
        : '/usr/bin/sui';
    }
    return paths.split(' ')[0];
  } catch (error) {
    return process.platform === 'darwin'
      ? '/usr/local/opt/sui/bin/sui'
      : '/usr/bin/sui';
  }
};
