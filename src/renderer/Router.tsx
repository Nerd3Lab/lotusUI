import ProjectLoading from '@/renderer/pages/ProjectLoading';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import DashBoardLayout from './components/layouts/DashBoardLayout';
import Layout from './components/layouts/Layout';
import DashboardAccountPage from './pages/DashboardAccountPage';
import CreateProject from './pages/ProjectCreatePage';
import Project from './pages/ProjectPage';
import DashboardLogPage from '@/renderer/pages/DashboardLogPage';

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
          <Route path="account" element={<DashboardAccountPage />} />
          <Route path="logging" element={<DashboardLogPage />} />
        </Route>
      </Routes>
    </Router>
    // </HashRouter>
  );
};

export default AppRouter;
