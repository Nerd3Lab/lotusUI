export interface ProjectInterface {
  configJson: ProjectJsonInterface;
  path: string;
}

export interface ProjectJsonInterface {
  name: string;
  fullnode: boolean;
  epochDuration: number;
  isAutoReset: boolean;
  createdAt: number;
  lastedActive: number;
  description: string;
}

export interface ProjectCreatePayload {
  name: string;
  fullnode: boolean;
  epochDuration: number;
  isAutoReset: boolean;
  description: string;
}

export interface NodeRunLogInterface {
  message: string;
  loading: boolean;
  running: boolean;
  error: boolean;
}
