import { WalletName } from './enums';

export interface WalletState {
  name: WalletName;
  installed: boolean;
}

export interface ConnectStatus {
  connectedWallet: WalletName | null;
  address: string;
}

export interface WalletInfo {
  name: WalletName;
  logo: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  downloadUrl: string;
}

export interface Wallet {
  initDapi(): Promise<void>;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  transactionExample(): Promise<void>;
}
