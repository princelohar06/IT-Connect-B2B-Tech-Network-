import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Briefcase, 
  Zap, 
  Users, 
  TrendingUp, 
  Star, 
  Clock, 
  Layers, 
  Lock,
  Cpu,
  Cloud,
  Code,
  Smartphone,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { INITIAL_AGENCIES, INITIAL_REQUIREMENTS, PLATFORM_STATS } from '../services/mockData';

const HomePage = ({ onOpenPostModal }) => {
  const navigate = useNavigate();

  // Instant Quote Estimator State
  const [estCategory, setEstCategory] = useState('AI / Machine Learning');
  const [estScope, setEstScope] = useState('MVP (Fast Launch)');
  const [estTimeline, setEstTimeline] = useState('8-12 Weeks');

  const calculateEstimate = () => {
    let base = 25000;
    if (estCategory === 'AI / Machine Learning') base = 40000;
    if (estCategory === 'Cybersecurity') base = 30000;
    if (estCategory === 'Cloud & DevOps') base = 35000;

    if (estScope === 'Full Enterprise Platform') base *= 2.2;
    if (estScope === 'Dedicated Engineering Pod') base *= 1.8;

    return Math.round(base);
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '5.5rem 1.5rem 4rem',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        {/* Glow pill */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-full)',
          marginBottom: '1.75rem',
          fontSize: '0.85rem',
          fontWeight: '600',
          color: 'var(--primary-light)',
          animation: 'fadeIn 0.4s ease-out',
        }}>
          <Sparkles size={16} />
          <span>The Next-Gen B2B IT Services Marketplace</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'currentColor' }} />
          <span style={{ color: '#06b6d4' }}>Over $28M+ in Delivered Projects</span>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '1.5rem',
          maxWidth: '920px',
          margin: '0 auto 1.5rem',
          letterSpacing: '-0.035em',
        }}>
          Hire Pre-Vetted <span className="gradient-text">Elite IT Agencies</span> For Enterprise Scale.
        </h1>

        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          maxWidth: '720px',
          margin: '0 auto 2.5rem',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
        }}>
          Skip unreliable freelance boards. ITConnect matches high-growth businesses with verified specialized engineering agencies, secured by automated milestone escrow.
        </p>

        {/* Hero Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '3.5rem',
        }}>
          <button
            onClick={onOpenPostModal}
            className="btn btn-primary btn-lg"
            style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}
          >
            <Briefcase size={18} />
            Post a Project Requirement
          </button>
          <Link
            to="/agencies"
            className="btn btn-secondary btn-lg"
            style={{ fontSize: '1.05rem', padding: '0.9rem 1.75rem' }}
          >
            <Building2 size={18} />
            Explore Verified Agencies
          </Link>
        </div>

        {/* Trust Badges Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '2.5rem',
          flexWrap: 'wrap',
          padding: '1.25rem 2rem',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '860px',
          margin: '0 auto',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
            <ShieldCheck size={18} color="#10b981" />
            <span>100% Background-Vetted Agencies</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
            <Lock size={18} color="#06b6d4" />
            <span>Escrow Protected Milestones</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
            <Clock size={18} color="#f59e0b" />
            <span>Proposal Delivery &lt; 24 Hours</span>
          </div>
        </div>
      </section>

      {/* Platform Stats Counter */}
      <section style={{
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        background: 'rgba(12, 18, 34, 0.6)',
        padding: '2.5rem 1.5rem',
      }}>
        <div style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          textAlign: 'center',
        }}>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#fff' }}>{PLATFORM_STATS.totalGMV}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Contract Volume
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--accent-cyan)' }}>{PLATFORM_STATS.verifiedAgencies}+</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Vetted IT Agencies
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--primary-light)' }}>{PLATFORM_STATS.activeProjects}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Milestones
            </div>
          </div>
          <div>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#34d399' }}>{PLATFORM_STATS.satisfactionRate}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Client Satisfaction
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="page-wrapper">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>Specialized Domains</span>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '0.5rem' }}>
            Tailored Engineering for High-Stakes Projects
          </h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0' }}>
            Discover domain-specialist agencies possessing deep architecture experience.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {[
            {
              title: 'AI & Machine Learning Studio',
              desc: 'Custom LLM fine-tuning, RAG data ingestion, neural search, and autonomous business workflows.',
              icon: <Cpu size={24} color="#818cf8" />,
              tags: ['PyTorch', 'LangChain', 'OpenAI', 'Vector DBs'],
              count: '48 Agencies',
            },
            {
              title: 'Cloud & Kubernetes DevOps',
              desc: 'Multi-cloud migrations, Terraform IaC, zero-downtime CI/CD pipelines, and high-availability architecture.',
              icon: <Cloud size={24} color="#06b6d4" />,
              tags: ['AWS', 'GCP', 'Kubernetes', 'ArgoCD'],
              count: '62 Agencies',
            },
            {
              title: 'Full-Stack Web & SaaS Platforms',
              desc: 'Enterprise web apps built with Next.js, React, Django REST, microservices, and sleek UI/UX.',
              icon: <Code size={24} color="#a855f7" />,
              tags: ['React', 'Django', 'TypeScript', 'Node.js'],
              count: '94 Agencies',
            },
            {
              title: 'Cybersecurity & Compliance',
              desc: 'Pen-testing, DevSecOps hardening, vulnerability scanning, and SOC2 / HIPAA readiness.',
              icon: <ShieldCheck size={24} color="#10b981" />,
              tags: ['SOC2', 'PenTest', 'IAM Audit', 'DevSecOps'],
              count: '31 Agencies',
            },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-interactive"
              onClick={() => navigate('/agencies')}
              style={{ padding: '2rem' }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                {cat.icon}
              </div>

              <div style={{ fontSize: '0.78rem', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                {cat.count}
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '0.65rem' }}>{cat.title}</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem', minHeight: '44px' }}>{cat.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {cat.tags.map((t, i) => (
                  <span key={i} style={{
                    fontSize: '0.75rem',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    background: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-secondary)',
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Verified Agencies */}
      <section style={{ background: 'rgba(12, 18, 34, 0.4)', padding: '4rem 0' }}>
        <div className="page-wrapper" style={{ paddingBottom: '0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>Top Tier Partners</span>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '0.5rem' }}>Featured Verified Agencies</h2>
              <p style={{ margin: 0 }}>Rigorously evaluated for technical mastery, communication, and on-time delivery.</p>
            </div>
            <Link to="/agencies" className="btn btn-secondary">
              View All Agencies <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
            {INITIAL_AGENCIES.slice(0, 3).map((agency) => (
              <div
                key={agency.id}
                className="glass-card"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid var(--border-medium)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.4rem',
                      }}>
                        {agency.logo}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{agency.name}</h4>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{agency.location}</span>
                      </div>
                    </div>
                    <span className="badge badge-emerald">Verified</span>
                  </div>

                  <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                    {agency.description}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                    padding: '10px 12px',
                    background: 'rgba(0,0,0,0.25)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.25rem',
                    fontSize: '0.82rem',
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Rate: </span>
                      <strong style={{ color: '#fff' }}>{agency.hourlyRate}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Team: </span>
                      <strong style={{ color: '#fff' }}>{agency.teamSize}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '1.5rem' }}>
                    {agency.skills.slice(0, 4).map((skill, sIdx) => (
                      <span key={sIdx} className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Link
                    to={`/agencies/${agency.id}`}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    View Agency Profile
                  </Link>
                  <button
                    onClick={onOpenPostModal}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    Request Bid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Project Estimator Widget */}
      <section className="page-wrapper">
        <div className="glass-card" style={{
          padding: '3rem 2.5rem',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          background: 'linear-gradient(135deg, rgba(19, 27, 46, 0.9), rgba(12, 18, 34, 0.95))',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <Calculator size={18} />
                Instant Project Estimator
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>
                Estimate Your Technical Project Budget
              </h2>
              <p style={{ marginBottom: '2rem' }}>
                Calculate average market costs for dedicated engineering squads and milestone-based technical deliverables across verified agencies.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Domain Area</label>
                  <select
                    className="form-control"
                    value={estCategory}
                    onChange={(e) => setEstCategory(e.target.value)}
                  >
                    <option value="AI / Machine Learning">AI & LLM Fine-tuning</option>
                    <option value="Cloud & DevOps">Cloud Migration & Kubernetes</option>
                    <option value="Full-Stack Web">Full-Stack SaaS Platform</option>
                    <option value="Cybersecurity">SOC2 & DevSecOps Audit</option>
                  </select>
                </div>

                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Project Scope</label>
                  <select
                    className="form-control"
                    value={estScope}
                    onChange={(e) => setEstScope(e.target.value)}
                  >
                    <option value="MVP (Fast Launch)">MVP (Fast Launch)</option>
                    <option value="Full Enterprise Platform">Full Enterprise Platform</option>
                    <option value="Dedicated Engineering Pod">Dedicated Engineering Pod</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Price Preview Card */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              textAlign: 'center',
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estimated Project Budget
              </span>

              <div style={{ fontSize: '3.25rem', fontWeight: '800', margin: '0.75rem 0', color: '#fff' }}>
                <span className="gradient-text">${calculateEstimate().toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                <span>✓ Milestone-based escrow</span>
                <span>✓ Verified SLA</span>
              </div>

              <button
                onClick={onOpenPostModal}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                Post This Project RFP <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
