import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../dashboard/Navbar';
import AccountActive from '@/renderer/components/layouts/AccountActive';

const DashBoardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-8">
        <Outlet />
      </div>
      <AccountActive />
    </div>
  );
};

export default DashBoardLayout;
