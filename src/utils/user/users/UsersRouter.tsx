import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from '../../../components/user/User/UserList';
import EditUser from '../../../components/user/User/EditUser'


const UsersRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path=":id" element={<EditUser />} />
    </Routes>
  );
};

export default UsersRoutes;
