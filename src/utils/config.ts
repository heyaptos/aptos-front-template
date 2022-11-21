import { ReactComponent as MartianLogo } from 'assets/images/wallet/martian.svg';
import { ReactComponent as PetraLogo } from 'assets/images/wallet/petra.svg';
import { WalletName } from './enums';
import { WalletInfo } from './models';

export const NODE_URL = 'https://fullnode.devnet.aptoslabs.com/v1';

export const WALLET_INFOS: Record<WalletName, WalletInfo> = {
  [WalletName.Martian]: {
    name: WalletName.Martian,
    logo: MartianLogo,
    downloadUrl: 'https://www.martianwallet.xyz/',
  },
  [WalletName.Petra]: {
    name: WalletName.Petra,
    logo: PetraLogo,
    downloadUrl: 'https://petra.app/',
  },
};
