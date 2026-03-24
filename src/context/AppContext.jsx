import React, { createContext, useContext, useState } from 'react'
import { activities as initialActivities, notifications as initialNotifs, groups as initialGroups, challenges as initialChallenges, currentUser as defaultUser } from '../data/mockData'

const AppContext = createContext(null)

function loadFromStorage(key, fallback) {
  try {
    const val = localStorage.getItem(key)
    return val ? JSON.parse(val) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => loadFromStorage('fl_user', null))
  const [activities, setActivities] = useState(initialActivities)
  const [notifications, setNotifications] = useState(initialNotifs)
  const [groups, setGroups] = useState(initialGroups)
  const [challenges, setChallenges] = useState(initialChallenges)
  const [likedActivities, setLikedActivities] = useState(new Set(['a3']))

  const unreadCount = notifications.filter(n => !n.read).length
  const user = currentUser || defaultUser

  function updateCurrentUser(userData) {
    setCurrentUser(userData)
    localStorage.setItem('fl_user', JSON.stringify(userData))
  }

  function logout() {
    setCurrentUser(null)
    localStorage.removeItem('fl_user')
  }

  function toggleLike(activityId) {
    setLikedActivities(prev => {
      const next = new Set(prev)
      if (next.has(activityId)) next.delete(activityId)
      else next.add(activityId)
      return next
    })
    setActivities(prev => prev.map(a =>
      a.id === activityId
        ? { ...a, likes: likedActivities.has(activityId) ? a.likes - 1 : a.likes + 1, liked: !a.liked }
        : a
    ))
  }

  function addActivity(activity) {
    setActivities(prev => [activity, ...prev])
    if (currentUser) {
      const updated = {
        ...currentUser,
        totalActivities: (currentUser.totalActivities || 0) + 1,
        totalKm: parseFloat(((currentUser.totalKm || 0) + (activity.km || 0)).toFixed(1)),
        totalCalories: (currentUser.totalCalories || 0) + (activity.calories || 0),
        totalPoints: (currentUser.totalPoints || 0) + (activity.points || 0),
        weeklyDone: (currentUser.weeklyDone || 0) + 1,
        streakDays: (currentUser.streakDays || 0) + 1,
      }
      updateCurrentUser(updated)
    }
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  function joinChallenge(challengeId) {
    setChallenges(prev => prev.map(c =>
      c.id === challengeId ? { ...c, joined: true, participants: c.participants + 1 } : c
    ))
  }

  return (
    <AppContext.Provider value={{
      currentUser: user,
      isLoggedIn: !!currentUser,
      updateCurrentUser,
      logout,
      activities, likedActivities, toggleLike, addActivity,
      notifications, unreadCount, markAllRead,
      groups, challenges, joinChallenge,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
