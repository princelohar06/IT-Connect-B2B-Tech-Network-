import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  Building2, 
  Briefcase, 
  DollarSign, 
  CheckCircle2, 
  Send, 
  TrendingUp, 
  Clock, 
  ArrowRight, 
  PlusCircle, 
  ShieldCheck,
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

const AgencyDashboard = ({ requirements = [], proposals = [], onOpenSubmitProposal }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('OPPORTUNITIES'); // OPPORTUNITIES, MY_BIDS, CONTRACTS

  const agencyProposals = proposals;
  const totalBidded = agencyProposals.reduce((acc, curr) => acc + curr.bidAmount, 0);

  return (
    <div className="page-wrapper">
      {/* Top Banner */}
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
            <span className="badge badge-cyan">IT Agency Partner Portal</span>
            <span className="badge badge-emerald">Verified Badge</span>
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800' }}>
            {user?.full_name || 'Synthetix AI Labs (Vendor Hub)'}
          </h1>
          <p style={{ margin: 0 }}>
            Discover high-budget enterprise RFPs, track your active bids, and deliver milestone deliverables.
          </p>
        </div>

        <Link to="/marketplace" className="btn btn-cyan btn-lg">
          <Briefcase size={18} /> Explore RFP Marketplace
        </Link>
      </div>

      {/* Agency KPI Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem',
      }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Active Proposals</span>
            <Send size={20} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>{agencyProposals.length}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '4px' }}>Submitted & Pending Review</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Pipeline Value</span>
            <DollarSign size={20} color="#34d399" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399' }}>${totalBidded.toLocaleString()}</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Total Active Bids</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Won Contracts</span>
            <Award size={20} color="#fbbf24" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#fbbf24' }}>12</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>99% On-time delivery</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Escrow Payouts</span>
            <ShieldCheck size={20} color="#818cf8" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-light)' }}>$142,500</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Processed this quarter</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        borderBottom: '1px solid var(--border-subtle)',
        marginBottom: '2rem',
        paddingBottom: '0.5rem',
      }}>
        <button
          onClick={() => setActiveTab('OPPORTUNITIES')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'OPPORTUNITIES' ? '2px solid #06b6d4' : '2px solid transparent',
            color: activeTab === 'OPPORTUNITIES' ? '#fff' : 'var(--text-secondary)',
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
          Recommended RFPs for Your Agency ({requirements.length})
        </button>

        <button
          onClick={() => setActiveTab('MY_BIDS')}
          style={{
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'MY_BIDS' ? '2px solid #6366f1' : '2px solid transparent',
            color: activeTab === 'MY_BIDS' ? '#fff' : 'var(--text-secondary)',
            fontWeight: '700',
            fontSize: '1rem',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Send size={18} />
          Submitted Proposals ({agencyProposals.length})
        </button>
      </div>

      {/* Tab 1: Marketplace Opportunities */}
      {activeTab === 'OPPORTUNITIES' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {requirements.map((req) => (
            <div key={req.id} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span className="badge badge-cyan">{req.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted by {req.postedBy}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{req.title}</h3>
                  <p style={{ fontSize: '0.875rem', maxWidth: '720px', marginTop: '6px' }}>{req.description}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#34d399' }}>
                    ${req.budgetMin?.toLocaleString()} - ${req.budgetMax?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{req.timeline}</div>
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
                  onClick={() => onOpenSubmitProposal(req)}
                  className="btn btn-cyan btn-sm"
                >
                  <Send size={14} /> Submit Bid Proposal
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Submitted Bids */}
      {activeTab === 'MY_BIDS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {agencyProposals.map((prop) => (
            <div key={prop.id} className="glass-card" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-indigo">Bid Reference: {prop.id}</span>
                    <span className="badge badge-amber">{prop.status}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Submitted {prop.submittedDate}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700' }}>{prop.rfpTitle}</h3>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#34d399' }}>
                    ${prop.bidAmount?.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{prop.deliveryWeeks} Weeks Delivery</div>
                </div>
              </div>

              <p style={{ fontSize: '0.875rem', fontStyle: 'italic', background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                "{prop.coverLetter}"
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {prop.milestones?.length || 3} Escrow Milestones defined
                </span>

                <Link to="/messages" className="btn btn-secondary btn-sm">
                  Open Client Chat
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgencyDashboard;
