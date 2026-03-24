import React from 'react'

export function Avatar({ initials, bg = '#dbeafe', color = '#1d4ed8', size = 40 }) {
  return (
    <div className="avatar" style={{
      width: size, height: size,
      background: bg, color,
      fontSize: size * 0.35,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export function ProgressBar({ value, max = 100, color = 'var(--blue)', height = 6 }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div style={{ height, background: 'var(--blue-light)', borderRadius: 99, overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width 0.4s ease' }} />
    </div>
  )
}

export function StatPill({ value, label, color = 'var(--text)' }) {
  return (
    <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '10px 14px', textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: 22, fontWeight: 800, color, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 500, marginTop: 3 }}>{label}</div>
    </div>
  )
}

export function ActivityIcon({ type, size = 40 }) {
  const icons = {
    run: { emoji: '🏃', bg: '#dbeafe' },
    bike: { emoji: '🚴', bg: '#fef9c3' },
    gym: { emoji: '🏋️', bg: '#fce7f3' },
    swim: { emoji: '🏊', bg: '#cffafe' },
    yoga: { emoji: '🧘', bg: '#d1fae5' },
    soccer: { emoji: '⚽', bg: '#dcfce7' },
    tennis: { emoji: '🎾', bg: '#fff7ed' },
    hike: { emoji: '🥾', bg: '#fef9c3' },
    box: { emoji: '🥊', bg: '#fee2e2' },
  }
  const { emoji, bg } = icons[type] || { emoji: '🏃', bg: '#dbeafe' }
  return (
    <div style={{
      width: size, height: size,
      borderRadius: 12, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.5, flexShrink: 0,
    }}>
      {emoji}
    </div>
  )
}

export function TopBar({ title, right, onBack }) {
  return (
    <div style={{
      height: 56, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 20px',
      background: 'var(--card)', borderBottom: '0.5px solid var(--border)',
      flexShrink: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text)', padding: 0 }}>←</button>
        )}
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{title}</h1>
      </div>
      {right}
    </div>
  )
}

export function IconBtn({ children, onClick, badge }) {
  return (
    <button onClick={onClick} style={{
      width: 36, height: 36, borderRadius: '50%',
      background: 'var(--blue-light)', border: 'none',
      cursor: 'pointer', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontSize: 16, color: 'var(--blue)',
      position: 'relative',
    }}>
      {children}
      {badge > 0 && (
        <div style={{
          position: 'absolute', top: -2, right: -2,
          width: 16, height: 16, borderRadius: '50%',
          background: 'var(--red)', color: '#fff',
          fontSize: 9, fontWeight: 700,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '2px solid var(--card)',
        }}>
          {badge > 9 ? '9+' : badge}
        </div>
      )}
    </button>
  )
}

export function TabBar({ tabs, active, onChange }) {
  return (
    <div style={{
      display: 'flex', gap: 4, padding: 4,
      background: 'var(--bg)', borderRadius: 10,
      margin: '12px 16px 0',
    }}>
      {tabs.map(tab => (
        <button key={tab.id} onClick={() => onChange(tab.id)} style={{
          flex: 1, padding: '8px', border: 'none',
          borderRadius: 8, fontSize: 13, fontWeight: 600,
          color: active === tab.id ? 'var(--text)' : 'var(--muted)',
          background: active === tab.id ? 'var(--card)' : 'transparent',
          cursor: 'pointer', fontFamily: 'inherit',
          transition: 'all 0.15s',
        }}>
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export function MiniChart({ data }) {
  const max = Math.max(...data.map(d => d.km), 1)
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 52 }}>
        {data.map((d, i) => (
          <div key={i} style={{
            flex: 1,
            height: `${Math.max(d.km / max * 100, d.done ? 8 : 0)}%`,
            background: d.done ? 'var(--blue)' : 'var(--blue-light)',
            borderRadius: '4px 4px 0 0',
            minHeight: d.done ? 6 : 0,
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {data.map((d, i) => (
          <span key={i} style={{ fontSize: 10, color: 'var(--muted)', flex: 1, textAlign: 'center' }}>{d.day}</span>
        ))}
      </div>
    </div>
  )
}
