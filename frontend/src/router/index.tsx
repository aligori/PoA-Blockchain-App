import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import LoginPage from '@/pages/auth/LoginPage';
import GuestRoute from './GuestRoute';
import AuthRoute from './AuthRoute';
import HomePage from '@/pages/HomePage';
import ProposalPage from '@/pages/ProposalPage';
import MyProposalsPage from '@/pages/MyProposalsPage';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/proposals/:id" element={<ProposalPage />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/my-proposals" element={<MyProposalsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
