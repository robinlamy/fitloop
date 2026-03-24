import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sportTypes, groups } from '../data/mockData'
import { useApp } from '../context/AppContext'

export default function LogActivity() {
  const navigate = useNavigate()
  const { addActivity } = useApp()
  const [sport, setSport] = useState('run')
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('')
  const [distance, setDistance] = useState('')
  const [note, setNote] = useState('')
  const [selectedGroups, setSelectedGroups] = useState(['g1'])
  const [published, setPublished] = useState(false)

  const selectedSport = sportTypes.find(s => s.id === sport)

  function toggleGroup(id) {
    setSelectedGroups(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  function publish() {
    const newActivity = {
      id: `a${Date.now()}`,
      userId: 'u1',
      type: sport,
      emoji: selectedSport.emoji,
      title: title || `${selectedSport.label} – ${new Date().toLocaleDateString('fr-FR')}`,
      date: "À l'instant",
      km: distance ? parseFloat(distance) : null,
      duration: duration ? `${duration} min` : '0 min',
      calories: Math.round((parseInt(duration) || 0) * 7.5),
      pace: (distance && duration) ? `${Math.floor(parseInt(duration) / parseFloat(distance))}'${String(Math.round(((parseInt(duration) / parseFloat(distance)) % 1) * 60)).padStart(2, '0')}"` : null,
      points: Math.round((parseInt(duration) || 0) * 0.8),
      isRecord: false,
      likes: 0,
      liked: false,
      comments: 0,
      groupId: selectedGroups[0] || null,
      note: note || null,
    }
    addActivity(newActivity)
    setPublished(true)
    setTimeout(() => navigate('/home'), 1500)
  }

  if (published) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--card)', padding: 32, textAlign: 'center' }}>
        <div style={{ fontSize: 72, marginBottom: 16 }}>🎉</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 8 }}>Activité publiée !</div>
        <div style={{ fontSize: 15, color: 'var(--muted)' }}>Tes amis vont voir ça dans le feed</div>
      </div>
    )
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--card)', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12, borderBottom: '0.5px solid var(--border)', flexShrink: 0 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text)', padding: 0 }}>←</button>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>Ajouter une activité</h1>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 20px' }}>
        {/* Sport type */}
        <div style={{ padding: '14px 20px 8px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.5 }}>TYPE D'ACTIVITÉ</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, padding: '0 16px 16px' }}>
          {sportTypes.map(s => (
            <div key={s.id} onClick={() => setSport(s.id)} style={{
              background: 'var(--card)', borderRadius: 12, padding: '14px 8px',
              textAlign: 'center', cursor: 'pointer',
              border: sport === s.id ? '2px solid var(--blue)' : '0.5px solid var(--border)',
              transition: 'all 0.15s',
            }}>
              <div style={{ fontSize: 28 }}>{s.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '0 16px' }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>TITRE</label>
            <input className="input" placeholder={`${selectedSport.label}…`} value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>DURÉE (min)</label>
              <input className="input" type="number" placeholder="42" value={duration} onChange={e => setDuration(e.target.value)} />
            </div>
            {selectedSport.hasDistance && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>DISTANCE (km)</label>
                <input className="input" type="number" step="0.1" placeholder="8.3" value={distance} onChange={e => setDistance(e.target.value)} />
              </div>
            )}
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6, letterSpacing: 0.5 }}>NOTE / RESSENTI</label>
            <textarea className="input" rows={2} placeholder="Décris ta séance..." value={note} onChange={e => setNote(e.target.value)} style={{ resize: 'none' }} />
          </div>

          <div>
            <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 10, letterSpacing: 0.5 }}>PARTAGER AVEC</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {groups.map(g => {
                const sel = selectedGroups.includes(g.id)
                return (
                  <div key={g.id} onClick={() => toggleGroup(g.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: sel ? 'var(--blue-light)' : 'var(--bg)',
                    borderRadius: 20, padding: '7px 14px', cursor: 'pointer',
                    border: sel ? '1.5px solid var(--blue)' : '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: 13 }}>{g.emoji}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: sel ? 'var(--blue)' : 'var(--muted)' }}>{g.name}</span>
                    {sel && <span style={{ fontSize: 12, color: 'var(--blue)' }}>✓</span>}
                  </div>
                )
              })}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--bg)', borderRadius: 20, padding: '7px 14px', cursor: 'pointer', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 13 }}>🌍</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--muted)' }}>Public</span>
              </div>
            </div>
          </div>

          {(duration || distance) && (
            <div style={{ background: 'var(--blue-light)', borderRadius: 12, padding: 14 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--blue)', marginBottom: 6 }}>APERÇU</div>
              <div style={{ display: 'flex', gap: 20 }}>
                {distance && <div><span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{distance}</span> <span style={{ fontSize: 12, color: 'var(--muted)' }}>km</span></div>}
                {duration && <div><span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{duration}</span> <span style={{ fontSize: 12, color: 'var(--muted)' }}>min</span></div>}
                {duration && <div><span style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>+{Math.round(parseInt(duration) * 0.8)}</span> <span style={{ fontSize: 12, color: 'var(--muted)' }}>pts</span></div>}
              </div>
            </div>
          )}

          <button className="btn-primary" onClick={publish} style={{ marginTop: 6 }}>
            Publier l'activité 🎉
          </button>
        </div>
      </div>
    </div>
  )
}
