import React, { useState } from 'react';
import { Search, Briefcase, DollarSign, Clock, Tag, ArrowRight, PlusCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const MarketplacePage = ({ requirements = [], onOpenPostModal, onOpenSubmitProposal }) => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'AI / Machine Learning', 'Cloud & DevOps', 'Full-Stack Web', 'Cybersecurity', 'Mobile Applications'];

  const filteredRequirements = requirements.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCat = selectedCategory === 'ALL' || req.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Open Market RFPs</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
            Enterprise Project Marketplace
          </h1>
          <p style={{ maxWidth: '650px', margin: 0 }}>
            Verified businesses looking for specialized engineering teams. Submit structured milestone proposals.
          </p>
        </div>

        {(!user || user.role === 'BUSINESS') && (
          <button onClick={onOpenPostModal} className="btn btn-primary btn-lg">
            <PlusCircle size={18} /> Post an RFP
          </button>
        )}
      </div>

      {/* Filter Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search by keywords, required frameworks, or project scope..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>

          <div>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'ALL' ? 'All Technical Categories' : c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Requirements List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {filteredRequirements.map((req) => (
          <div
            key={req.id}
            className="glass-card"
            style={{ padding: '2rem' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <span className="badge badge-indigo">{req.category}</span>
                  <span className="badge badge-emerald">Active RFP</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Posted {req.createdDate}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                  {req.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  By <strong style={{ color: 'var(--text-secondary)' }}>{req.postedBy}</strong> • {req.proposalsCount} Proposals Received
                </div>
              </div>

              {/* Budget Badge */}
              <div style={{ textAlign: 'right', background: 'rgba(0,0,0,0.3)', padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Estimated Budget</div>
                <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#34d399' }}>
                  ${req.budgetMin?.toLocaleString()} - ${req.budgetMax?.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary-light)' }}>{req.budgetType}</div>
              </div>
            </div>

            <p style={{ fontSize: '0.925rem', lineHeight: '1.6', marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
              {req.description}
            </p>

            {/* Deliverables Preview */}
            {req.deliverables && req.deliverables.length > 0 && (
              <div style={{
                background: 'rgba(255, 255, 255, 0.02)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                marginBottom: '1.25rem',
                border: '1px solid var(--border-subtle)',
              }}>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Core Deliverables
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '6px' }}>
                  {req.deliverables.map((del, dIdx) => (
                    <li key={dIdx} style={{ fontSize: '0.825rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#06b6d4' }}>•</span> {del}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Footer row: Skills & Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {req.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onOpenSubmitProposal(req)}
                  className="btn btn-cyan"
                >
                  Submit Agency Proposal <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
