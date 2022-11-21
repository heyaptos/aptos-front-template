import { store } from 'store';
import { updateConnectStatus, updateWalletState } from 'store/features/walletStatesSlice';
import { WalletName } from 'utils/enums';
import { Wallet } from 'utils/models';

declare const window: globalThis.Window & {
  martian: any;
};

const initDapi = async (): Promise<void> => {
  if (window.martian === undefined) {
    return;
  }
  store.dispatch(
    updateWalletState({
      name: WalletName.Martian,
      installed: true,
    }),
  );
  if (localStorage.getItem('LAST_CONNECTED_WALLET_NAME') === WalletName.Martian) {
    connect();
  }
  window.martian.onAccountChange((address: string) =>
    store.dispatch(
      updateConnectStatus({
        connectedWallet: WalletName.Martian,
        address,
      }),
    ),
  );
};

async function connect(): Promise<void> {
  const response = await window.martian.connect();
  localStorage.setItem('LAST_CONNECTED_WALLET_NAME', WalletName.Martian);
  store.dispatch(
    updateConnectStatus({
      connectedWallet: WalletName.Martian,
      address: response.address,
    }),
  );
}

const disconnect = async (): Promise<void> => {
  await window.martian.disconnect();
  localStorage.removeItem('LAST_CONNECTED_WALLET_NAME');
  store.dispatch(updateConnectStatus({ connectedWallet: null, address: '' }));
};

const transactionExample = async (): Promise<void> => {
  const isConnected: boolean = await window.martian.isConnected();
  if (!isConnected) {
    return;
  }
  const account = await window.martian.account();
  const sender = account.address;
  const payload = {
    function: '',
    type_arguments: [],
    arguments: [],
  };

  const transaction = await window.martian.generateTransaction(sender, payload);
  return await window.martian.signAndSubmitTransaction(transaction);
};

export const wallet: Wallet = {
  initDapi,
  connect,
  disconnect,
  transactionExample,
};
