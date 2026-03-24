import React from 'react'
import { useNavigate } from 'react-router-dom'
import { currentUser, badges } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { ActivityIcon } from '../components/UI'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const navigate = useNavigate()
  const { activities } = useApp()
  const myActivities = activities.filter(a => a.userId === 'u1').slice(0, 3)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)' }}>
        {/* Header */}
        <div style={{ background: 'var(--card)', padding: '16px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <div style={{ position: 'relative' }}>
              <div className="avatar" style={{ width: 72, height: 72, background: currentUser.avatarColor, color: currentUser.avatarTextColor, fontSize: 26, fontWeight: 800 }}>
                {currentUser.initials}
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, background: 'var(--blue)', borderRadius: '50%', border: '2px solid var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: '#fff' }}>✎</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{currentUser.name}</div>
              <div style={{ fontSize: 14, color: 'var(--muted)' }}>{currentUser.username} · {currentUser.location}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{currentUser.bio}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 0, borderTop: '0.5px solid var(--border)', paddingTop: 14 }}>
            {[
              { val: currentUser.totalActivities, label: 'Activités' },
              { val: currentUser.followers, label: 'Abonnés' },
              { val: currentUser.following, label: 'Abonnements' },
              { val: currentUser.groups, label: 'Groupes' },
            ].map((s, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '14px 16px 0' }}>
          {[
            { val: `${currentUser.totalKm} km`, label: 'Ce mois', color: 'var(--blue)' },
            { val: currentUser.totalCalories.toLocaleString('fr'), label: 'Calories totales', color: 'var(--orange)' },
            { val: currentUser.bestPace, label: 'Meilleure allure', color: 'var(--green)' },
            { val: currentUser.totalPoints.toLocaleString('fr'), label: 'Points totaux', color: 'var(--gold)' },
          ].map((s, i) => (
            <div key={i} className="card-sm" style={{ textAlign: 'center', padding: 14 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', fontWeight: 600, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Progress link */}
        <div style={{ margin: '12px 16px 0' }}>
          <button onClick={() => navigate('/progress')} style={{ width: '100%', padding: '13px', background: 'var(--blue-light)', border: 'none', borderRadius: 12, color: 'var(--blue)', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            📊 Voir tous mes progrès
          </button>
        </div>

        {/* Badges */}
        <div style={{ padding: '16px 20px 8px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>Badges</div>
        <div style={{ display: 'flex', gap: 12, padding: '0 16px 4px', overflowX: 'auto' }}>
          {badges.map(b => (
            <div key={b.id} style={{ flexShrink: 0, textAlign: 'center', width: 70, opacity: b.unlocked ? 1 : 0.35 }}>
              <div style={{ width: 52, height: 52, background: b.unlocked ? 'var(--blue-light)' : 'var(--bg)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, margin: '0 auto 6px', border: b.unlocked ? 'none' : '1.5px dashed var(--border)' }}>
                {b.emoji}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>{b.label}</div>
            </div>
          ))}
        </div>

        {/* Recent activities */}
        <div style={{ padding: '16px 20px 8px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>Activités récentes</div>
        {myActivities.map(a => (
          <div key={a.id} className="card" style={{ padding: '12px 14px', margin: '0 16px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ActivityIcon type={a.type} size={36} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{a.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.date} · {a.km ? `${a.km} km` : a.duration}</div>
              </div>
              {a.isRecord && <span className="badge badge-gold">🔥 PR</span>}
              {!a.isRecord && <span className="badge badge-blue">+{a.points} pts</span>}
            </div>
          </div>
        ))}

        {/* Settings */}
        <div style={{ margin: '8px 16px 0' }}>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {[
              { icon: '⚙️', label: 'Paramètres' },
              { icon: '🔔', label: 'Notifications', action: () => navigate('/notifications') },
              { icon: '🔒', label: 'Confidentialité' },
              { icon: '❓', label: 'Aide' },
              { icon: '🚪', label: 'Se déconnecter', color: 'var(--red)', action: () => navigate('/') },
            ].map((item, i) => (
              <div key={i} onClick={item.action} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: i < 4 ? '0.5px solid var(--border)' : 'none', cursor: 'pointer' }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span style={{ fontSize: 15, fontWeight: 500, color: item.color || 'var(--text)' }}>{item.label}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: 14 }}>›</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
