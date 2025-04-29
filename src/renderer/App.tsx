import '@/renderer/styles/App.css';
import AppRouter from './Router';
import Layout from './components/layouts/Layout';
import { store } from '@/renderer/states/store';
import { Provider as ReduxToolkitProvider } from 'react-redux';

function App() {
  return (
    <ReduxToolkitProvider store={store}>
      <Layout>
        <AppRouter />
      </Layout>
    </ReduxToolkitProvider>
  );
}

export default App;
