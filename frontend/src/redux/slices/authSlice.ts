import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface AuthState {
  account: string | undefined;
}

const initialState = {} as AuthState;

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<string>) => {
      console.log('Adding account in redux', action.payload)
      state.account = action.payload;
    },
    removeAccount: (state) => {
      state.account = undefined;
    }
  }
});

export const { addAccount, removeAccount } = authSlice.actions;

export const accountSelector = (state: RootState) => state.auth.account;

export default authSlice.reducer;
