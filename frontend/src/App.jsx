import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import PostRequirementModal from './components/PostRequirementModal';
import SubmitProposalModal from './components/SubmitProposalModal';

// Pages
import HomePage from './pages/HomePage';
import AgenciesPage from './pages/AgenciesPage';
import AgencyDetailPage from './pages/AgencyDetailPage';
import MarketplacePage from './pages/MarketplacePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import BusinessDashboard from './pages/BusinessDashboard';
import AgencyDashboard from './pages/AgencyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MessagesPage from './pages/MessagesPage';

// Seed data
import { INITIAL_REQUIREMENTS, INITIAL_PROPOSALS } from './services/mockData';

function App() {
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [proposals, setProposals] = useState(INITIAL_PROPOSALS);

  // Modal states
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedRfpForProposal, setSelectedRfpForProposal] = useState(null);

  const handleCreateRequirement = (newReq) => {
    setRequirements((prev) => [newReq, ...prev]);
  };

  const handleProposalSubmitted = (newProposal) => {
    setProposals((prev) => [newProposal, ...prev]);
    // increment proposals count on RFP
    setRequirements((prev) =>
      prev.map((r) =>
        r.id === newProposal.rfpId ? { ...r, proposalsCount: (r.proposalsCount || 0) + 1 } : r
      )
    );
  };

  const handleAcceptProposal = (proposalId) => {
    setProposals((prev) =>
      prev.map((p) => (p.id === proposalId ? { ...p, status: 'ACCEPTED' } : p))
    );
  };

  return (
    <div className="app-container">
      <Navbar onOpenPostModal={() => setIsPostModalOpen(true)} />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<HomePage onOpenPostModal={() => setIsPostModalOpen(true)} />}
          />
          <Route
            path="/agencies"
            element={<AgenciesPage onOpenPostModal={() => setIsPostModalOpen(true)} />}
          />
          <Route
            path="/agencies/:id"
            element={<AgencyDetailPage onOpenPostModal={() => setIsPostModalOpen(true)} />}
          />
          <Route
            path="/marketplace"
            element={
              <MarketplacePage
                requirements={requirements}
                onOpenPostModal={() => setIsPostModalOpen(true)}
                onOpenSubmitProposal={(rfp) => setSelectedRfpForProposal(rfp)}
              />
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/business"
            element={
              <ProtectedRoute allowedRoles={['BUSINESS', 'ADMIN']}>
                <BusinessDashboard
                  requirements={requirements}
                  proposals={proposals}
                  onOpenPostModal={() => setIsPostModalOpen(true)}
                  onAcceptProposal={handleAcceptProposal}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/agency"
            element={
              <ProtectedRoute allowedRoles={['AGENCY', 'ADMIN']}>
                <AgencyDashboard
                  requirements={requirements}
                  proposals={proposals}
                  onOpenSubmitProposal={(rfp) => setSelectedRfpForProposal(rfp)}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Modals */}
      <PostRequirementModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onRequirementCreated={handleCreateRequirement}
      />

      <SubmitProposalModal
        isOpen={!!selectedRfpForProposal}
        onClose={() => setSelectedRfpForProposal(null)}
        rfp={selectedRfpForProposal}
        onProposalSubmitted={handleProposalSubmitted}
      />
    </div>
  );
}

export default App;
