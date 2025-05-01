import Button from '@/renderer/components/utility/Button';
import CopyText from '@/renderer/components/utility/CopyText';
import COIN_SWAP from '@asset/icons/coin-swap.svg';
import KEY from '@asset/icons/key.svg';
import Avatar from '@asset/img/avatar.png';
import { Icon } from '@iconify/react';
import MnemonicDisplay from '../components/dashboard/account/MnemonicDisplay';
import { formatBalanceWei } from '../utils';

export interface Account {
  index: number;
  publicKey: string;
  balance: string;
}

export const accounts: Account[] = [
  {
    index: 0,
    publicKey: '0x12aB34cdEf5678901234567890AbCdEf00112233',
    balance: '1000000000000000000', // 1 ETH
  },
  {
    index: 1,
    publicKey: '0x98Bc65deFg901234567890abcdef678900112244',
    balance: '42000000000000000000', // 42 ETH
  },
  {
    index: 2,
    publicKey: '0xAbCdEf0123456789abcdef012345678900112255',
    balance: '300000000000000000', // 0.3 ETH
  },
  {
    index: 3,
    publicKey: '0x3456AbCdEf901234567890abcdef6789FF112266',
    balance: '0', // 0 ETH
  },
];

function AccountDashboardPage() {
  return (
    <div className="mx-8">
      <Breadcrumb />
      <div className="mt-3 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-900">Accounts</div>
        <Button className="flex gap-1 items-center">
          <Icon icon="material-symbols:circle-outline" className="w-5 h-5" />
          <span>Add Account</span>
        </Button>
      </div>

      <MnemonicDisplay />

      <table className="w-full mt-4 bg-white">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 font-semibold text-gray-500 text-xs">
              ADDRESS
            </th>
            <th className="text-left py-3 font-semibold text-gray-500 text-xs">
              Balance
            </th>
            <th className="text-left py-3 font-semibold text-gray-500 text-xs">
              TX COUNT
            </th>
            <th className="text-left py-3 font-semibold text-gray-500 text-xs">
              INDEX
            </th>
            <th className="text-left py-3"></th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr className="border-b border-gray-200 py-4" key={account.index}>
              <td className="text-left py-2 flex items-center gap-2">
                <img src={Avatar} className="w-10 h-10 rounded-full" />
                <span className="w-[23rem] break-all">{account.publicKey}</span>
                <CopyText value={account.publicKey} />
              </td>
              <td className="text-left">{formatBalanceWei(account.balance)}</td>
              <td className="text-left">0</td>
              <td className="text-left">{account.index}</td>
              <td className="text-left">
                <div className="flex gap-2 items-center">
                  <div className="p-2 cursor-pointer">
                    <img
                      src={COIN_SWAP}
                      alt="coin swap icon"
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="p-2 cursor-pointer">
                    <img src={KEY} alt="key icon" className="w-4 h-4" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const Breadcrumb = () => (
  <div className="flex gap-1 items-center">
    <div className="p-1">
      <Icon icon="lsicon:home-outline" className="w-5 h-5 text-gray-500" />
    </div>
    <div className="p-1">
      <Icon icon="line-md:chevron-right" className="w-4 h-4 text-gray-300" />
    </div>
    <div className="text-sm font-semibold text-gray-700">Accounts</div>
  </div>
);

export default AccountDashboardPage;
