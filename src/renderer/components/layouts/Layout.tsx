import { Outlet } from 'react-router-dom';
import MainLayout from './MainLayout';

const Layout = () => {
  return (
    <div className="w-full h-screen relative">
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
};

export default Layout;
