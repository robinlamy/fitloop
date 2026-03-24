import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { TopBar, ProgressBar } from '../components/UI'
import BottomNav from '../components/BottomNav'

export default function Challenges() {
  const navigate = useNavigate()
  const { challenges, joinChallenge } = useApp()

  const active = challenges.filter(c => c.joined)
  const available = challenges.filter(c => !c.joined)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar title="Challenges" onBack={() => navigate(-1)} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)' }}>
        {active.length > 0 && (
          <>
            <div style={{ padding: '14px 20px 8px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.5 }}>EN COURS</div>
            {active.map(c => {
              const pct = Math.round((c.current / c.goal) * 100)
              return (
                <div key={c.id} style={{ margin: '0 16px 12px', background: 'var(--blue)', borderRadius: 20, padding: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14 }}>{c.participants} participants · {c.daysLeft}j restants</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13 }}>{c.current} / {c.goal} {c.unit}</span>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#fff', borderRadius: 99 }} />
                  </div>
                </div>
              )
            })}
          </>
        )}

        {available.length > 0 && (
          <>
            <div style={{ padding: '14px 20px 8px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.5 }}>DISPONIBLES</div>
            {available.map(c => {
              const pct = Math.round((c.current / c.goal) * 100)
              return (
                <div key={c.id} className="card" style={{ margin: '0 16px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{c.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--muted)' }}>{c.participants} participants · {c.daysLeft}j restants</div>
                    </div>
                    <button onClick={() => joinChallenge(c.id)} style={{ background: 'var(--blue)', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}>
                      Rejoindre
                    </button>
                  </div>
                  <ProgressBar value={c.current} max={c.goal} />
                  <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 6 }}>{c.current} / {c.goal} {c.unit}</div>
                </div>
              )
            })}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
