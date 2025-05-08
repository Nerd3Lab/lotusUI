import { useActiveAccount } from '@/renderer/states/account/reducer';
import { formatAddress } from '@/renderer/utils/format';
import { Icon } from '@iconify/react';

const AccountActive = () => {
  const activeAccount = useActiveAccount();

  return (
    <div
      className={`fixed bottom-10 right-10 bg-[#0F0F10] border border-blue-500 rounded-lg p-4 w-96 transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <p className="text-white">
          {activeAccount?.alias || 'Active account '}
        </p>
        <div className="rounded-full p-1 px-3 bg-green-100 border border-green-200 text-green-700 text-xs font-medium">
          Active
        </div>
      </div>
      {activeAccount ? (
        <div className="bg-black text-white rounded-xl py-4 flex justify-between items-start w-full max-w-md">
          <div>
            <div className="text-sm font-semibold">
              {activeAccount.balance} SUI
            </div>
            <div className="text-sm text-gray-400">
              {activeAccount.balanceRaw} Mist
            </div>
          </div>
          <div className="text-left">
            <div className="text-sm text-gray-400">Address</div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">
                {formatAddress(activeAccount.address)}
              </span>
              <Icon
                icon="icon-park-outline:copy"
                className="w-4 h-4 text-gray-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black text-white rounded-xl py-4 flex justify-between items-start w-full max-w-md">
          <div className="text-center w-full text-gray-400">
            No active account selected
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountActive;
