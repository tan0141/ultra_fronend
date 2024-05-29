import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from './components/SignIn';
import { AuthProvider } from './utils/auth/authContext';
import ProtectedRoute from './utils/auth/ProtectRouter';
import Dashboard from './components/MainLayouts';

const App: React.FC = () => {
  return(
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard/*' element={<Dashboard/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
