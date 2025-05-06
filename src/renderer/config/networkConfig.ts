import { createNetworkConfig } from '@mysten/dapp-kit';

const { networkConfig, useNetworkVariable } = createNetworkConfig({
  localnet: {
    url: 'http://127.0.0.1:9000',
  },
});

export { networkConfig, useNetworkVariable };
