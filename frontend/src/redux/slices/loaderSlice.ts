import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';
import _ from 'lodash';

interface LoaderState {
  show: boolean;
}

const initialState = { show: false } as LoaderState;

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: () => {
      return { show: true };
    },
    hideLoader: () => {
      return { show: false };
    }
  }
});

export const { showLoader, hideLoader } = loaderSlice.actions;

export const loaderSelector = (state: RootState) => _.get(state, 'loader.show', false);

export default loaderSlice.reducer;
