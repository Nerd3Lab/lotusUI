import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  return (
    <div className="w-full h-screen relative">
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
