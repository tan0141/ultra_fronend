import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AgentList from '../../../components/user/Agent/AgentList';
import EditAgent from '../../../components/user/Agent/EditAgent';
import AddAgent from '../../../components/user/Agent/AddAgent';

const AgentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AgentList />} />
      <Route path="editAgent/:id" element={<EditAgent />} />
	    <Route path="add" element={<AddAgent />} />
    </Routes>
  );
};

export default AgentRoutes;
