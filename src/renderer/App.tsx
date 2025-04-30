import { store } from '@/renderer/states/store';
import '@/renderer/styles/App.css';
import { Provider as ReduxToolkitProvider } from 'react-redux';
import AppRouter from './Router';

function App() {
  return (
    <ReduxToolkitProvider store={store}>
      <AppRouter />
    </ReduxToolkitProvider>
  );
}

export default App;
