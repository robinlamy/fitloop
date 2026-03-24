import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { users, challenges } from '../data/mockData'
import { Avatar, ActivityIcon, TabBar, TopBar, IconBtn } from '../components/UI'
import BottomNav from '../components/BottomNav'

function ActivityCard({ activity, onLike }) {
  const user = users[activity.userId]
  const liked = activity.liked

  return (
    <div style={{ padding: '16px 20px', borderBottom: '0.5px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <Avatar initials={user.initials} bg={user.avatarBg} color={user.avatarColor} size={40} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{user.name}</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>{activity.date}</div>
        </div>
        <span className="badge badge-green">+{activity.points} pts</span>
      </div>

      {activity.note && (
        <div style={{ fontSize: 14, color: 'var(--text)', marginBottom: 10 }}>{activity.note}</div>
      )}

      <div style={{ background: 'var(--bg)', borderRadius: 12, padding: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <ActivityIcon type={activity.type} size={32} />
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>{activity.title}</div>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {activity.km && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{activity.km}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>km</div>
            </div>
          )}
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{activity.duration}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>durée</div>
          </div>
          {activity.pace && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{activity.pace}</div>
              <div style={{ fontSize: 11, color: 'var(--muted)' }}>/km</div>
            </div>
          )}
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--text)' }}>{activity.calories}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>cal</div>
          </div>
        </div>
        {activity.type === 'run' && (
          <div style={{ background: '#e8f0fe', borderRadius: 10, height: 72, marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
            <svg width="100%" height="72" viewBox="0 0 300 72" preserveAspectRatio="none" style={{ position: 'absolute' }}>
              <polyline points="0,55 40,42 70,50 100,25 140,38 170,18 200,32 230,15 265,28 300,22"
                fill="none" stroke="#4A7CF7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
        <button onClick={() => onLike(activity.id)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, color: liked ? 'var(--red)' : 'var(--muted)',
          fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5,
          fontFamily: 'inherit', padding: 0,
        }}>
          {liked ? '❤️' : '🤍'} {activity.likes}
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'inherit', padding: 0 }}>
          💬 {activity.comments}
        </button>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--muted)', fontWeight: 600, fontFamily: 'inherit', padding: 0, marginLeft: 'auto' }}>
          ↗️ Partager
        </button>
      </div>
    </div>
  )
}

function ChallengeCard({ challenge, onJoin }) {
  const pct = Math.round((challenge.current / challenge.goal) * 100)
  return (
    <div style={{ background: 'linear-gradient(135deg, var(--blue) 0%, #6366f1 100%)', borderRadius: 20, padding: 20, margin: '0 16px 16px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', right: -20, top: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
      <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, letterSpacing: 1 }}>CHALLENGE DU MOIS</div>
      <div style={{ fontSize: 20, fontWeight: 800, margin: '6px 0 4px' }}>{challenge.title}</div>
      <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 14 }}>{challenge.participants} participants · {challenge.daysLeft} jours restants</div>
      <div style={{ background: 'rgba(255,255,255,0.25)', borderRadius: 99, height: 6, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: '#fff', borderRadius: 99 }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 13, opacity: 0.9 }}>{challenge.current} / {challenge.goal} {challenge.unit}</div>
        {!challenge.joined && (
          <button onClick={() => onJoin(challenge.id)} style={{ background: '#fff', color: 'var(--blue)', border: 'none', padding: '8px 16px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
            Rejoindre
          </button>
        )}
        {challenge.joined && <span style={{ fontSize: 13, opacity: 0.9, fontWeight: 600 }}>✓ Inscrit</span>}
      </div>
    </div>
  )
}

const TABS = [
  { id: 'all', label: 'Tout' },
  { id: 'friends', label: 'Amis' },
  { id: 'groups', label: 'Groupes' },
]

export default function Feed() {
  const navigate = useNavigate()
  const { activities, toggleLike, joinChallenge, challenges, unreadCount } = useApp()
  const [tab, setTab] = useState('all')

  const filtered = tab === 'friends'
    ? activities.filter(a => a.userId !== 'u1')
    : tab === 'groups'
    ? activities.filter(a => a.groupId)
    : activities

  const mainChallenge = challenges.find(c => c.id === 'c1')

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar title="Feed" right={<IconBtn onClick={() => navigate('/notifications')} badge={unreadCount}>🔔</IconBtn>} />
      <TabBar tabs={TABS} active={tab} onChange={setTab} />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)', marginTop: 8 }}>
        {mainChallenge && <ChallengeCard challenge={mainChallenge} onJoin={joinChallenge} />}
        {filtered.map(a => <ActivityCard key={a.id} activity={a} onLike={toggleLike} />)}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>😴</div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Rien à afficher</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Invite des amis pour voir leurs activités !</div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
