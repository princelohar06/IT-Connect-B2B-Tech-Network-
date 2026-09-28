import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  DollarSign, 
  Check, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Search,
  Activity,
  Layers
} from 'lucide-react';
import { INITIAL_AGENCIES } from '../services/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const toast = useToast();

  const [verificationQueue, setVerificationQueue] = useState([
    {
      id: 'vq-1',
      agencyName: 'AuraCloud Systems',
      category: 'Cloud Architecture & Kubernetes',
      country: 'Germany',
      taxId: 'DE-92837492',
      teamSize: '32 Engineers',
      githubOrg: 'auracloud-systems',
      status: 'PENDING_REVIEW',
    },
    {
      id: 'vq-2',
      agencyName: 'Krypton Cyber Security Lab',
      category: 'Offensive Security & Pen-Testing',
      country: 'United States',
      taxId: 'US-EIN-8839201',
      teamSize: '18 Certified Analysts',
      githubOrg: 'krypton-sec',
      status: 'PENDING_REVIEW',
    },
  ]);

  const handleApprove = (id, agencyName) => {
    setVerificationQueue(verificationQueue.filter((v) => v.id !== id));
    toast.success(`Approved ${agencyName} as a Verified ITConnect Partner Agency!`);
  };

  const handleReject = (id, agencyName) => {
    setVerificationQueue(verificationQueue.filter((v) => v.id !== id));
    toast.error(`Rejected verification request for ${agencyName}.`);
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span className="badge badge-emerald">Master Platform Governance</span>
        </div>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800' }}>Platform Administration Console</h1>
        <p style={{ margin: 0 }}>
          Manage agency vetting audits, user accounts, dispute resolutions, and system escrow metrics.
        </p>
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2.5rem',
      }}>
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Platform GMV</span>
            <DollarSign size={20} color="#34d399" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#34d399' }}>$28,450,000</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>+18.4% this month</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Verified Agencies</span>
            <Building2 size={20} color="#06b6d4" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>890</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>{verificationQueue.length} Pending Audit</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>Business Clients</span>
            <Users size={20} color="#818cf8" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-light)' }}>3,250</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Active Enterprise accounts</div>
        </div>

        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>System Health</span>
            <Activity size={20} color="#10b981" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>99.98%</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>All services operational</div>
        </div>
      </div>

      {/* Agency Verification Approval Queue */}
      <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '700' }}>
              Pending IT Agency Verifications ({verificationQueue.length})
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Evaluate incoming agency applications before granting verified marketplace partner status.
            </p>
          </div>
        </div>

        {verificationQueue.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            <CheckCircle2 size={36} color="#34d399" style={{ margin: '0 auto 10px' }} />
            <div>All pending agency applications have been audited and resolved.</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {verificationQueue.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '1.25rem',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#fff' }}>{item.agencyName}</h4>
                    <span className="badge badge-indigo">{item.category}</span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)', display: 'flex', gap: '14px' }}>
                    <span>📍 {item.country}</span>
                    <span>🏢 Tax ID: {item.taxId}</span>
                    <span>👥 {item.teamSize}</span>
                    <span>💻 GitHub: {item.githubOrg}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleReject(item.id, item.agencyName)}
                    className="btn btn-secondary btn-sm"
                    style={{ color: '#fb7185' }}
                  >
                    <X size={15} /> Reject
                  </button>
                  <button
                    onClick={() => handleApprove(item.id, item.agencyName)}
                    className="btn btn-emerald btn-sm"
                  >
                    <Check size={15} /> Approve & Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Verified Agencies Registry */}
      <div className="glass-card" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '1.25rem' }}>
          Registered Partner Agencies Directory
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {INITIAL_AGENCIES.map((a) => (
            <div
              key={a.id}
              style={{
                padding: '1rem 1.25rem',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontWeight: '700', color: '#fff', fontSize: '0.95rem' }}>{a.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{a.completedProjects} Delivered Projects • {a.rating} ★</div>
              </div>
              <span className="badge badge-emerald">Verified</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
