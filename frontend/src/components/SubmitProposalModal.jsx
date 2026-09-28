import React, { useState } from 'react';
import { X, Send, Plus, Trash2, ShieldCheck, CheckCircle } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import confetti from 'canvas-confetti';

const SubmitProposalModal = ({ isOpen, onClose, rfp, onProposalSubmitted }) => {
  const toast = useToast();
  const [bidAmount, setBidAmount] = useState(rfp ? Math.round((rfp.budgetMin + rfp.budgetMax) / 2) : 35000);
  const [deliveryWeeks, setDeliveryWeeks] = useState(8);
  const [coverLetter, setCoverLetter] = useState(
    'Our engineering agency has built several similar systems. We have ready-made accelerators and senior talent dedicated to starting immediately with rigorous CI/CD and compliance standards.'
  );
  const [milestones, setMilestones] = useState([
    { name: 'Architecture Blueprint & Core Setup', amount: 10000, duration: '2 weeks' },
    { name: 'Core Feature Development & API Integration', amount: 15000, duration: '4 weeks' },
    { name: 'Testing, Security Hardening & Handover', amount: 10000, duration: '2 weeks' },
  ]);

  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneAmount, setNewMilestoneAmount] = useState(5000);
  const [newMilestoneDuration, setNewMilestoneDuration] = useState('2 weeks');

  if (!isOpen || !rfp) return null;

  const handleAddMilestone = (e) => {
    e.preventDefault();
    if (newMilestoneName.trim()) {
      setMilestones([
        ...milestones,
        {
          name: newMilestoneName.trim(),
          amount: Number(newMilestoneAmount),
          duration: newMilestoneDuration,
        },
      ]);
      setNewMilestoneName('');
    }
  };

  const handleRemoveMilestone = (idx) => {
    setMilestones(milestones.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coverLetter.trim()) {
      toast.error('Please provide a cover letter detailing your technical execution plan.');
      return;
    }

    const proposal = {
      id: 'prop-' + Math.floor(1000 + Math.random() * 9000),
      rfpId: rfp.id,
      rfpTitle: rfp.title,
      agencyId: 'ag-current',
      agencyName: 'Synthetix AI Labs (You)',
      agencyLogo: '⚡',
      bidAmount: Number(bidAmount),
      deliveryWeeks: Number(deliveryWeeks),
      status: 'UNDER_REVIEW',
      coverLetter,
      milestones: milestones.map((m) => ({ ...m, status: 'Pending' })),
      submittedDate: 'Just now',
    };

    if (onProposalSubmitted) {
      onProposalSubmitted(proposal);
    }

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
    });

    toast.success(`Proposal submitted for "${rfp.title}"!`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
              Submitting Agency Bid
            </span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '4px' }}>
              {rfp.title}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Posted by {rfp.postedBy} • Client Budget: ${rfp.budgetMin?.toLocaleString()} - ${rfp.budgetMax?.toLocaleString()}
            </p>
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
          {/* Bid & Delivery Timeline */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Total Bid Amount ($ USD)</label>
              <input
                type="number"
                className="form-control"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                min="1000"
                step="500"
                required
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Estimated Delivery (Weeks)</label>
              <input
                type="number"
                className="form-control"
                value={deliveryWeeks}
                onChange={(e) => setDeliveryWeeks(e.target.value)}
                min="1"
                max="52"
                required
              />
            </div>
          </div>

          {/* Proposal Cover Letter */}
          <div className="form-group">
            <label className="form-label">Executive Cover Letter & Approach</label>
            <textarea
              className="form-control"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Outline your team's relevant experience, architecture approach, and project risks mitigation..."
              required
            />
          </div>

          {/* Milestone Breakdown */}
          <div className="form-group">
            <label className="form-label">Milestone Breakdown & Payment Schedule</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
              {milestones.map((m, idx) => (
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
                  <div>
                    <span style={{ fontWeight: '600', color: '#fff' }}>Milestone {idx + 1}:</span> {m.name}
                    <span style={{ color: 'var(--text-muted)', marginLeft: '8px' }}>({m.duration})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontWeight: '700', color: '#34d399' }}>${m.amount.toLocaleString()}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMilestone(idx)}
                      style={{ background: 'transparent', border: 'none', color: '#fb7185', cursor: 'pointer' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Milestone Sub-form */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr auto',
              gap: '8px',
              padding: '10px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <input
                type="text"
                className="form-control"
                placeholder="Milestone title..."
                value={newMilestoneName}
                onChange={(e) => setNewMilestoneName(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '6px 10px' }}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Amount $"
                value={newMilestoneAmount}
                onChange={(e) => setNewMilestoneAmount(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '6px 10px' }}
              />
              <input
                type="text"
                className="form-control"
                placeholder="Duration"
                value={newMilestoneDuration}
                onChange={(e) => setNewMilestoneDuration(e.target.value)}
                style={{ fontSize: '0.85rem', padding: '6px 10px' }}
              />
              <button
                type="button"
                onClick={handleAddMilestone}
                className="btn btn-secondary btn-sm"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          <div style={{
            padding: '10px 14px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            color: '#34d399',
            marginTop: '1rem',
          }}>
            <ShieldCheck size={18} style={{ flexShrink: 0 }} />
            <span>Escrow Protected: Funds will be held securely by ITConnect and released per approved milestone.</span>
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
            <button type="submit" className="btn btn-cyan">
              <Send size={16} />
              Submit Official Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmitProposalModal;
