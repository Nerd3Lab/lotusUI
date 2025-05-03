import { Outlet } from 'react-router-dom';
import NavBar from '../dashboard/Navbar';

const DashBoardLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
