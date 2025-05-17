import { useActiveAccount } from '@/renderer/states/account/reducer';
import { useAppDispatch } from '@/renderer/states/hooks';
import { useProjectState } from '@/renderer/states/project/reducer';
import { RefreshSlide } from '@/renderer/states/refresh/reducer';
import { formatAddress } from '@/renderer/utils/format';
import { swalFire } from '@/renderer/utils/swalfire';
import { Icon } from '@iconify/react';

const AccountActive = () => {
  const activeAccount = useActiveAccount();

  const network = useProjectState().network;

  const isLocalNetwork = network === 'localnet';

  const dispatch = useAppDispatch();

  const handleForceLocalNetwork = async () => {
    swalFire().loading('Changing network to localnet...');
    const result = await window.electron.node.forceLocalNetwork();
    if (result.isSuccess) {
      swalFire().success('Network forced to localnet');
    } else {
      swalFire().error(result.error);
    }

    dispatch(RefreshSlide.actions.increaseRefresh());
  };

  return (
    <div
      className={`fixed bottom-10 right-10 bg-[#0F0F10] border border-blue-500 rounded-lg p-4 w-auto transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <p className="text-white">
          {activeAccount?.alias || 'Active account '}
        </p>
        <div className="flex items-center gap-2">
          {/* <div className="ml-2 rounded-full p-1 px-3 bg-green-100 border border-green-200 text-green-700 text-xs font-medium">
            Active
          </div> */}

          {!isLocalNetwork && (
            <div
              className="ml-2 relative rounded-full p-1 px-3 bg-yellow-500 hover:bg-yellow-600 text-sm font-medium text-white cursor-pointer"
              onClick={handleForceLocalNetwork}
            >
              <div className="absolute top-0 left-0 w-full h-full bg-cyan-200 rounded-full animate-ping"></div>
              Change to localnet
            </div>
          )}
        </div>
      </div>
      {activeAccount ? (
        <div className="bg-black text-white rounded-xl py-4 flex gap-6 justify-between items-start w-full max-w-md">
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

          <div className="text-left">
            <div className="text-sm text-gray-400">Network</div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">{network}</span>
              {isLocalNetwork ? (
                <Icon
                  icon="lets-icons:check-fill"
                  className="w-4 h-4 text-green-400 cursor-pointer"
                />
              ) : (
                <Icon
                  icon="healthicons:no-24px"
                  className="w-4 h-4 text-red-400 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-black text-white rounded-xl py-4 flex gap-4 justify-between items-start w-full max-w-md">
          <div className="text-center w-full text-white">
            No active account selected
          </div>

          <div className="text-left">
            <div className="text-sm text-gray-400">Network</div>
            <div className="flex items-center gap-1">
              <span className="font-mono text-sm">{network}</span>
              {isLocalNetwork ? (
                <Icon
                  icon="lets-icons:check-fill"
                  className="w-4 h-4 text-green-400 cursor-pointer"
                />
              ) : (
                <Icon
                  icon="healthicons:no-24px"
                  className="w-4 h-4 text-red-400 cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountActive;
