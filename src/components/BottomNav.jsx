import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/home', icon: '🏠', label: 'Accueil' },
  { path: '/feed', icon: '📱', label: 'Feed' },
  { path: null, icon: '+', label: '', isAdd: true },
  { path: '/groups', icon: '👥', label: 'Groupes' },
  { path: '/profile', icon: '👤', label: 'Profil' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      height: 'var(--nav-h)',
      background: 'var(--card)',
      borderTop: '0.5px solid var(--border)',
      display: 'flex', alignItems: 'center',
      zIndex: 100,
      paddingBottom: 8,
    }}>
      {navItems.map((item, i) => {
        const active = item.path && pathname.startsWith(item.path)
        if (item.isAdd) {
          return (
            <button key={i} onClick={() => navigate('/log')} style={{
              flex: 1, display: 'flex', flexDirection: 'column',
              alignItems: 'center', border: 'none', background: 'transparent',
              cursor: 'pointer', marginTop: -16,
            }}>
              <div style={{
                width: 52, height: 52,
                background: 'var(--blue)', borderRadius: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, color: '#fff', fontWeight: 300,
                boxShadow: '0 4px 12px rgba(74,124,247,0.35)',
              }}>+</div>
            </button>
          )
        }
        return (
          <button key={i} onClick={() => navigate(item.path)} style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', gap: 3, cursor: 'pointer',
            padding: '8px 0', border: 'none', background: 'transparent',
          }}>
            <span style={{ fontSize: 22, lineHeight: 1 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: active ? 'var(--blue)' : 'var(--muted)' }}>
              {item.label}
            </span>
            {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--blue)', marginTop: -2 }} />}
          </button>
        )
      })}
    </div>
  )
}
