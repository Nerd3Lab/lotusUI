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
import { AddressType } from '@/main/types/index';
import { useSuiClient } from '@mysten/dapp-kit';
import { useRefresh } from '@/renderer/hooks/useRefresh';
import { useRefreshState } from '@/renderer/states/refresh/reducer';

export interface Account {
  index: number;
  publicKey: string;
  balance: string;
}

function DashboardAccountPage() {
  const [addresses, setAddresses] = useState<AddressType[]>([]);

  const fetching = async () => {
    const result = await window.electron.account.getAccounts();

    console.log({ result });

    if (result) {
      setAddresses(result);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  const AccountItem = ({ account }: { account: AddressType }) => {
    const client = useSuiClient();
    const [balanceRaw, setBalanceRaw] = useState<string>('0');
    const [balance, setBalance] = useState<string>('0');
    const refresh = useRefreshState();
    const fetchBalance = async () => {
      try {
        const ba = await client.getAllBalances({ owner: account.address });
        const suiBalance = ba.find((b) => b.coinType === '0x2::sui::SUI');
        if (suiBalance) {
          setBalanceRaw(suiBalance.totalBalance);
          setBalance(formatBalanceFromRaw(suiBalance.totalBalance));
        }
      } catch (error) {}
    };

    useEffect(() => {
      fetchBalance();
    }, [refresh]);

    return (
      <tr
        className={`border-b border-gray-200 py-4 ${account.isActive ? 'bg-gray-100' : ''}`}
        key={account.address}
      >
        <td className="text-left py-2 flex items-center gap-2">
          <img src={Avatar} className="w-6 h-6 rounded-full" />
          <CopyText value={account.alias} />
          <span>{account.alias}</span>
        </td>
        <td className="text-left py-2 gap-2 w-[20rem]">
          <div className="flex items-center">
            <CopyText value={account.address} />
            <span className="text-sm"> {formatAddress(account.address)}</span>
          </div>
        </td>
        <td className="text-center flex items-center justify-start py-2">
          {account.isActive ? (
            <div className="px-2 py-1 rounded-full bg-emerald-500 text-white">
              ACTIVE
            </div>
          ) : (
            <span className="text-gray-500"></span>
          )}
        </td>
        <td className="text-left py-2">
          <b>{balance} SUI</b>
          <p>{balanceRaw}</p>
        </td>
        <td className="text-center flex items-center gap-2 justify-start py-2">
          <div className="px-2 py-1 rounded-full bg-purple-500 hover:bg-purple-600 cursor-pointer text-white">
            + Faucet
          </div>
          {!account.isActive ? (
            <div className="px-2 py-1 rounded-full bg-cyan-500 hover:bg-cyan-600 cursor-pointer text-white">
              SET AS ACTIVE
            </div>
          ) : (
            <span className="text-gray-500"></span>
          )}
        </td>
      </tr>
    );
  };

  return (
    <div className="mx-8">
      <Breadcrumb label="Accounts" />
      <div className="mt-3 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-900">Accounts</div>
        <Button className="flex gap-1 items-center">
          <Icon icon="material-symbols:circle-outline" className="w-5 h-5" />
          <span>Add Account</span>
        </Button>
      </div>

      {/* <MnemonicDisplay /> */}

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
          {addresses.map((a) => (
            <AccountItem account={a} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DashboardAccountPage;
