import React, { createContext, useContext, useState } from 'react'
import { activities as initialActivities, notifications as initialNotifs, groups as initialGroups, challenges as initialChallenges } from '../data/mockData'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [activities, setActivities] = useState(initialActivities)
  const [notifications, setNotifications] = useState(initialNotifs)
  const [groups, setGroups] = useState(initialGroups)
  const [challenges, setChallenges] = useState(initialChallenges)
  const [likedActivities, setLikedActivities] = useState(new Set(['a3']))

  const unreadCount = notifications.filter(n => !n.read).length

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
