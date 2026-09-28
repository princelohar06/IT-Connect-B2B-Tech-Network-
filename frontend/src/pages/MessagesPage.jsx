import React, { useState } from 'react';
import { Send, User, Building2, Paperclip, CheckCheck, ShieldCheck, Sparkles, Phone, Video } from 'lucide-react';
import { INITIAL_CHATS } from '../services/mockData';
import { useAuth } from '../context/AuthContext';

const MessagesPage = () => {
  const { user } = useAuth();
  const [chats, setChats] = useState(INITIAL_CHATS);
  const [selectedChatId, setSelectedChatId] = useState(INITIAL_CHATS[0].id);
  const [newMessage, setNewMessage] = useState('');

  const currentChat = chats.find((c) => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsgObj = {
      id: 'm-' + Date.now(),
      sender: user?.full_name || 'You',
      senderRole: user?.role || 'BUSINESS',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats((prev) =>
      prev.map((c) => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            lastMessage: newMsgObj.text,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsgObj],
          };
        }
        return c;
      })
    );

    setNewMessage('');
  };

  return (
    <div className="page-wrapper" style={{ paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Direct Collaboration & Chat</h1>
        <p style={{ margin: 0 }}>Secure encrypted messaging between project stakeholders and technical leads.</p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        minHeight: '650px',
        maxHeight: '750px',
        background: 'var(--bg-surface-elevated)',
        border: '1px solid var(--border-medium)',
        borderRadius: 'var(--radius-xl)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
      }}>
        {/* Left: Chat Threads List */}
        <div style={{
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(10, 15, 29, 0.5)',
        }}>
          <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border-subtle)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>Conversations</h3>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                style={{
                  padding: '1.25rem',
                  borderBottom: '1px solid var(--border-subtle)',
                  cursor: 'pointer',
                  background: chat.id === selectedChatId ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                  borderLeft: chat.id === selectedChatId ? '3px solid #6366f1' : '3px solid transparent',
                  transition: 'background var(--transition-fast)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '1.2rem' }}>{chat.avatar}</span>
                    <strong style={{ fontSize: '0.925rem', color: '#fff' }}>{chat.participantName}</strong>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{chat.lastMessageTime}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--primary-light)', marginBottom: '4px' }}>
                  {chat.rfpTitle}
                </div>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {chat.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Room */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <div style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(15, 23, 42, 0.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-medium)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
              }}>
                {currentChat.avatar}
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#fff' }}>
                  {currentChat.participantName}
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  Active Technical Lead Online
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn btn-secondary btn-sm" title="Schedule Discovery Call">
                <Video size={15} /> Video Call
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{
            flex: 1,
            padding: '1.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}>
            {currentChat.messages.map((m) => {
              const isMe = m.sender.includes('You') || m.senderRole === user?.role;
              return (
                <div
                  key={m.id}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    {m.sender} • {m.time}
                  </div>
                  <div
                    style={{
                      padding: '12px 16px',
                      borderRadius: isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: isMe
                        ? 'var(--primary-gradient)'
                        : 'rgba(255, 255, 255, 0.05)',
                      border: isMe ? 'none' : '1px solid var(--border-medium)',
                      color: '#fff',
                      fontSize: '0.9rem',
                      lineHeight: '1.5',
                      boxShadow: isMe ? '0 4px 14px rgba(99, 102, 241, 0.3)' : 'none',
                    }}
                  >
                    {m.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--border-subtle)',
              background: 'rgba(10, 15, 29, 0.8)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Type your message, milestone update or question..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
              <Send size={16} /> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
