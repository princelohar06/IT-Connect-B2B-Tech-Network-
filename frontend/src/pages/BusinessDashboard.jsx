import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';
import { 
  PlusCircle, 
  Briefcase, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Check, 
  X, 
  MessageSquare,
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';

const BusinessDashboard = ({ requirements = [], proposals = [], onOpenPostModal, onAcceptProposal }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('RFPS'); // RFPS, PROPOSALS, CONTRACTS

  const handleAcceptBid = (prop) => {
    if (onAcceptProposal) {
      onAcceptProposal(prop.id);
    }
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    toast.success(`Accepted proposal from ${prop.agencyName}! Escrow milestone contract initiated.`);
  };

  const totalBudget = requirements.reduce((acc, curr) => acc + curr.budgetMax, 0);

  return (
    <div className="page-wrapper">
      {/* Dashboard Top Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2.5rem',
        flexWrap: 'wrap',
        gap: '1.5rem',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span className="badge badge-indigo">Enterprise Client Workspace</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800' }}>
            Welcome, {user?.full_name || 'Acme Global Ventures'}
          </h1>
          <p style={{ margin: 0 }}>
            Manage your project RFPs, compare technical agency proposals, and monitor milestone deliverables.
          </p>
        </div>

        <button onClick={onOpenPostModal} className="btn btn-primary btn-lg">
          <PlusCircle size={18} />
          Post New Requirement
        </button>
      </div>

      {/* KPI Stats Widgets */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem',
      }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Active RFPs</span>
            <Briefcase size={20} color="#818cf8" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>{requirements.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--primary-light)', marginTop: '4px' }}>Published on Marketplace</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Proposals Received</span>
            <FileText size={20} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{proposals.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Under Technical Review</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Allocated Budget</span>
            <DollarSign size={20} color="#34d399" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399' }}>${totalBudget.toLocaleString()}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Escrow Protected</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Active Contracts</span>
            <CheckCircle2 size={20} color="#f59e0b" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbf24' }}>
            {proposals.filter((p) => p.status === 'ACCEPTED').length || 1}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>In Progress</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '2rem',
        paddingBottom: '0.5rem',
      }}>
        <button
          onClick={() => setActiveTab('RFPS')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'RFPS' ? '2px solid #6366f1' : '2px solid transparent',
            color: activeTab === 'RFPS' ? '#fff' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '1rem',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Briefcase size={18} />
          My Posted Requirements ({requirements.length})
        </button>

        <button
          onClick={() => setActiveTab('PROPOSALS')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'PROPOSALS' ? '2px solid #06b6d4' : '2px solid transparent',
            color: activeTab === 'PROPOSALS' ? '#fff' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '1rem',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FileText size={18} />
          Agency Proposals & Bids ({proposals.length})
        </button>
      </div>

      {/* Tab: My Posted Requirements */}
      {activeTab === 'RFPS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {requirements.map((req) => (
            <div key={req.id} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-indigo">{req.category}</span>
                    <span className="badge badge-emerald">{req.status}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Created {req.createdDate}</span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '6px' }}>{req.title}</h3>
                  <p style={{ fontSize: '0.875rem', maxWidth: '750px', marginBottom: '1rem' }}>{req.description}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#34d399' }}>
                    ${req.budgetMin?.toLocaleString()} - ${req.budgetMax?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.timeline} Target</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {req.skills.map((s, idx) => (
                    <span key={idx} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                      {s}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveTab('PROPOSALS')}
                  className="btn btn-secondary btn-sm"
                >
                  View Received Bids ({req.proposalsCount || proposals.filter(p => p.rfpId === req.id).length})
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Received Agency Proposals */}
      {activeTab === 'PROPOSALS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {proposals.map((prop) => (
            <div key={prop.id} className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                  }}>
                    {prop.agencyLogo}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>{prop.agencyName}</h3>
                      <span className="badge badge-cyan">Verified Vendor</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Proposed for: <strong style={{ color: 'var(--text-primary)' }}>{prop.rfpTitle}</strong>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34d399' }}>
                    ${prop.bidAmount?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Estimated {prop.deliveryWeeks} Weeks Delivery
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.6',
              }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Proposal Pitch & Technical Strategy
                </div>
                "{prop.coverLetter}"
              </div>

              {/* Milestones Breakdown */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
                  Proposed Escrow Milestones:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                  {prop.milestones.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      style={{
                        padding: '10px 14px',
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#fff' }}>{m.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.duration}</div>
                      </div>
                      <span style={{ fontWeight: '700', color: '#34d399', fontSize: '0.9rem' }}>
                        ${m.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <Link to="/messages" className="btn btn-secondary btn-sm">
                  <MessageSquare size={15} /> Chat with Agency
                </Link>

                {prop.status === 'ACCEPTED' ? (
                  <span className="badge badge-emerald" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                    <CheckCircle2 size={16} /> Contract Active & Funded
                  </span>
                ) : (
                  <button
                    onClick={() => handleAcceptBid(prop)}
                    className="btn btn-emerald btn-sm"
                  >
                    <Check size={16} /> Accept Bid & Start Contract
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
