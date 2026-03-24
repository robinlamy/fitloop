import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--card)', overflowY: 'auto' }}>
      <div style={{ padding: '16px 24px 0' }}>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: 'var(--text)', padding: 0 }}>←</button>
      </div>

      <div style={{ padding: '16px 24px 40px', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ width: 44, height: 44, background: 'var(--blue)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="10" cy="14" r="7" stroke="white" stroke-width="2.5" fill="none" />
              <circle cx="18" cy="14" r="7" stroke="rgba(255,255,255,0.5)" stroke-width="2.5" fill="none" />
            </svg>
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>FitLoop</span>
        </div>

        <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)', marginBottom: 6, marginTop: 16 }}>Connexion</div>
        <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32 }}>Retrouve ton groupe et tes stats</div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Email</label>
          <input className="input" type="email" placeholder="ton@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>Mot de passe</label>
          <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{ textAlign: 'right', marginBottom: 24 }}>
          <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }}>Mot de passe oublié ?</span>
        </div>

        <button className="btn-primary" onClick={() => navigate('/home')} style={{ marginBottom: 16 }}>
          Se connecter
        </button>

        <div style={{ textAlign: 'center', fontSize: 14, color: 'var(--muted)' }}>
          Pas encore de compte ?{' '}
          <span onClick={() => navigate('/')} style={{ color: 'var(--blue)', fontWeight: 600, cursor: 'pointer' }}>S'inscrire</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0' }}>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--muted)' }}>ou continuer avec</span>
          <div style={{ flex: 1, height: '0.5px', background: 'var(--border)' }} />
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button onClick={() => navigate('/home')} style={{ flex: 1, padding: 14, borderRadius: 12, border: '1.5px solid var(--border)', background: '#fff', fontSize: 16, cursor: 'pointer', fontWeight: 700, color: '#EA4335' }}>
            G
          </button>
          <button onClick={() => navigate('/home')} style={{ flex: 1, padding: 14, borderRadius: 12, border: '1.5px solid #000', background: '#000', fontSize: 18, cursor: 'pointer', color: '#fff' }}>
            
          </button>
        </div>
      </div>
    </div>
  )
}
