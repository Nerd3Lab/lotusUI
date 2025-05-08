import { Icon } from '@iconify/react';
import { Outlet } from 'react-router-dom';
import NavBar from '../dashboard/Navbar';

const DashBoardLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="mx-8">
        <Outlet />
      </div>
      <div className="absolute bottom-10 right-10 bg-[#0F0F10] border border-blue-500 rounded-lg p-4 w-96">
        <div className="flex items-center justify-between">
          <p className="text-white">Account name</p>
          <div className="rounded-full p-1 px-3 bg-green-100 border border-green-200 text-green-700 text-xs font-medium">
            Active
          </div>
        </div>
        <div className="bg-black text-white rounded-xl py-4 flex justify-between items-start w-full max-w-md">
          <div>
            <div className="text-sm font-semibold">100.00 SUI</div>
            <div className="text-sm text-gray-400">100000000000 Mist</div>
          </div>
          <div className="text-left">
            <div className="text-sm text-gray-400">Address</div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">0x82ff87...386ecc</span>
              <Icon
                icon="icon-park-outline:copy"
                className="w-4 h-4 text-gray-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
