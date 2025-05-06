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
  transactionBlocks: number;
}

export interface ProjectCreatePayload {
  name: string;
  fullnode: boolean;
  epochDuration: number;
  isAutoReset: boolean;
  description: string;
}

export interface NodeRunLogInterface {
  message?: string;
  loading: boolean;
  running: boolean;
  error: boolean;
  transactionBlocks?: number;
  checkpointDone?: boolean;
  lastestCheckpoint?: number;
}

export interface AddressType {
  address: string;
  alias: string;
  isActive: boolean;
}

export interface CreateAccountPayload {
  alias: string;
  wordLength: 'word12' | 'word15' | 'word18' | 'word21' | 'word24';
  keyScheme: 'ed25519' | 'secp256k1';
}

export interface CreateAccountResult {
  alias: string;
  address: string;
  keyScheme: string;
  recoveryPhrase: string;
}

export interface ObjectDataResultItem {
  objectId: string;
  version: string;
  digest: string;
  type: string;
  owner: {
    AddressOwner: string;
  };
  previousTransaction: string;
  storageRebate: string;
  content: {
    dataType: string;
    type: string;
    hasPublicTransfer: boolean;
    fields: {
      balance: string;
      id: {
        id: string;
      };
    };
  };
}
