import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const slides = [
  {
    emoji: null,
    title: 'FitLoop',
    subtitle: 'La motivation collective qui transforme tes séances en victoires partagées',
  },
  {
    emoji: '👥',
    title: 'Des groupes qui motivent',
    subtitle: 'Rejoins de petits groupes d\'accountability et booste ta régularité grâce à tes amis',
  },
  {
    emoji: '🏆',
    title: 'Progresse ensemble',
    subtitle: 'Classements, challenges, badges… la compétition amicale qui te pousse à te dépasser',
  },
]

export default function Onboarding() {
  const navigate = useNavigate()
  const [slide, setSlide] = useState(0)

  function next() {
    if (slide < slides.length - 1) setSlide(s => s + 1)
    else navigate('/login')
  }

  const s = slides[slide]

  return (
    <div style={{
      height: '100%', display: 'flex', flexDirection: 'column',
      background: 'var(--blue)', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', right: -40, top: 60, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
      <div style={{ position: 'absolute', left: -60, top: 200, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', right: 40, bottom: 200, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 32px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div style={{ width: 96, height: 96, background: 'rgba(255,255,255,0.18)', borderRadius: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          {s.emoji ? (
            <span style={{ fontSize: 48 }}>{s.emoji}</span>
          ) : (
            <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
              <circle cx="21" cy="29" r="14" stroke="white" stroke-width="5" fill="none" />
              <circle cx="37" cy="29" r="14" stroke="rgba(255,255,255,0.5)" stroke-width="5" fill="none" />
            </svg>
          )}
        </div>
        <div style={{ fontSize: slide === 0 ? 40 : 28, fontWeight: 800, color: '#fff', letterSpacing: -1, marginBottom: 12, lineHeight: 1.1 }}>
          {s.title}
        </div>
        <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 280 }}>
          {s.subtitle}
        </div>
      </div>

      <div style={{ padding: '0 24px 48px', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setSlide(i)} style={{
              width: i === slide ? 24 : 8, height: 8, borderRadius: 99,
              background: i === slide ? '#fff' : 'rgba(255,255,255,0.35)',
              transition: 'all 0.25s', cursor: 'pointer',
            }} />
          ))}
        </div>
        <button onClick={next} className="btn-primary" style={{ background: '#fff', color: 'var(--blue)', marginBottom: 12 }}>
          {slide < slides.length - 1 ? 'Suivant' : 'Commencer'}
        </button>
        <button onClick={() => navigate('/login')} className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.5)', color: '#fff' }}>
          J'ai déjà un compte
        </button>
      </div>
    </div>
  )
}
