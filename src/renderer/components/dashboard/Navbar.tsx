import SUI from '@asset/img/crypto/sui-white.svg';
import LOGO from '@asset/img/logo-white.svg';
import NavLinkItem from './NavLinkItem'; // ปรับ path ให้ถูก

const NavBar = () => {
  return (
    <nav className="p-4 mb-5">
      <div className="bg-[#0F0F10] text-white px-10 py-3 rounded-xl flex justify-between items-center">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2 text-xl font-semibold text-cyan-300">
            <img src={LOGO} alt="Lotus Logo" className="h-6" />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <NavLinkItem to="/dashboard/account" label="Accounts" exact />
              <NavLinkItem to="/dashboard/explorer" label="Explorer" exact />
              <NavLinkItem to="/dashboard/logging" label="Logging" exact />
              <NavLinkItem to="/dashboard/objects" label="Objects" exact />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-6 text-sm">
          <StatusItem label="Current Block" value="122" />
          <StatusItem
            label="Hardfork"
            value={
              <span className="flex items-center gap-1">
                <div className="w-5 h-5 rounded-full bg-[#6FBCF0]">
                  <img src={SUI} alt="" className="w-5 h-5" />
                </div>
                Sui Local
              </span>
            }
          />
          <StatusItem label="Network ID" value="22222" />
          <StatusItem label="RPC Server" value="Http://127.0.0.1:33333" />
        </div>
      </div>
    </nav>
  );
};

const StatusItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="text-gray-400 text-sm">
    <div>{label}</div>
    <div className="text-gray-100 font-medium">{value}</div>
  </div>
);

export default NavBar;
