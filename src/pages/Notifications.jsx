import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { TopBar } from '../components/UI'
import BottomNav from '../components/BottomNav'

export default function Notifications() {
  const navigate = useNavigate()
  const { notifications, markAllRead } = useApp()
  const unread = notifications.filter(n => !n.read).length

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar
        title="Notifications"
        onBack={() => navigate(-1)}
        right={
          unread > 0 && (
            <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--blue)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Tout lire
            </button>
          )
        }
      />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)' }}>
        {unread > 0 && (
          <div style={{ padding: '10px 20px 4px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.5 }}>
            NOUVELLES ({unread})
          </div>
        )}

        {notifications.map(n => (
          <div key={n.id} style={{
            display: 'flex', alignItems: 'flex-start', gap: 12,
            padding: '14px 20px',
            background: n.read ? 'transparent' : 'rgba(74,124,247,0.04)',
            borderBottom: '0.5px solid var(--border)',
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
              {n.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{n.text}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{n.time}</div>
            </div>
            {!n.read && (
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', flexShrink: 0, marginTop: 6 }} />
            )}
          </div>
        ))}

        {notifications.length === 0 && (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🔔</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Aucune notification</div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
