import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { sportTypes } from '../data/mockData'

const STEPS = ['infos', 'sports', 'objectif', 'photo']

export default function Register() {
  const navigate = useNavigate()
  const { updateCurrentUser } = useApp()
  const [step, setStep] = useState(0)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedSports, setSelectedSports] = useState([])
  const [weeklyGoal, setWeeklyGoal] = useState(3)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [error, setError] = useState('')

  function toggleSport(id) {
    setSelectedSports(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    )
  }

  function handlePhoto(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPhotoPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  function nextStep() {
    if (step === 0) {
      if (!firstName.trim() || !lastName.trim()) {
        setError('Le prénom et le nom sont obligatoires')
        return
      }
      if (!email.trim()) {
        setError('L\'email est obligatoire')
        return
      }
      if (password.length < 6) {
        setError('Le mot de passe doit faire au moins 6 caractères')
        return
      }
      setError('')
    }
    if (step < STEPS.length - 1) {
      setStep(s => s + 1)
    } else {
      finish()
    }
  }

  function finish() {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()
    const user = {
      name: `${firstName} ${lastName}`,
      initials,
      username: `@${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      location: 'France 🇫🇷',
      bio: selectedSports.length > 0
        ? selectedSports.map(id => sportTypes.find(s => s.id === id)?.label).join(' · ')
        : 'Sportif motivé 💪',
      weeklyGoal,
      sports: selectedSports,
      photo: photoPreview,
      followers: 0,
      following: 0,
      groups: 0,
      totalActivities: 0,
      totalKm: 0,
      totalCalories: 0,
      bestPace: '-',
      totalPoints: 0,
      streakDays: 0,
      weeklyDone: 0,
      avatarColor: '#dbeafe',
      avatarTextColor: '#1d4ed8',
    }
    updateCurrentUser(user)
    navigate('/home')
  }

  const progress = ((step + 1) / STEPS.length) * 100

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--card)' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => step === 0 ? navigate('/') : setStep(s => s - 1)}
          style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text)', padding: 0 }}>←</button>
        <div style={{ flex: 1, height: 4, background: 'var(--bg)', borderRadius: 99, overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--blue)', borderRadius: 99, transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600 }}>{step + 1}/{STEPS.length}</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 24px 40px' }}>

        {/* STEP 1: Infos de base */}
        {step === 0 && (
          <>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Crée ton compte</div>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 28 }}>Commence par les infos essentielles</div>

            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>PRÉNOM *</label>
                <input className="input" placeholder="Lucas" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>NOM *</label>
                <input className="input" placeholder="Martin" value={lastName} onChange={e => setLastName(e.target.value)} />
              </div>
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>EMAIL *</label>
              <input className="input" type="email" placeholder="ton@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', display: 'block', marginBottom: 6 }}>MOT DE PASSE *</label>
              <input className="input" type="password" placeholder="Min. 6 caractères" value={password} onChange={e => setPassword(e.target.value)} />
            </div>

            {error && <div style={{ color: 'var(--red)', fontSize: 13, marginTop: 8, fontWeight: 500 }}>{error}</div>}
          </>
        )}

        {/* STEP 2: Sports */}
        {step === 1 && (
          <>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Tes sports 🏃</div>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 28 }}>Sélectionne tes activités favorites (optionnel)</div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {sportTypes.map(s => {
                const selected = selectedSports.includes(s.id)
                return (
                  <div key={s.id} onClick={() => toggleSport(s.id)} style={{
                    background: selected ? 'var(--blue-light)' : 'var(--bg)',
                    borderRadius: 14, padding: '16px 8px',
                    textAlign: 'center', cursor: 'pointer',
                    border: selected ? '2px solid var(--blue)' : '1px solid var(--border)',
                    transition: 'all 0.15s',
                  }}>
                    <div style={{ fontSize: 30 }}>{s.emoji}</div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: selected ? 'var(--blue)' : 'var(--text)', marginTop: 6 }}>{s.label}</div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* STEP 3: Objectif */}
        {step === 2 && (
          <>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Ton objectif 🎯</div>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32 }}>Combien de séances par semaine veux-tu faire ? (optionnel)</div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, margin: '20px 0 40px' }}>
              <button onClick={() => setWeeklyGoal(g => Math.max(1, g - 1))} style={{
                width: 52, height: 52, borderRadius: '50%', background: 'var(--bg)',
                border: '1.5px solid var(--border)', fontSize: 24, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text)',
              }}>−</button>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 64, fontWeight: 800, color: 'var(--blue)', lineHeight: 1 }}>{weeklyGoal}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>séance{weeklyGoal > 1 ? 's' : ''} / semaine</div>
              </div>
              <button onClick={() => setWeeklyGoal(g => Math.min(14, g + 1))} style={{
                width: 52, height: 52, borderRadius: '50%', background: 'var(--blue)',
                border: 'none', fontSize: 24, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
              }}>+</button>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[2, 3, 4, 5, 6].map(n => (
                <button key={n} onClick={() => setWeeklyGoal(n)} style={{
                  padding: '8px 18px', borderRadius: 20, fontSize: 14, fontWeight: 600,
                  border: weeklyGoal === n ? '2px solid var(--blue)' : '1px solid var(--border)',
                  background: weeklyGoal === n ? 'var(--blue-light)' : 'var(--bg)',
                  color: weeklyGoal === n ? 'var(--blue)' : 'var(--muted)',
                  cursor: 'pointer', fontFamily: 'inherit',
                }}>
                  {n}x/sem
                </button>
              ))}
            </div>
          </>
        )}

        {/* STEP 4: Photo */}
        {step === 3 && (
          <>
            <div style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>Ta photo 📸</div>
            <div style={{ fontSize: 15, color: 'var(--muted)', marginBottom: 32 }}>Ajoute une photo de profil (optionnel)</div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              <div style={{ position: 'relative' }}>
                {photoPreview ? (
                  <img src={photoPreview} style={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--blue)' }} />
                ) : (
                  <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, color: 'var(--blue)', border: '3px dashed var(--blue)' }}>
                    {firstName[0]}{lastName[0]}
                  </div>
                )}
                <label htmlFor="photo-input" style={{ position: 'absolute', bottom: 4, right: 4, width: 32, height: 32, background: 'var(--blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: '2px solid white', fontSize: 14 }}>
                  📷
                </label>
                <input id="photo-input" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
              </div>

              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text)' }}>{firstName} {lastName}</div>
                <div style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
                  {selectedSports.length > 0
                    ? selectedSports.map(id => sportTypes.find(s => s.id === id)?.emoji).join(' ')
                    : '🏃 Sportif motivé'}
                </div>
                <div style={{ fontSize: 13, color: 'var(--blue)', marginTop: 6, fontWeight: 600 }}>
                  Objectif : {weeklyGoal} séance{weeklyGoal > 1 ? 's' : ''}/semaine
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer buttons */}
      <div style={{ padding: '0 24px 40px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn-primary" onClick={nextStep}>
          {step === STEPS.length - 1 ? 'Créer mon compte 🎉' : 'Continuer'}
        </button>
        {step > 0 && (
          <button onClick={() => step === STEPS.length - 1 ? finish() : setStep(s => s + 1)}
            style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 14, cursor: 'pointer', fontFamily: 'inherit', padding: '8px' }}>
            Passer cette étape
          </button>
        )}
      </div>
    </div>
  )
}
