import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, Zap, Globe, Share2, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '4.5rem 1.5rem 2rem',
      color: 'var(--text-secondary)',
      fontSize: '0.9rem',
    }}>
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3.5rem',
        }}>
          {/* Brand Info */}
          <div style={{ maxWidth: '320px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
              }}>
                <Layers size={18} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>
                IT<span className="gradient-text">Connect</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
              The enterprise marketplace where high-growth companies discover, hire, and collaborate with verified specialized IT development agencies.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Globe size={16} /> Enterprise Global Network
              </span>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1.2rem', letterSpacing: '0.02em' }}>
              Specialized Solutions
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li><Link to="/agencies" style={{ color: 'var(--text-secondary)' }}>AI & Machine Learning</Link></li>
              <li><Link to="/agencies" style={{ color: 'var(--text-secondary)' }}>Cloud Architecture & DevOps</Link></li>
              <li><Link to="/agencies" style={{ color: 'var(--text-secondary)' }}>Full-Stack Web Development</Link></li>
              <li><Link to="/agencies" style={{ color: 'var(--text-secondary)' }}>Cybersecurity & DevSecOps</Link></li>
              <li><Link to="/agencies" style={{ color: 'var(--text-secondary)' }}>Cross-Platform Mobile Apps</Link></li>
            </ul>
          </div>

          {/* Marketplace */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1.2rem', letterSpacing: '0.02em' }}>
              Marketplace
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: 0 }}>
              <li><Link to="/agencies" style={{ color: 'var(--text-secondary)' }}>Top Rated IT Agencies</Link></li>
              <li><Link to="/marketplace" style={{ color: 'var(--text-secondary)' }}>Browse Open Project RFPs</Link></li>
              <li><Link to="/register?role=AGENCY" style={{ color: 'var(--text-secondary)' }}>Apply as an IT Agency</Link></li>
              <li><Link to="/register?role=BUSINESS" style={{ color: 'var(--text-secondary)' }}>Post an Enterprise RFP</Link></li>
              <li><a href="/api/docs/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)' }}>API Documentation (Swagger)</a></li>
            </ul>
          </div>

          {/* Trust & Enterprise */}
          <div>
            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: '700', marginBottom: '1.2rem', letterSpacing: '0.02em' }}>
              Enterprise Guarantees
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <ShieldCheck size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.825rem' }}>100% Vetted & Verified Agencies with background audits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Zap size={18} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.825rem' }}>Milestone Escrow Protection & Contract Governance</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Globe size={18} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.825rem' }}>Global NDA and Intellectual Property Transfer Rights</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.825rem',
          color: 'var(--text-muted)',
        }}>
          <div>
            © {new Date().getFullYear()} ITConnect Technologies Inc. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security Statement</a>
            <a href="#">System Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
