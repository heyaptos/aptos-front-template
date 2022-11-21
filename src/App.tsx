import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { initWallets } from 'utils/wallets';
import { Index } from './pages/index';

export const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    initWallets();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
