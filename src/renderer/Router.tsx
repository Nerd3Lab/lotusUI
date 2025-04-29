import CreateProject from './pages/ProjectCreatePage';
import Project from './pages/ProjectPage';
import ProjectLoading from '@/renderer/pages/ProjectLoading';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';

const AppRouter = () => {
  return (
    // <HashRouter>
    <Router>
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/create" element={<CreateProject />} />
        <Route path="/loading" element={<ProjectLoading />} />
      </Routes>
    </Router>
    // </HashRouter>
  );
};

export default AppRouter;
