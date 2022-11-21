import { FC, useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks';
import { getBalance } from 'utils/aptos-sdk';
import { WALLET_INFOS } from 'utils/config';
import { WalletName } from 'utils/enums';
import { getWalletApi } from 'utils/wallets';

export const Index: FC = () => {
  const walletStates = useAppSelector(state => state.walletStatesSlice);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const updateBalance = async () => {
      setBalance(await getBalance(walletStates.address, '0x1::aptos_coin::AptosCoin'));
    };
    if (walletStates.address !== '') {
      updateBalance();
    }
  }, [walletStates]);

  const connect = async (name: WalletName) => {
    if (!walletStates[name].installed) {
      window.open(WALLET_INFOS[name].downloadUrl);
      return;
    }
    try {
      const walletApi = await getWalletApi(name);
      await walletApi.connect();
    } catch (err: any) {
      console.log(err);
    }
  };

  const disconnect = async (name: WalletName | null) => {
    if (name === null) {
      return;
    }
    try {
      const walletApi = await getWalletApi(name);
      await walletApi.disconnect();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="mt-[100px] flex justify-center gap-[50px]">
        <button
          className="bg-black px-[20px] py-[10px] text-white"
          onClick={
            walletStates.address === ''
              ? () => connect(WalletName.Martian)
              : () => disconnect(WalletName.Martian)
          }
        >
          {walletStates.address === '' ? 'Connect Martian' : 'Disconnect'}
        </button>
        <button
          className="bg-black px-[20px] py-[10px] text-white"
          onClick={
            walletStates.address === ''
              ? () => connect(WalletName.Petra)
              : () => disconnect(WalletName.Petra)
          }
        >
          {walletStates.address === '' ? 'Connect Petra' : 'Disconnect'}
        </button>
      </div>
      {walletStates.address === '' ? null : (
        <div className="mt-[50px] text-center">Connected Address: {walletStates.address}</div>
      )}
      {walletStates.address === '' ? null : (
        <div className="mt-[50px] text-center">Balance: {balance}</div>
      )}
    </div>
  );
};
