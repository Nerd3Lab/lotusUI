import { store } from '@/renderer/states/store';
import '@/renderer/styles/App.css';
import { Provider as ReduxToolkitProvider } from 'react-redux';
import AppRouter from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { networkConfig } from '@/renderer/config/networkConfig';
import Initialization from '@/renderer/provider/Initialization';
import UpdateLoading from '@/renderer/components/layouts/UpdateLoading';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={'localnet'}>
          <ReduxToolkitProvider store={store}>
            <UpdateLoading />
            <Initialization />
            <AppRouter />
          </ReduxToolkitProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
