import { store } from 'store';
import { updateConnectStatus, updateWalletState } from 'store/features/walletStatesSlice';
import { WalletName } from 'utils/enums';
import { Wallet } from 'utils/models';

declare const window: globalThis.Window & {
  aptos: any;
};

const initDapi = async (): Promise<void> => {
  if (window.aptos === undefined) {
    return;
  }
  store.dispatch(
    updateWalletState({
      name: WalletName.Petra,
      installed: true,
    }),
  );
  if (localStorage.getItem('LAST_CONNECTED_WALLET_NAME') === WalletName.Petra) {
    connect();
  }
  window.aptos.onAccountChange((address: string) =>
    store.dispatch(
      updateConnectStatus({
        connectedWallet: WalletName.Petra,
        address,
      }),
    ),
  );
};

async function connect(): Promise<void> {
  const response = await window.aptos.connect();
  localStorage.setItem('LAST_CONNECTED_WALLET_NAME', WalletName.Petra);
  store.dispatch(
    updateConnectStatus({
      connectedWallet: WalletName.Petra,
      address: response.address,
    }),
  );
}

const disconnect = async (): Promise<void> => {
  await window.aptos.disconnect();
  localStorage.removeItem('LAST_CONNECTED_WALLET_NAME');
  store.dispatch(updateConnectStatus({ connectedWallet: null, address: '' }));
};

const transactionExample = async (): Promise<void> => {
  const isConnected: boolean = await window.aptos.isConnected();
  if (!isConnected) {
    return;
  }
  const payload = {
    function: '',
    type_arguments: [],
    arguments: [],
  };

  return await window.aptos.signAndSubmitTransaction(payload);
};

export const wallet: Wallet = {
  initDapi,
  connect,
  disconnect,
  transactionExample,
};
