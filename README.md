# DAYBLOOM

**Organize Your Time. Develop Your Digital Skills. Build Your Future.**

DAYBLOOM is a student productivity and digital learning platform that connects a **Smart Timetable** with a **Digital Skills Training Hub**. Free-time gaps in your schedule become recommendations for digital skills training you can add straight to your timetable.

## Features

- Smart interactive timetable (add / edit / delete / complete / generate)
- Free-time detection and smart learning recommendations
- 8 digital skills categories with lessons, activities, and quizzes
- Bilingual English / Arabic with RTL support
- XP, badges, daily goals, and progress dashboard
- Local account storage (signup / login / guest demo)

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

## Deploy on Railway

1. Push this repo to GitHub.
2. In [Railway](https://railway.app), **New Project** → **Deploy from GitHub** → select this repo.
3. Railway will run `npm run build` then `npm start` (serves the `dist` folder).
4. Generate a public domain under **Settings → Networking**.

## Stack

- React + Vite
- React Router
- Lucide icons
- localStorage persistence (no server required)
