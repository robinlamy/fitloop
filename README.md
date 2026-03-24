# FitLoop 🏃

Application mobile web de fitness sociale avec accountability en groupes.

## Stack technique
- React 18 + Vite
- React Router v6
- Recharts (graphiques)
- Lucide React (icônes)

## Lancer en local

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173 sur ton téléphone (même réseau WiFi) ou dans Chrome DevTools en mode mobile.

## Déployer sur Vercel

### Option 1 — Via GitHub (recommandé)

1. Crée un repo GitHub et push ce projet :
```bash
git init
git add .
git commit -m "feat: FitLoop prototype"
git remote add origin https://github.com/TON_USERNAME/fitloop.git
git push -u origin main
```

2. Va sur https://vercel.com
3. Clique "Add New Project" → importe ton repo GitHub
4. Laisse tous les paramètres par défaut (Vite est détecté automatiquement)
5. Clique "Deploy" → tu obtiens une URL type `fitloop.vercel.app`

### Option 2 — Via Vercel CLI

```bash
npm install -g vercel
vercel
```

## Installer sur téléphone (PWA)

Sur iPhone (Safari) :
1. Ouvre l'URL Vercel dans Safari
2. Appuie sur le bouton Partager (carré avec flèche)
3. "Sur l'écran d'accueil"
4. L'app apparaît comme une vraie app avec l'icône FitLoop

Sur Android (Chrome) :
1. Ouvre l'URL dans Chrome
2. Menu ⋮ → "Ajouter à l'écran d'accueil"

## Structure des fichiers

```
src/
├── App.jsx              # Routes principales
├── index.css            # Design tokens + utilitaires
├── context/
│   └── AppContext.jsx   # État global (activités, notifs, groupes)
├── data/
│   └── mockData.js      # Données de démo
├── components/
│   ├── UI.jsx           # Composants réutilisables
│   └── BottomNav.jsx    # Barre de navigation
└── pages/
    ├── Onboarding.jsx   # Écran de bienvenue (3 slides)
    ├── Login.jsx        # Connexion
    ├── Home.jsx         # Dashboard principal
    ├── Feed.jsx         # Fil d'activités
    ├── LogActivity.jsx  # Ajouter une activité
    ├── Groups.jsx       # Liste groupes + Leaderboard
    ├── Profile.jsx      # Profil utilisateur
    ├── Progress.jsx     # Graphiques de progression
    ├── Notifications.jsx # Notifications
    └── Challenges.jsx   # Challenges
```

## Écrans disponibles

| Écran | Route | Description |
|-------|-------|-------------|
| Onboarding | / | 3 slides de présentation |
| Login | /login | Connexion email + OAuth |
| Dashboard | /home | Stats, objectif hebdo, activités récentes |
| Feed | /feed | Fil social avec likes |
| Log activité | /log | Formulaire d'ajout d'activité |
| Groupes | /groups | Liste des groupes |
| Leaderboard | /groups/:id | Classement du groupe |
| Profil | /profile | Stats + badges + paramètres |
| Progrès | /progress | Graphiques d'évolution |
| Notifications | /notifications | Centre de notifications |
| Challenges | /challenges | Défis en cours et disponibles |
