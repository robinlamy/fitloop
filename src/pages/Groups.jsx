import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { users } from '../data/mockData'
import { Avatar, TabBar, TopBar, ProgressBar } from '../components/UI'
import BottomNav from '../components/BottomNav'

const suggestedGroups = [
  { id: 'sg1', name: 'Cyclistes Parisiens', emoji: '🚴', members: 23, type: 'Vélo', bg: '#fef9c3' },
  { id: 'sg2', name: 'Nageurs Paris 16', emoji: '🏊', members: 15, type: 'Natation', bg: '#cffafe' },
  { id: 'sg3', name: 'Trail Runners Paris', emoji: '🥾', members: 31, type: 'Trail', bg: '#d1fae5' },
]

export function Groups() {
  const navigate = useNavigate()
  const { groups } = useApp()
  const [search, setSearch] = useState('')

  const filtered = groups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar title="Mes groupes" right={
        <button onClick={() => navigate('/groups/create')} style={{ background: 'var(--blue)', color: '#fff', border: 'none', borderRadius: 20, padding: '6px 14px', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
          + Créer
        </button>
      } />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)' }}>
        <div style={{ padding: '14px 16px 6px' }}>
          <input className="input" placeholder="Rechercher un groupe..." value={search} onChange={e => setSearch(e.target.value)} style={{ fontSize: 14 }} />
        </div>

        <div style={{ padding: '8px 20px 4px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.5 }}>MES GROUPES</div>

        {filtered.map(g => (
          <div key={g.id} onClick={() => navigate(`/groups/${g.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '0.5px solid var(--border)', cursor: 'pointer', background: 'var(--card)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: g.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {g.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{g.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{g.members} membres · {g.lastActive}</div>
              <div style={{ marginTop: 8 }}>
                <ProgressBar value={g.progress * 100} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: g.myRank === 1 ? 'var(--gold)' : 'var(--blue)' }}>
                #{g.myRank} {g.myRank === 1 ? '🥇' : ''}
              </div>
              <div style={{ fontSize: 10, color: 'var(--muted)' }}>ton rang</div>
            </div>
          </div>
        ))}

        <div style={{ padding: '16px 20px 8px', fontSize: 12, fontWeight: 700, color: 'var(--muted)', letterSpacing: 0.5 }}>GROUPES RECOMMANDÉS</div>

        {suggestedGroups.map(g => (
          <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: '0.5px solid var(--border)', background: 'var(--card)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: g.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, flexShrink: 0 }}>
              {g.emoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>{g.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{g.members} membres · {g.type}</div>
            </div>
            <button style={{ background: 'var(--blue-light)', color: 'var(--blue)', border: 'none', padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>
              Rejoindre
            </button>
          </div>
        ))}

        <div style={{ padding: '14px 16px 4px' }}>
          <button className="btn-outline">+ Créer un nouveau groupe</button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}

const LB_TABS = [
  { id: 'km', label: 'Km parcourus' },
  { id: 'sessions', label: 'Séances' },
  { id: 'points', label: 'Points' },
]

export function Leaderboard() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { groups } = useApp()
  const [tab, setTab] = useState('km')

  const group = groups.find(g => g.id === id) || groups[0]

  const sorted = [...group.leaderboard].sort((a, b) => {
    if (tab === 'km') return b.km - a.km
    if (tab === 'sessions') return b.sessions - a.sessions
    return b.points - a.points
  })

  const myEntry = sorted.find(e => e.userId === 'u1')
  const myPos = sorted.findIndex(e => e.userId === 'u1')
  const leader = sorted[0]

  const gap = myPos > 0 ? (
    tab === 'km' ? (leader.km - (myEntry?.km || 0)).toFixed(1) + ' km'
    : tab === 'sessions' ? (leader.sessions - (myEntry?.sessions || 0)) + ' séances'
    : (leader.points - (myEntry?.points || 0)) + ' pts'
  ) : null

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      {/* Hero */}
      <div style={{ background: 'var(--blue)', padding: '48px 20px 24px', position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <div style={{ position: 'absolute', right: -30, top: 20, width: 150, height: 150, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <button onClick={() => navigate('/groups')} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 20, padding: '6px 12px', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', marginBottom: 12, fontFamily: 'inherit' }}>
          ← Groupes
        </button>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#fff' }}>{group.emoji} {group.name}</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 }}>{group.members} membres · Semaine du 18 mars</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
          {group.totalKmMonth > 0 && (
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 16px', textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{group.totalKmMonth}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>km total</div>
            </div>
          )}
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{group.totalSessions}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>séances</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: '10px 16px', textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#fff' }}>{group.daysLeft}j</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>restants</div>
          </div>
        </div>
      </div>

      <TabBar tabs={LB_TABS} active={tab} onChange={setTab} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px 20px' }}>
        {sorted.map((entry, i) => {
          const user = users[entry.userId]
          const isMe = entry.userId === 'u1'
          const medals = ['🥇', '🥈', '🥉']

          return (
            <div key={entry.userId} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: isMe ? 'var(--blue-light)' : i < 3 ? `rgba(245,158,11,${0.08 - i * 0.02})` : 'transparent',
              borderRadius: 12, padding: '12px 14px', marginBottom: 6,
              border: isMe ? '1.5px solid var(--blue)' : 'none',
            }}>
              <div style={{ width: 28, textAlign: 'center', fontSize: i < 3 ? 18 : 13, fontWeight: 800, color: i === 0 ? 'var(--gold)' : i === 1 ? '#94a3b8' : i === 2 ? '#b45309' : 'var(--muted)', flexShrink: 0 }}>
                {i < 3 ? medals[i] : i + 1}
              </div>
              <Avatar initials={user.initials} bg={user.avatarBg} color={user.avatarColor} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
                  {user.name.split(' ')[0]} {user.name.split(' ')[1]?.[0]}.
                  {isMe && <span style={{ fontSize: 11, color: 'var(--blue)', marginLeft: 6 }}>(toi)</span>}
                </div>
                <div style={{ fontSize: 11, color: 'var(--muted)' }}>{entry.sessions} séances cette semaine</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 17, fontWeight: 800, color: 'var(--text)' }}>
                  {tab === 'km' ? `${entry.km} km` : tab === 'sessions' ? `${entry.sessions}` : entry.points}
                </div>
                <span className={`badge ${i === 0 ? 'badge-gold' : isMe ? 'badge-blue' : 'badge-orange'}`}>
                  {tab === 'points' ? `${entry.points} pts` : `${entry.points} pts`}
                </span>
              </div>
            </div>
          )
        })}

        {gap && myPos > 0 && (
          <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '14px 16px', marginTop: 8, border: '0.5px solid var(--border)' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>💡 Pour passer #1</div>
            <div style={{ fontSize: 13, color: 'var(--muted)' }}>
              Il te manque <strong style={{ color: 'var(--blue)' }}>{gap}</strong> pour dépasser {users[leader.userId]?.name.split(' ')[0]}. Une bonne séance et c'est dans la poche !
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
