import { WalletName } from 'utils/enums';
import { Wallet } from 'utils/models';

const WalletModules = {
  [WalletName.Martian]: () => import('./martian'),
  [WalletName.Petra]: () => import('./petra'),
};

const initWallets = (): void => {
  Object.values(WalletName).forEach(async (name: WalletName) => {
    WalletModules[name]().then(res => {
      res.wallet.initDapi();
    });
  });
};

const getWalletApi = async (walletName: WalletName): Promise<Wallet> => {
  const walletApi = await WalletModules[walletName]();
  return walletApi.wallet;
};

export { initWallets, getWalletApi };
