import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layers, Lock, Mail, Sparkles, Building2, Briefcase, ShieldCheck, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { login, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      if (result.user?.role === 'AGENCY') navigate('/dashboard/agency');
      else if (result.user?.role === 'ADMIN') navigate('/dashboard/admin');
      else navigate('/dashboard/business');
    }
  };

  const handleDemo = (role) => {
    loginAsDemo(role);
    if (role === 'AGENCY') navigate('/dashboard/agency');
    else if (role === 'ADMIN') navigate('/dashboard/admin');
    else navigate('/dashboard/business');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        maxWidth: '1000px',
        width: '100%',
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
      }}>
        {/* Left Side: Form */}
        <div style={{ padding: '3rem 2.5rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.5rem' }}>
              Welcome back to <span className="gradient-text">ITConnect</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Sign in to manage your enterprise project RFPs, agency bids, and active milestone contracts.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Corporate Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" style={{ margin: 0 }}>Password</label>
                <a href="#" style={{ fontSize: '0.78rem', color: 'var(--primary-light)' }}>Forgot Password?</a>
              </div>
              <div style={{ position: 'relative', marginTop: '4px' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: '0.5rem', marginBottom: '1.5rem' }}
            >
              {loading ? 'Authenticating...' : 'Sign In to Workspace'}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Don't have an account yet?{' '}
            <Link to="/register" style={{ color: 'var(--primary-light)', fontWeight: '600' }}>
              Create an account
            </Link>
          </div>

          {/* Quick Demo Logins Bar */}
          <div style={{
            padding: '1rem',
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} color="#818cf8" />
              1-Click Demo Quick Logins
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button
                type="button"
                onClick={() => handleDemo('BUSINESS')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              >
                🏢 Client
              </button>
              <button
                type="button"
                onClick={() => handleDemo('AGENCY')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              >
                ⚡ Agency
              </button>
              <button
                type="button"
                onClick={() => handleDemo('ADMIN')}
                className="btn btn-secondary btn-sm"
                style={{ fontSize: '0.75rem', padding: '6px 4px' }}
              >
                🛡️ Admin
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Showcase */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15)), #080d1a',
          padding: '3rem 2.5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderLeft: '1px solid var(--border-subtle)',
        }}>
          <div>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              marginBottom: '1.5rem',
            }}>
              <Layers size={24} />
            </div>

            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '0.75rem' }}>
              The Premier Hub for Enterprise IT Outsourcing
            </h3>
            <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>
              Join thousands of businesses sourcing high-impact technical teams across AI, Cloud, Microservices, and Cybersecurity.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <ShieldCheck size={18} color="#10b981" />
              <span>SOC2 & Enterprise Escrow Compliant</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem' }}>
              <Sparkles size={18} color="#06b6d4" />
              <span>Full Intellectual Property Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
