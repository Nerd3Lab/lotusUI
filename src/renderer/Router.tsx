import ProjectLoading from '@/renderer/pages/ProjectLoading';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import DashBoardLayout from './components/layouts/DashBoardLayout';
import Layout from './components/layouts/Layout';
import AccountDashboardPage from './pages/AccountDashboardPage';
import CreateProject from './pages/ProjectCreatePage';
import Project from './pages/ProjectPage';

const AppRouter = () => {
  return (
    // <HashRouter>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Project />} />
          <Route path="/create" element={<CreateProject />} />
          <Route path="/loading" element={<ProjectLoading />} />
        </Route>
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route path="account" element={<AccountDashboardPage />} />
        </Route>
      </Routes>
    </Router>
    // </HashRouter>
  );
};

export default AppRouter;
