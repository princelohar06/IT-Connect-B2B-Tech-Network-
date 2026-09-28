import React, { useState } from 'react';
import { X, Sparkles, Plus, Trash2, DollarSign, Calendar, Tag } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

const PostRequirementModal = ({ isOpen, onClose, onRequirementCreated }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI / Machine Learning',
    budgetMin: 25000,
    budgetMax: 50000,
    budgetType: 'Fixed Price',
    timeline: '6 - 8 Weeks',
    skills: 'Python, React.js, FastAPI',
    description: '',
    deliverables: ['System Architecture & Design Document', 'Core Backend & Frontend Implementation', 'Automated Testing & Production Deployment'],
  });

  const [newDeliverable, setNewDeliverable] = useState('');

  if (!isOpen) return null;

  const handleAddDeliverable = (e) => {
    e.preventDefault();
    if (newDeliverable.trim()) {
      setFormData((prev) => ({
        ...prev,
        deliverables: [...prev.deliverables, newDeliverable.trim()],
      }));
      setNewDeliverable('');
    }
  };

  const handleRemoveDeliverable = (idx) => {
    setFormData((prev) => ({
      ...prev,
      deliverables: prev.deliverables.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please enter a project title and description.');
      return;
    }

    const skillsArray = formData.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const newReq = {
      id: 'rfp-' + Math.floor(1000 + Math.random() * 9000),
      title: formData.title,
      category: formData.category,
      postedBy: 'Your Organization',
      budgetMin: Number(formData.budgetMin),
      budgetMax: Number(formData.budgetMax),
      budgetType: formData.budgetType,
      timeline: formData.timeline,
      proposalsCount: 0,
      status: 'OPEN',
      createdDate: 'Just now',
      skills: skillsArray.length ? skillsArray : ['Full-Stack', 'Cloud'],
      description: formData.description,
      deliverables: formData.deliverables,
    };

    if (onRequirementCreated) {
      onRequirementCreated(newReq);
    }

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });

    toast.success('Project Requirement (RFP) published successfully!');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700' }}>Post Project Requirement (RFP)</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Reach verified IT agencies and receive structured milestone proposals within 24 hours.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          {/* Title */}
          <div className="form-group">
            <label className="form-label">Project Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. NextGen B2B Logistics Orchestration Engine"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Category & Budget Type */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Technical Category</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="AI / Machine Learning">AI & Machine Learning</option>
                <option value="Cloud & DevOps">Cloud Architecture & DevOps</option>
                <option value="Full-Stack Web">Full-Stack Web & SaaS</option>
                <option value="Cybersecurity">Cybersecurity & Pen-Testing</option>
                <option value="Mobile Applications">Mobile Applications (iOS/Android)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Engagement Model</label>
              <select
                className="form-control"
                value={formData.budgetType}
                onChange={(e) => setFormData({ ...formData, budgetType: e.target.value })}
              >
                <option value="Fixed Price">Fixed Milestone Contract</option>
                <option value="Time & Materials">Time & Materials (Hourly)</option>
                <option value="Dedicated Pod">Dedicated Engineering Pod</option>
              </select>
            </div>
          </div>

          {/* Budget Range & Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Budget Min ($)</label>
              <input
                type="number"
                className="form-control"
                value={formData.budgetMin}
                onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                min="1000"
                step="1000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Budget Max ($)</label>
              <input
                type="number"
                className="form-control"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                min="1000"
                step="1000"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Target Timeline</label>
              <input
                type="text"
                className="form-control"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                placeholder="e.g. 8 Weeks"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div className="form-group">
            <label className="form-label">Required Tech Stack (Comma separated)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. React.js, Django, PostgreSQL, Docker, AWS"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
            />
          </div>

          {/* Scope & Description */}
          <div className="form-group">
            <label className="form-label">Scope of Work & Objectives</label>
            <textarea
              className="form-control"
              rows={4}
              placeholder="Detail your business goals, target architecture, user volume, and any compliance constraints..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Deliverables List */}
          <div className="form-group">
            <label className="form-label">Key Deliverables & Milestones</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Add specific deliverable..."
                value={newDeliverable}
                onChange={(e) => setNewDeliverable(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAddDeliverable(e);
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="btn btn-secondary"
                style={{ flexShrink: 0 }}
              >
                <Plus size={16} /> Add
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {formData.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>• {item}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDeliverable(idx)}
                    style={{ background: 'transparent', border: 'none', color: '#fb7185', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Modal Actions */}
          <div style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
          }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} />
              Publish Requirement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostRequirementModal;
