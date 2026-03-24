import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { monthlyProgress, weeklyActivity } from '../data/mockData'
import { TabBar, TopBar } from '../components/UI'
import BottomNav from '../components/BottomNav'

const PERIODS = [
  { id: 'week', label: 'Semaine' },
  { id: 'month', label: 'Mois' },
  { id: 'year', label: 'Année' },
]

const yearData = [
  { month: 'Avr', km: 45, sessions: 8 },
  { month: 'Mai', km: 58, sessions: 11 },
  { month: 'Jun', km: 72, sessions: 14 },
  { month: 'Jul', km: 55, sessions: 10 },
  { month: 'Aoû', km: 38, sessions: 7 },
  { month: 'Sep', km: 67, sessions: 13 },
  { month: 'Oct', km: 71, sessions: 14 },
  { month: 'Nov', km: 62, sessions: 12 },
  { month: 'Déc', km: 38, sessions: 7 },
  { month: 'Jan', km: 71, sessions: 13 },
  { month: 'Fév', km: 88, sessions: 17 },
  { month: 'Mar', km: 104, sessions: 19 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--card)', border: '0.5px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 13 }}>
        <div style={{ fontWeight: 700, marginBottom: 2 }}>{label}</div>
        <div style={{ color: 'var(--blue)' }}>{payload[0]?.value} {payload[0]?.name === 'km' ? 'km' : 'séances'}</div>
      </div>
    )
  }
  return null
}

export default function Progress() {
  const navigate = useNavigate()
  const [period, setPeriod] = useState('year')
  const [metric, setMetric] = useState('km')

  const data = period === 'year' ? yearData : period === 'month' ? monthlyProgress : weeklyActivity.map(d => ({ ...d, month: d.day, sessions: d.done ? 1 : 0 }))

  const totalKm = yearData.reduce((s, d) => s + d.km, 0)
  const totalSessions = yearData.reduce((s, d) => s + d.sessions, 0)
  const avgKm = Math.round(totalKm / 12)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg)' }}>
      <TopBar title="Mes progrès" right={
        <button onClick={() => navigate('/profile')} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text)' }}>👤</button>
      } />

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 'calc(var(--nav-h) + 12px)' }}>
        {/* Summary cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, margin: '14px 16px 0' }}>
          <div style={{ background: 'var(--blue)', borderRadius: 14, padding: '14px 10px', textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#fff' }}>{totalKm}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>km cette année</div>
          </div>
          <div className="card-sm" style={{ textAlign: 'center', padding: '14px 10px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)' }}>{totalSessions}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>séances totales</div>
          </div>
          <div className="card-sm" style={{ textAlign: 'center', padding: '14px 10px' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green)' }}>{avgKm}</div>
            <div style={{ fontSize: 10, color: 'var(--muted)', fontWeight: 600 }}>km/mois moy.</div>
          </div>
        </div>

        {/* Period tabs */}
        <TabBar tabs={PERIODS} active={period} onChange={setPeriod} />

        {/* Metric toggle */}
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px 0' }}>
          {['km', 'sessions'].map(m => (
            <button key={m} onClick={() => setMetric(m)} style={{
              padding: '6px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600,
              border: metric === m ? '1.5px solid var(--blue)' : '1px solid var(--border)',
              background: metric === m ? 'var(--blue-light)' : 'transparent',
              color: metric === m ? 'var(--blue)' : 'var(--muted)',
              cursor: 'pointer', fontFamily: 'inherit',
            }}>
              {m === 'km' ? 'Distance' : 'Séances'}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div style={{ margin: '14px 16px 0', background: 'var(--card)', borderRadius: 16, padding: '16px 8px 8px', border: '0.5px solid var(--border)' }}>
          <div style={{ padding: '0 8px 12px', fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>
            {metric === 'km' ? 'Distance (km)' : 'Nombre de séances'}
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data} margin={{ top: 4, right: 8, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4A7CF7" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4A7CF7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey={period === 'week' ? 'day' : 'month'} tick={{ fontSize: 11, fill: '#8a8fa8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8a8fa8' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey={metric === 'km' ? 'km' : 'sessions'} name={metric} stroke="#4A7CF7" strokeWidth={2.5} fill="url(#grad)" dot={{ fill: '#4A7CF7', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Records */}
        <div style={{ padding: '16px 20px 8px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>Personal Records</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '0 16px' }}>
          {[
            { label: 'Plus longue course', value: '21.3 km', emoji: '🏃', date: 'Jan 2025' },
            { label: 'Meilleure allure', value: '4\'58\"/km', emoji: '⚡', date: 'Fév 2025' },
            { label: 'Plus long streak', value: '18 jours', emoji: '🔥', date: 'Nov 2024' },
            { label: 'Mois le + actif', value: '19 séances', emoji: '📅', date: 'Mar 2025' },
          ].map((r, i) => (
            <div key={i} className="card-sm" style={{ padding: 14 }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{r.emoji}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text)' }}>{r.value}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{r.label}</div>
              <div style={{ fontSize: 11, color: 'var(--blue)', marginTop: 4 }}>{r.date}</div>
            </div>
          ))}
        </div>

        {/* Activity breakdown */}
        <div style={{ padding: '16px 20px 8px', fontSize: 17, fontWeight: 700, color: 'var(--text)' }}>Répartition par sport</div>
        <div style={{ margin: '0 16px', background: 'var(--card)', borderRadius: 16, padding: 16, border: '0.5px solid var(--border)' }}>
          {[
            { sport: 'Course 🏃', pct: 55, color: 'var(--blue)' },
            { sport: 'Muscu 🏋️', pct: 30, color: 'var(--orange)' },
            { sport: 'Yoga 🧘', pct: 10, color: 'var(--green)' },
            { sport: 'Vélo 🚴', pct: 5, color: 'var(--gold)' },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: i < 3 ? 12 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{s.sport}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: s.color }}>{s.pct}%</span>
              </div>
              <div style={{ height: 6, background: 'var(--bg)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${s.pct}%`, height: '100%', background: s.color, borderRadius: 99 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
