import React from 'react'
import { useNavigate } from 'react-router-dom'
import { weeklyActivity } from '../data/mockData'
import { useApp } from '../context/AppContext'
import { StatPill, MiniChart, ActivityIcon, IconBtn } from '../components/UI'
import BottomNav from '../components/BottomNav'

export default function Home() {
  const navigate = useNavigate()
  const { activities, groups, unreadCount, currentUser } = useApp()
  const myActivities = activities.filter(a => a.userId === 'u1').slice(0, 2)

  const pct = Math.round((currentUser.weeklyDone / currentUser.weeklyGoal) * 100)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Header */}
      <div style={{ background: 'var(--card)', padding: '12px 20px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, color: 'var(--muted)', fontWeight: 500 }}>Bonjour 👋</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{currentUser.name}</div>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <IconBtn onClick={() => navigate('/notifications')} badge={unreadCount}>🔔</IconBtn>
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/profile')}>
              <div className="avatar" style={{ width: 44, height: 44, background: currentUser.avatarColor, color: currentUser.avatarTextColor, fontSize: 16, fontWeight: 700 }}>
                {currentUser.initials}
              </div>
              <div style={{ position: 'absolute', bottom: 1, right: 1, width: 10, height: 10, background: 'var(--green)', borderRadius: '50%', border: '2px solid var(--card)' }} />
            </div>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)' }}>
        {/* Weekly goal */}
        <div style={{ margin: '14px 16px 0', padding: 18, background: 'var(--blue)', borderRadius: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -10, top: -10, width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
          <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: 1, marginBottom: 4 }}>OBJECTIF HEBDO</div>
          <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1 }}>{currentUser.weeklyDone} <span style={{ fontSize: 20, opacity: 0.7 }}>/ {currentUser.weeklyGoal}</span></div>
          <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14 }}>séances complétées</div>
          <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
            <div style={{ width: `${pct}%`, height: '100%', background: '#fff', borderRadius: 99 }} />
          </div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
            {currentUser.weeklyGoal - currentUser.weeklyDone === 0
              ? '🎉 Objectif atteint !'
              : `Plus que ${currentUser.weeklyGoal - currentUser.weeklyDone} séance${currentUser.weeklyGoal - currentUser.weeklyDone > 1 ? 's' : ''} pour finir la semaine !`}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 10, margin: '12px 16px 0' }}>
          <StatPill value="24.7" label="km ce mois" color="var(--blue)" />
          <StatPill value="2 840" label="calories" color="var(--orange)" />
          <StatPill value={`${currentUser.streakDays}j`} label="streak 🔥" color="var(--green)" />
        </div>

        {/* Weekly chart */}
        <div style={{ margin: '14px 16px 0' }}>
          <div className="card-sm">
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--muted)', marginBottom: 10 }}>ACTIVITÉ CETTE SEMAINE</div>
            <MiniChart data={weeklyActivity} />
          </div>
        </div>

        {/* Recent activities */}
        <div className="section-title">
          <span>Dernières activités</span>
          <span onClick={() => navigate('/feed')} style={{ fontSize: 13, color: 'var(--blue)', cursor: 'pointer' }}>Voir tout</span>
        </div>

        {myActivities.map(activity => (
          <div key={activity.id} className="card" style={{ padding: '12px 14px', margin: '0 16px 10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ActivityIcon type={activity.type} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{activity.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{activity.date}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)' }}>
                  {activity.km ? `${activity.km} km` : activity.duration}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>
                  {activity.km ? activity.duration : `${activity.calories} cal`}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
              {activity.pace && <span className="badge badge-blue">{activity.pace}</span>}
              <span className="badge badge-green">+{activity.points} pts</span>
              {activity.isRecord && <span className="badge badge-gold">🔥 Nouveau record</span>}
            </div>
          </div>
        ))}

        {/* My groups */}
        <div className="section-title">
          <span>Mes groupes actifs</span>
          <span onClick={() => navigate('/groups')} style={{ fontSize: 13, color: 'var(--blue)', cursor: 'pointer' }}>Voir tout</span>
        </div>

        <div style={{ display: 'flex', gap: 10, padding: '0 16px 4px', overflowX: 'auto' }}>
          {groups.map(g => (
            <div key={g.id} className="card-sm" onClick={() => navigate(`/groups/${g.id}`)}
              style={{ flexShrink: 0, width: 140, padding: 14, cursor: 'pointer' }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{g.emoji}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{g.name}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginTop: 3 }}>{g.members} membres</div>
              <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: g.myRank === 1 ? 'var(--gold)' : 'var(--blue)' }}>
                  #{g.myRank} {g.myRank === 1 ? '🥇' : ''}
                </span>
              </div>
            </div>
          ))}
          <div className="card-sm" onClick={() => navigate('/groups')}
            style={{ flexShrink: 0, width: 120, padding: 14, cursor: 'pointer', border: '1.5px dashed var(--border)', background: 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            <div style={{ fontSize: 24, color: 'var(--blue)' }}>+</div>
            <div style={{ fontSize: 12, color: 'var(--blue)', fontWeight: 600 }}>Rejoindre</div>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
