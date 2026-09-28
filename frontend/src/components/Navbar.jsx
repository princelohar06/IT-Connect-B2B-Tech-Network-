import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  Briefcase, 
  ShieldCheck, 
  MessageSquare, 
  User, 
  LogOut, 
  Menu, 
  X, 
  PlusCircle, 
  Sparkles,
  ChevronDown,
  Layers,
  Search
} from 'lucide-react';

const Navbar = ({ onOpenPostModal }) => {
  const { user, logout, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const getDashboardPath = () => {
    if (!user) return '/login';
    if (user.role === 'AGENCY') return '/dashboard/agency';
    if (user.role === 'ADMIN') return '/dashboard/admin';
    return '/dashboard/business';
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: 'rgba(7, 10, 18, 0.82)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
      }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)',
          }}>
            <Layers size={22} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.03em', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '4px' }}>
              IT<span className="gradient-text">Connect</span>
            </div>
            <div style={{ fontSize: '0.65rem', fontWeight: '600', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '-2px' }}>
              B2B Tech Network
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
          <Link
            to="/agencies"
            style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: isActive('/agencies') ? 'var(--primary-light)' : 'var(--text-secondary)',
              transition: 'color var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Building2 size={16} />
            Agencies
          </Link>

          <Link
            to="/marketplace"
            style={{
              fontSize: '0.9rem',
              fontWeight: '600',
              color: isActive('/marketplace') ? 'var(--primary-light)' : 'var(--text-secondary)',
              transition: 'color var(--transition-fast)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Briefcase size={16} />
            Browse RFPs
          </Link>

          {user && (
            <>
              <Link
                to={getDashboardPath()}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: location.pathname.startsWith('/dashboard') ? 'var(--primary-light)' : 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Sparkles size={16} />
                Dashboard
              </Link>

              <Link
                to="/messages"
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: isActive('/messages') ? 'var(--primary-light)' : 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  position: 'relative',
                }}
              >
                <MessageSquare size={16} />
                Messages
                <span style={{
                  width: '7px',
                  height: '7px',
                  backgroundColor: '#06b6d4',
                  borderRadius: '50%',
                  boxShadow: '0 0 8px #06b6d4',
                }} />
              </Link>
            </>
          )}
        </nav>

        {/* Action Controls & User Account */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Post Requirement CTA for Business / Guests */}
          {(!user || user.role === 'BUSINESS') && onOpenPostModal && (
            <button
              onClick={onOpenPostModal}
              className="btn btn-primary btn-sm"
              style={{ display: 'none', md: 'inline-flex' }}
            >
              <PlusCircle size={15} />
              <span>Post RFP</span>
            </button>
          )}

          {/* Quick Demo Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="btn btn-secondary btn-sm"
              title="Test the platform as different roles"
              style={{
                fontSize: '0.8rem',
                padding: '0.35rem 0.75rem',
                borderColor: 'rgba(99, 102, 241, 0.3)',
                background: 'rgba(99, 102, 241, 0.08)',
              }}
            >
              <Sparkles size={13} color="#818cf8" />
              <span>Demo Persona</span>
              <ChevronDown size={13} />
            </button>

            {roleDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '110%',
                  width: '230px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '6px',
                  zIndex: 60,
                  animation: 'fadeIn 0.15s ease-out',
                }}
              >
                <div style={{ padding: '6px 10px', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  Quick Switch Role
                </div>
                <button
                  onClick={() => {
                    loginAsDemo('BUSINESS');
                    setRoleDropdownOpen(false);
                    navigate('/dashboard/business');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Briefcase size={15} color="#818cf8" />
                  <div>
                    <div style={{ fontWeight: '600' }}>Enterprise Client</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Post RFPs, hire agencies</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    loginAsDemo('AGENCY');
                    setRoleDropdownOpen(false);
                    navigate('/dashboard/agency');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <Building2 size={15} color="#06b6d4" />
                  <div>
                    <div style={{ fontWeight: '600' }}>IT Agency / Vendor</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Submit bids, build software</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    loginAsDemo('ADMIN');
                    setRoleDropdownOpen(false);
                    navigate('/dashboard/admin');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '8px 10px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <ShieldCheck size={15} color="#10b981" />
                  <div>
                    <div style={{ fontWeight: '600' }}>Platform Admin</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Audit & verify agencies</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* User Profile or Login/Register buttons */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px 4px 6px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  color: '#fff',
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                }}>
                  {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.825rem', fontWeight: '600', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user.full_name || user.email}
                  </span>
                  <span className={`badge ${user.role === 'AGENCY' ? 'badge-cyan' : user.role === 'ADMIN' ? 'badge-emerald' : 'badge-indigo'}`} style={{ fontSize: '0.62rem', padding: '0.1rem 0.4rem', width: 'fit-content' }}>
                    {user.role}
                  </span>
                </div>
                <ChevronDown size={14} color="var(--text-muted)" />
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '115%',
                    width: '210px',
                    background: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: '6px',
                    zIndex: 60,
                    animation: 'fadeIn 0.15s ease-out',
                  }}
                >
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <User size={16} color="var(--primary-light)" />
                    Profile & Settings
                  </Link>
                  <Link
                    to={getDashboardPath()}
                    onClick={() => setUserDropdownOpen(false)}
                    style={{
                      padding: '9px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: 'var(--text-primary)',
                      fontSize: '0.875rem',
                      borderRadius: '6px',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <Briefcase size={16} color="#06b6d4" />
                    My Dashboard
                  </Link>

                  <div style={{ height: '1px', background: 'var(--border-subtle)', margin: '4px 0' }} />

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '9px 12px',
                      background: 'transparent',
                      border: 'none',
                      borderRadius: '6px',
                      color: '#fb7185',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(244,63,94,0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={16} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Link to="/login" className="btn btn-ghost btn-sm">
                Log In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          padding: '1rem 1.5rem 1.5rem',
          background: 'var(--bg-surface-elevated)',
          borderBottom: '1px solid var(--border-medium)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}>
          <Link
            to="/agencies"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', color: '#fff', fontWeight: '600' }}
          >
            Explore Agencies
          </Link>
          <Link
            to="/marketplace"
            onClick={() => setMobileMenuOpen(false)}
            style={{ padding: '0.5rem 0', color: '#fff', fontWeight: '600' }}
          >
            Browse RFPs
          </Link>
          {user && (
            <>
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.5rem 0', color: 'var(--primary-light)', fontWeight: '600' }}
              >
                Dashboard
              </Link>
              <Link
                to="/messages"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.5rem 0', color: '#fff', fontWeight: '600' }}
              >
                Messages
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                style={{ padding: '0.5rem 0', color: '#fff', fontWeight: '600' }}
              >
                Profile Settings
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
