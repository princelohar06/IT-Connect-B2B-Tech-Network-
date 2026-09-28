import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Star, 
  MapPin, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  ArrowLeft, 
  MessageSquare, 
  Briefcase, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { INITIAL_AGENCIES } from '../services/mockData';

const AgencyDetailPage = ({ onOpenPostModal }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const agency = INITIAL_AGENCIES.find((a) => a.id === id) || INITIAL_AGENCIES[0];

  return (
    <div className="page-wrapper">
      {/* Back Button */}
      <Link
        to="/agencies"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '0.875rem',
          marginBottom: '1.5rem',
        }}
      >
        <ArrowLeft size={16} /> Back to Agencies
      </Link>

      {/* Agency Header Banner */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{
              width: '74px',
              height: '74px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2))',
              border: '1px solid var(--border-medium)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
            }}>
              {agency.logo}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>{agency.name}</h1>
                <span className="badge badge-emerald">Verified Agency</span>
              </div>
              <p style={{ fontSize: '1rem', color: 'var(--primary-light)', fontWeight: '600', marginBottom: '6px' }}>
                {agency.tagline}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {agency.location}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={14} /> {agency.teamSize}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                  <Star size={14} fill="#f59e0b" color="#f59e0b" /> {agency.rating} ({agency.reviewsCount} reviews)
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <Link to="/messages" className="btn btn-secondary">
              <MessageSquare size={16} /> Direct Message
            </Link>
            <button onClick={onOpenPostModal} className="btn btn-primary">
              <Briefcase size={16} /> Post RFP to Agency
            </button>
          </div>
        </div>
      </div>

      {/* Main Agency Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left Column: Overview, Case Studies, Credentials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* About Section */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Agency Overview</h3>
            <p style={{ lineHeight: '1.7', marginBottom: '1.5rem' }}>{agency.description}</p>

            <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff', marginBottom: '0.75rem' }}>
              Core Technical Competencies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {agency.skills.map((skill, idx) => (
                <span key={idx} className="badge badge-indigo" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Case Study */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontWeight: '700', fontSize: '0.85rem', textTransform: 'uppercase' }}>
              <Sparkles size={16} /> Featured Client Case Study
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.75rem' }}>
              {agency.featuredReview.client}
            </h3>
            <blockquote style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderLeft: '4px solid #6366f1',
              padding: '1rem 1.25rem',
              borderRadius: '0 8px 8px 0',
              fontStyle: 'italic',
              color: 'var(--text-primary)',
              lineHeight: '1.6',
              marginBottom: '1rem',
            }}>
              "{agency.featuredReview.feedback}"
            </blockquote>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={15} fill="#f59e0b" />
              ))}
              <span style={{ fontSize: '0.85rem', fontWeight: '700', marginLeft: '6px', color: '#fff' }}>Verified Client Contract</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Key Terms & Security */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.75rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem' }}>Contract Terms</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Typical Hourly Rate</span>
                <strong>{agency.hourlyRate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Min. Project Engagement</span>
                <strong>{agency.minProjectSize}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Delivered Projects</span>
                <strong style={{ color: '#34d399' }}>{agency.completedProjects} Completed</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>On-Time Success Rate</span>
                <strong style={{ color: '#34d399' }}>{agency.successRate}</strong>
              </div>
            </div>

            <button
              onClick={onOpenPostModal}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Request Consultation
            </button>
          </div>

          <div className="glass-card" style={{ padding: '1.75rem', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: '700', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} /> Verified Security & Identity
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} color="#34d399" /> Corporate Entity Verified
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} color="#34d399" /> Code Quality & Git History Audited
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} color="#34d399" /> Mutual NDA Protection Active
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgencyDetailPage;
