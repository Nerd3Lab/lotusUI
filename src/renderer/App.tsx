import '@/renderer/styles/App.css';
import AppRouter from './Router';
import Layout from './components/layouts/Layout';

function App() {
  return (
    <Layout>
      <AppRouter />
    </Layout>
  );
}

export default App;
