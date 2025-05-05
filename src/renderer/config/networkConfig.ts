import { createNetworkConfig } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';

const { networkConfig, useNetworkVariable } = createNetworkConfig({
  localnet: {
    url: getFullnodeUrl('localnet'),
  },
});

export { networkConfig, useNetworkVariable };
