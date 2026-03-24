import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'

import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import Home from './pages/Home'
import Feed from './pages/Feed'
import LogActivity from './pages/LogActivity'
import { Groups, Leaderboard } from './pages/Groups'
import Profile from './pages/Profile'
import Progress from './pages/Progress'
import Notifications from './pages/Notifications'
import Challenges from './pages/Challenges'

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div style={{ height: '100dvh', width: '100%', overflow: 'hidden', position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/log" element={<LogActivity />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/groups/:id" element={<Leaderboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  )
}
