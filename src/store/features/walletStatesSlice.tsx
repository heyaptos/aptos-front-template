import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletName } from 'utils/enums';
import { ConnectStatus, WalletState } from 'utils/models';

export const walletStatesSlice = createSlice({
  name: 'walletStatesSlice',
  initialState: {
    connectedWallet: null as WalletName | null,
    address: '',
    [WalletName.Martian]: {
      name: WalletName.Martian,
      installed: false,
    } as WalletState,
    [WalletName.Petra]: {
      name: WalletName.Petra,
      installed: false,
    } as WalletState,
  },
  reducers: {
    updateWalletState: (state, action: PayloadAction<WalletState>) => {
      Object.assign(state[action.payload.name], action.payload);
    },
    updateConnectStatus: (state, action: PayloadAction<ConnectStatus>) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { updateWalletState, updateConnectStatus } = walletStatesSlice.actions;

export default walletStatesSlice.reducer;
