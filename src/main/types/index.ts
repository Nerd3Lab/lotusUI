export interface ProjectInterface {
  configJson: ProjectJsonInterface;
  path: string;
}

export interface ProjectJsonInterface {
  name: string;
  fullnode: boolean;
  epochDuration: number;
  suiVersion: string;
  isAutoReset: boolean;
  createdAt: number;
  lastedActive: number;
  description: string;
}

export interface ProjectCreatePayload {
  name: string;
  fullnode: boolean;
  epochDuration: number;
  suiVersion: string;
  isAutoReset: boolean;
  description: string;
}
