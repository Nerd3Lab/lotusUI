import { createSlice } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { revertAllRedux } from '@/renderer/states/action';
interface RefreshState {
  counter: number;
}

const initialState: RefreshState = {
  counter: 0,
};

export const RefreshSlide = createSlice({
  name: 'refresh',
  initialState,
  extraReducers: (builder) =>
    builder.addCase(revertAllRedux, () => initialState),
  reducers: {
    increaseRefresh: (state) => {
      state.counter++;
    },
  },
});

export const { increaseRefresh } = RefreshSlide.actions;
export default RefreshSlide.reducer;

export const useRefreshState = () =>
  useAppSelector((state) => state.refresh.counter);
