# 🧭 CampusPilot — Smart Campus Companion

A modern, full-stack web application for university students. Built with **Next.js 14** (frontend) and **Laravel 13** (backend API), connected to **MongoDB**.

## ✨ Features

- 📚 **Digital Library** — E-books with PDF reader, bookmarks, and reading progress
- 🎧 **Audio Learning** — Stream/download audio books with player controls
- 📝 **Past Questions** — Exam repository organized by department, course, level & year
- 📅 **Campus Events** — Discover and register for university events
- 💼 **Opportunities** — Scholarships, internships, competitions & grants
- 🔔 **Smart Reminders** — Push/email/in-app notifications for deadlines
- 📊 **Analytics Dashboard** — Admin panel with charts and insights
- 👤 **Student Profiles** — Achievements, reading streaks, and progress tracking

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React, TypeScript, Tailwind CSS |
| Backend | Laravel 13, PHP 8.4, Laravel Sanctum |
| Database | MongoDB |
| Storage | Cloudinary / AWS S3 |
| Notifications | Firebase Cloud Messaging |
| Deployment | Docker, Nginx, Ubuntu Server |

## 🚀 Getting Started

### Prerequisites
- Node.js 22+
- PHP 8.4+
- Composer
- Docker (for deployment)

### Frontend Development
```bash
cd frontend
npm install
npm run dev
# App runs at http://localhost:3000
```

### Backend Development
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
# API runs at http://localhost:8000
```

### Docker (Production)
```bash
docker-compose up --build
```

## 📱 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Beautiful landing page with features |
| Dashboard | `/dashboard` | Personalized student overview |
| Library | `/library` | Digital e-book library |
| Audio | `/audio` | Audio book player |
| Past Questions | `/past-questions` | Exam question repository |
| Events | `/events` | Campus events calendar |
| Opportunities | `/opportunities` | Scholarships & internships |
| Reminders | `/reminders` | Smart reminder system |
| Notifications | `/notifications` | In-app notifications |
| Profile | `/profile` | Student profile & achievements |
| Settings | `/settings` | User preferences |
| Admin | `/admin` | Admin dashboard with analytics |

## 🔐 Authentication

Uses **Laravel Sanctum** for token-based API authentication.

- `POST /api/auth/register` — Student registration
- `POST /api/auth/login` — Login and get token
- `POST /api/auth/logout` — Logout
- `GET /api/auth/me` — Get current user

## 📊 MongoDB Connection

```
mongodb+srv://user:password@campuspilot.kgjqlwx.mongodb.net/?appName=campuspilot
```

## 🎨 Design System

- **Primary**: Indigo (#6366f1) → Purple (#7c3aed)
- **Accent**: Emerald (#22c55e)
- **Font**: Inter + Plus Jakarta Sans
- **Effects**: Glassmorphism, gradient meshes, smooth animations

---

Built with ❤️ for university students everywhere.
