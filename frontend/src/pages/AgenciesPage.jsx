import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldCheck, Star, MapPin, Users, DollarSign, ArrowRight } from 'lucide-react';
import { INITIAL_AGENCIES } from '../services/mockData';

const AgenciesPage = ({ onOpenPostModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('ALL');
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const allSkills = ['ALL', 'AWS', 'Kubernetes', 'Python', 'React.js', 'FastAPI', 'SOC2 Prep', 'TypeScript'];

  const filteredAgencies = INITIAL_AGENCIES.filter((agency) => {
    const matchesSearch =
      agency.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agency.skills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSkill = selectedSkill === 'ALL' || agency.skills.includes(selectedSkill);
    const matchesVerified = !verifiedOnly || agency.verified;

    return matchesSearch && matchesSkill && matchesVerified;
  });

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Verified Partner Network</span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '0.5rem', marginBottom: '0.75rem' }}>
          Explore Pre-Vetted IT Agencies
        </h1>
        <p style={{ maxWidth: '650px', margin: 0 }}>
          Directly partner with world-class engineering squads, cloud architects, and machine learning specialists.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '1rem', alignItems: 'center' }}>
          {/* Search Box */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="form-control"
              placeholder="Search by agency name, keywords, or tech stack (e.g. Kubernetes, LLM)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '40px' }}
            />
          </div>

          {/* Skill Tag Filter */}
          <div>
            <select
              className="form-control"
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
            >
              {allSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill === 'ALL' ? 'All Tech Stacks' : skill}
                </option>
              ))}
            </select>
          </div>

          {/* Verified Toggle */}
          <button
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className={`btn ${verifiedOnly ? 'btn-primary' : 'btn-secondary'}`}
            style={{ height: '44px' }}
          >
            <ShieldCheck size={16} />
            <span>Verified Only</span>
          </button>
        </div>
      </div>

      {/* Results Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.75rem' }}>
        {filteredAgencies.map((agency) => (
          <div
            key={agency.id}
            className="glass-card"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-medium)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.6rem',
                    flexShrink: 0,
                  }}>
                    {agency.logo}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '2px' }}>
                      {agency.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <MapPin size={13} />
                      <span>{agency.location}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>
                  <Star size={14} color="#f59e0b" fill="#f59e0b" />
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fbbf24' }}>{agency.rating}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({agency.reviewsCount})</span>
                </div>
              </div>

              {/* Tagline & Description */}
              <div style={{ fontWeight: '600', color: 'var(--primary-light)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {agency.tagline}
              </div>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                {agency.description}
              </p>

              {/* Metrics Box */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '8px',
                padding: '12px',
                background: 'rgba(0, 0, 0, 0.25)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '1.25rem',
                textAlign: 'center',
              }}>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Hourly Rate</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', marginTop: '2px' }}>{agency.hourlyRate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Team Size</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#fff', marginTop: '2px' }}>{agency.teamSize}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Completed</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#34d399', marginTop: '2px' }}>{agency.completedProjects} Projects</div>
                </div>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                {agency.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Link
                to={`/agencies/${agency.id}`}
                className="btn btn-secondary"
              >
                View Profile
              </Link>
              <button
                onClick={onOpenPostModal}
                className="btn btn-primary"
              >
                Invite to RFP
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgenciesPage;
