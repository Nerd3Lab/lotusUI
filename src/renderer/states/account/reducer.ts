import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { revertAllRedux } from '@/renderer/states/action';
import { AddressType } from '@/main/types/index';

export interface AccountItemState extends AddressType {
  balance: string;
  balanceRaw: string;
}

interface AccountState {
  lists: AccountItemState[];
}

const initialState: AccountState = {
  lists: [],
};

export const AccountSlide = createSlice({
  name: 'account',
  initialState,
  extraReducers: (builder) =>
    builder.addCase(revertAllRedux, () => initialState),
  reducers: {
    setAccount: (state, action) => {
      state.lists = action.payload;
    },
  },
});

export const { setAccount } = AccountSlide.actions;
export default AccountSlide.reducer;

export const useAccountState = () => useAppSelector((state) => state.account);

export const useActiveAccount = () => {
  const accounts = useAccountState();
  return accounts.lists.find((account) => account.isActive);
};