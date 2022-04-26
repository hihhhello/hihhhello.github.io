import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const UsersPage = lazy(() => import('./users'));
const UserDetailsPage = lazy(() => import('./user-details'));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<UsersPage />} />
      <Route path="/:login" element={<UserDetailsPage />} />
    </Routes>
  );
};
