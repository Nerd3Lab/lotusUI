import { HashRouter, Route, Routes } from 'react-router-dom';
import CreateProject from './pages/ProjectCreatePage';
import Project from './pages/ProjectPage';

const AppRouter = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/create" element={<CreateProject />} />
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;
