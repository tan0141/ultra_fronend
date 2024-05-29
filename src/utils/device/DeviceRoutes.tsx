import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ListDevice from '../../components/device/ListDevice';

const AgentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ListDevice />} />
    </Routes>
  );
};

export default AgentRoutes;
