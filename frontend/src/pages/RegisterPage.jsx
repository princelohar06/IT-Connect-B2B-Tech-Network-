import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Building2, Briefcase, User, Mail, Phone, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';

const RegisterPage = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = searchParams.get('role') === 'AGENCY' ? 'AGENCY' : 'BUSINESS';
  const [role, setRole] = useState(initialRole);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register({
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      role: role,
    });
    setLoading(false);

    if (result.success) {
      if (role === 'AGENCY') navigate('/dashboard/agency');
      else navigate('/dashboard/business');
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 72px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1.5rem',
    }}>
      <div style={{
        maxWidth: '620px',
        width: '100%',
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2.5rem',
        boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.85rem', fontWeight: '800', marginBottom: '0.5rem' }}>
            Create Your <span className="gradient-text">ITConnect</span> Account
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Join the verified B2B network connecting innovative companies with specialized IT agencies.
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          background: 'rgba(0,0,0,0.3)',
          padding: '6px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '2rem',
        }}>
          <button
            type="button"
            onClick={() => setRole('BUSINESS')}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: role === 'BUSINESS' ? 'var(--primary-gradient)' : 'transparent',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: role === 'BUSINESS' ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Briefcase size={16} />
            <span>I'm a Business (Client)</span>
          </button>

          <button
            type="button"
            onClick={() => setRole('AGENCY')}
            style={{
              padding: '12px',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              background: role === 'AGENCY' ? 'linear-gradient(135deg, #06b6d4, #0284c7)' : 'transparent',
              color: '#fff',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: role === 'AGENCY' ? '0 4px 12px rgba(6,182,212,0.3)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            <Building2 size={16} />
            <span>I'm an IT Agency (Vendor)</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Full Name / Organization */}
          <div className="form-group">
            <label className="form-label">
              {role === 'AGENCY' ? 'Agency / Company Name' : 'Company / Full Name'}
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                className="form-control"
                placeholder={role === 'AGENCY' ? 'Synthetix AI Labs Inc.' : 'Acme Enterprise Solutions'}
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                style={{ paddingLeft: '38px' }}
                required
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Work Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  className="form-control"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <div style={{ position: 'relative' }}>
                <Phone size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="tel"
                  className="form-control"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>
          </div>

          {/* Password & Confirm Password */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Password (8+ chars)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  className="form-control"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  style={{ paddingLeft: '38px' }}
                  required
                />
              </div>
            </div>
          </div>

          <div style={{
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <ShieldCheck size={16} color="#10b981" />
            <span>By registering, you agree to our Terms of Service and Master Services Agreement.</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`btn ${role === 'AGENCY' ? 'btn-cyan' : 'btn-primary'} btn-lg`}
            style={{ width: '100%', marginBottom: '1.5rem' }}
          >
            {loading ? 'Creating Account...' : `Register as ${role === 'AGENCY' ? 'IT Agency' : 'Enterprise Client'}`}
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Already have an ITConnect account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-light)', fontWeight: '600' }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
