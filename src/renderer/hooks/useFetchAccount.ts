import { NodeRunLogInterface } from '@/main/types/index';
import {
  AccountItemState,
  AccountSlide,
} from '@/renderer/states/account/reducer';
import { useAppDispatch } from '@/renderer/states/hooks';
import { ProjectSlide } from '@/renderer/states/project/reducer';
import { useRefreshState } from '@/renderer/states/refresh/reducer';
import { formatBalanceFromRaw } from '@/renderer/utils/format';
import { useSuiClient } from '@mysten/dapp-kit';
import { useEffect } from 'react';

export const useFetchAccount = () => {
  const dispatch = useAppDispatch();
  const refresh = useRefreshState();
  const client = useSuiClient();

  const fetchBalance = async (address: string) => {
    try {
      const ba = await client.getAllBalances({ owner: address });
      const suiBalance = ba.find((b) => b.coinType === '0x2::sui::SUI');
      if (suiBalance) {
        return {
          balance: formatBalanceFromRaw(suiBalance.totalBalance),
          balanceRaw: suiBalance.totalBalance,
        };
      }
    } catch (error) {}
  };

  useEffect(() => {
    const fetching = async () => {
      const result: AccountItemState[] = [];
      const accounts = await window.electron.account.getAccounts();

      if (accounts) {
        for (const account of accounts) {
          const balanceGet = await fetchBalance(account.address);

          const balance = balanceGet?.balance || '0';
          const balanceRaw = balanceGet?.balanceRaw || '0';

          result.push({
            ...account,
            balance,
            balanceRaw,
          });
        }

        console.log({ result });
        dispatch(AccountSlide.actions.setAccount(result));
      }
    };

    fetching();
  }, [refresh]);
};
