import fs from 'fs';

export const readJsonFile = <T = any>(path: string): T | undefined => {
  if (!fs.existsSync(path)) {
    return;
  }

  try {
    const configContent = fs.readFileSync(path, 'utf-8');
    const configJson = JSON.parse(configContent);

    return configJson as T;
  } catch (error) {
    return undefined;
  }
};
