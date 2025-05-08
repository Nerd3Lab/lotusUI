import Button from '@/renderer/components/utility/Button';
import CopyText from '@/renderer/components/utility/CopyText';
import COIN_SWAP from '@asset/icons/coin-swap.svg';
import KEY from '@asset/icons/key.svg';
import Avatar from '@asset/img/avatar.png';
import { Icon } from '@iconify/react';
import MnemonicDisplay from '../components/dashboard/account/MnemonicDisplay';
import { formatAddress, formatBalanceFromRaw } from '../utils';
import Breadcrumb from '@/renderer/components/dashboard/Breadcrumb';
import { useEffect, useState } from 'react';
import { AddressType, CreateAccountResult } from '@/main/types/index';
import { useSuiClient } from '@mysten/dapp-kit';
import {
  RefreshSlide,
  useRefreshState,
} from '@/renderer/states/refresh/reducer';
import AddAccountModal from '@/renderer/components/Modal/AddAccountModal';
import { swalFire } from '@/renderer/utils/swalfire';
import Swal from 'sweetalert2';
import AddAccountResultModal from '@/renderer/components/Modal/AddAccountResultModal';
import Pagination from '@/renderer/components/utility/Pagination';
import { useProjectState } from '@/renderer/states/project/reducer';
import Switch from '@/renderer/components/utility/Switch';
import {
  AccountItemState,
  useAccountState,
} from '@/renderer/states/account/reducer';
import { useAppDispatch } from '@/renderer/states/hooks';

const AccountItem = ({ account }: { account: AccountItemState }) => {
  const dispatch = useAppDispatch();
  const project = useProjectState();

  const setActiveAccount = async () => {
    if (account.isActive) {
      return;
    }

    try {
      await window.electron.account.setActiveAccount(account.address);
      swalFire().success(`Set active account to ${account.alias} done!`);
      dispatch(RefreshSlide.actions.increaseRefresh());
    } catch (error) {
      swalFire().error('Failed to set active account');
    }
  };

  const requestFaucet = async () => {
    if (!project.checkpointDone) {
      swalFire().warn('Please wait for checkpoint done');
      return;
    }

    swalFire().loading('Requesting faucet...');
    const result = await window.electron.account.requestFaucet(account.address);
    if (result) {
      setTimeout(() => {
        Swal.close();
        swalFire().success(`Request faucet for ${account.alias} done!`);
        dispatch(RefreshSlide.actions.increaseRefresh());
      }, 1000);
    } else {
      Swal.close();
      swalFire().error('Request faucet failed!');
    }
  };

  const deleteAccount = async () => {
    // if (account.isActive) {
    //   swalFire().warn('Cannot delete active account!');
    //   return;
    // }

    const check = await swalFire().question(
      `Are you sure you want to delete account ${account.alias}?`,
    );

    if (!check || !check.isConfirmed) {
      return;
    }

    const result = await window.electron.account.deleteAccount(account.address);
    if (result) {
      swalFire().success(`Delete account ${account.alias} done!`);
      dispatch(RefreshSlide.actions.increaseRefresh());
    } else {
      swalFire().error('Delete account failed!');
    }
  };

  return (
    <tr
      className={`border-b border-gray-200 py-4 ${account.isActive ? 'bg-cyan-50' : ''}`}
      key={account.address}
    >
      <td className="text-left py-1 flex items-center gap-2">
        <img src={Avatar} className="w-6 h-6 rounded-full" />
        <CopyText value={account.alias} />
        <span>{account.alias}</span>
      </td>
      <td className="text-left py-1 gap-2 w-[20rem]">
        <div className="flex items-center">
          <CopyText value={account.address} />
          <span className="text-sm"> {formatAddress(account.address)}</span>
        </div>
      </td>
      <td className="text-center flex items-center justify-start py-1">
        <Switch value={account.isActive} onChange={setActiveAccount} />
      </td>
      <td className="text-left py-1">
        <div className="flex items-center gap-2">
          <div
            onClick={requestFaucet}
            className="px-1 py-1 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 cursor-pointer"
          >
            <Icon icon="icons8:plus" className="w-5 h-5" />
          </div>
          <div>
            <b>{account.balance} SUI</b>
            <p>{account.balanceRaw}</p>
          </div>
        </div>
      </td>
      <td className="text-center flex items-center gap-2 py-1">
        <div onClick={deleteAccount}>
          <Icon
            icon={'material-symbols:delete'}
            className="text-red-400 text-2xl cursor-pointer hover:text-red-300"
          />
        </div>
      </td>
    </tr>
  );
};

function DashboardAccountPage() {
  const dispatch = useAppDispatch();
  const addresses = useAccountState().lists;

  const [showModal, setShowModal] = useState(false);

  const onCloseModal = async () => {
    dispatch(RefreshSlide.actions.increaseRefresh());

    setShowModal(false);
  };

  const [isOpenResult, setIsOpenResult] = useState(false);
  const [createResult, setCreateResult] = useState<
    CreateAccountResult | undefined
  >();

  const openResultAccount = (result: CreateAccountResult) => {
    onCloseModal();
    setCreateResult(result);
    setIsOpenResult(true);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(addresses.length / itemsPerPage);

  const paginatedAddresses = addresses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="mx-8">
      <Breadcrumb label="Accounts" />
      <div className="mt-3 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-900">Accounts</div>
        <Button
          className="flex gap-1 items-center"
          onClick={() => setShowModal(true)}
        >
          <Icon icon="material-symbols:circle-outline" className="w-5 h-5" />
          <span>Add Account</span>
        </Button>
      </div>

      {/* <MnemonicDisplay /> */}
      <div className="h-[55vh] overflow-y-auto">
        <table className="w-full mt-4 bg-white px-2">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                ALIAS
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                ADDRESS
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                ACTIVE STATUS
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                BALANCE
              </th>
              <th className="text-left py-3 font-semibold text-gray-500 text-xs">
                ACTION
              </th>
              {/* <th className="text-left py-3"></th> */}
            </tr>
          </thead>

          <tbody className="">
            {paginatedAddresses.map((a) => (
              <AccountItem account={a} key={a.address} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <AddAccountModal
        isOpen={showModal}
        onClose={onCloseModal}
        openResultAccount={openResultAccount}
      />

      <AddAccountResultModal
        isOpen={isOpenResult}
        onClose={() => {
          setIsOpenResult(false);
          setCreateResult(undefined);
        }}
        result={createResult}
      />
    </div>
  );
}

export default DashboardAccountPage;
