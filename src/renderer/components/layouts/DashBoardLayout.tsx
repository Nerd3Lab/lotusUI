import { Outlet } from 'react-router-dom';
import NavBar from '../dashboard/Navbar';

const DashBoardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
