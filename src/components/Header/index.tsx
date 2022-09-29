import { FC } from 'react';
import Wallet from 'components/Wallet';

export const Header: FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between ">
        <div>Aptos</div>
        <Wallet />
      </div>
    </div>
  );
};
