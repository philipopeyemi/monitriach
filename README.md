# MONITRIACH CORE — Autonomous AI Sales Operating System Foundation

MONITRIACH CORE is an enterprise-grade, modular, autonomous AI Sales Operating System SaaS architecture built with Next.js 14+ App Router, FastAPI, Async SQLAlchemy 2.0, PostgreSQL, Redis, Celery, and Nginx.

---

## 🚀 Product Overview

MONITRIACH CORE serves as the foundational operating system for autonomous AI sales operations. Designed with a modular engine architecture, it isolates core identity, database models, business intelligence ("Business Brain"), multi-provider AI routing, event dispatching, and security access controls from higher-level domain engines (Leads, Outreach Campaigns, Unified Inbox, Intelligence Center, and Analytics).

### Design Aesthetics & User Experience
- **Apple-Grade Layered White Design**: Pure white base (`#FFFFFF`), subtle canvas surfaces (`#F8FAFC`, `#FAFAFA`), crisp Inter typography, soft card shadows, and 12px surface radii.
- **Action-Oriented Cockpit**: Home dashboard focused on "What should I do next?" featuring 10 top metrics widgets, Priority Action Queue, and real-time AI event stream.
- **Raycast/Linear Command Palette (`Ctrl + K` / `Cmd + K`)**: Omnibox search overlay for instant navigation and quick actions across leads, campaigns, agents, and settings.
- **Business Brain**: Centralized intelligence repository storing Services, Offers, Testimonials, Case Studies, Brand Voice, ICPs, Competitor Battlecards, and Objections.
- **Intelligence Center**: Executive management dashboard overseeing Research Agent, Offer Agent, AEGIS Core, Copywriter, Quality Guardrails, Deliverability Engine, Meeting Agent, Optimizer, and Memory Networks.

---

## 🏗️ Architecture

```
                               ┌────────────────────────────────────────┐
                               │            NEXT.JS FRONTEND            │
                               │      App Router + Tailwind + Zustand    │
                               └───────────────────┬────────────────────┘
                                                   │ (REST / API v1)
                               ┌───────────────────▼────────────────────┐
                               │           NGINX REVERSE PROXY          │
                               └───────────────────┬────────────────────┘
                                                   │
                               ┌───────────────────▼────────────────────┐
                               │            FASTAPI BACKEND             │
                               │      (Async SQLAlchemy + Pydantic)     │
                               └───────┬───────────┬────────────┬───────┘
                                       │           │            │
                         ┌─────────────▼──┐   ┌────▼─────┐   ┌──▼────────────┐
                         │ POSTGRESQL 16  │   │ REDIS 7  │   │ CELERY WORKER │
                         │  (Data Store)  │   │ (Cache)  │   │  (Async Jobs) │
                         └────────────────┘   └──────────┘   └───────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14+ (App Router)**
- **TypeScript (Strict Mode)**
- **Tailwind CSS** (Apple-grade layered white theme)
- **Radix UI Primitives & Lucide Icons**
- **Zustand** (Global UI & Auth State)
- **TanStack Query v5** (Server State Caching)
- **Framer Motion**

### Backend
- **FastAPI**
- **SQLAlchemy 2.0 (Async Engine)**
- **Alembic** (Async Migrations)
- **PostgreSQL 16**
- **Redis 7** (Caching, Rate-limiting broker)
- **Celery** (Background Task Worker)
- **Passlib & PyJWT** (Bcrypt hashing & JWT Authentication)

### Infrastructure
- **Docker Compose**
- **Nginx Reverse Proxy**

---

## 📂 Folder Structure

```
monitriach/
├── docker-compose.yml
├── .env.example
├── .gitignore
├── README.md
├── nginx/
│   └── nginx.conf
├── backend/
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── alembic/
│   └── app/
│       ├── main.py
│       ├── core/ (config, database, security, redis, celery_app, events, logging)
│       ├── models/ (User, Organization, Workspace, Role, Permission, AuditLog, APIKey, Setting, Timeline, Notification)
│       ├── schemas/ (Auth, User, Organization, Workspace, AIProvider, Notification, Health)
│       ├── services/
│       │   ├── ai_providers/ (Manager for OpenRouter, HuggingFace, Ollama, Gemini, OpenAI, Anthropic, DeepSeek, Groq)
│       │   ├── crawler/ (browser, extractor, cleaner, parser, robots, rate_limiter)
│       │   ├── memory/ (brand_memory, campaign_memory, lead_memory, conversation_memory, vector)
│       │   └── intelligence/ (research, offer, copywriting, quality, delivery, optimization, memory, reasoning)
│       └── api/v1/ (health, auth, users, workspaces, ai_providers, notifications)
└── frontend/
    ├── Dockerfile
    ├── vercel.json
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── tailwind.config.js
    └── src/
        ├── app/
        │   ├── (auth)/ (login, register, forgot-password)
        │   └── (dashboard)/ (page, leads, campaigns, inbox, business-brain, intelligence-center, analytics, notifications, settings)
        ├── components/
        │   ├── ui/ (button, card, input, badge, table, skeleton, tabs)
        │   ├── layout/ (Sidebar, TopNav, NotificationPopover, UserMenu, DashboardShell)
        │   ├── command/ (CommandPalette - Ctrl+K)
        │   └── shared/ (EmptyState, LoadingState, ErrorBoundary, ActivityTimeline)
        ├── lib/ (utils, api-client)
        └── store/ (useAuthStore, useUIStore)
```

---

## ⚡ Local Setup

### 1. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 2. Local Backend Setup (Python)
```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 3. Local Frontend Setup (Node.js)
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🐳 Docker Setup

Run the full stack with Docker Compose:
```bash
docker compose up --build
```

This launches:
- **Nginx Reverse Proxy**: `http://localhost` (Port 80)
- **Next.js Frontend**: `http://localhost:3000`
- **FastAPI Backend**: `http://localhost:8000` (Swagger docs at `http://localhost:8000/docs`)
- **PostgreSQL**: `localhost:5432`
- **Redis**: `localhost:6379`
- **Celery Worker**: Background task processor

---

## 🌐 Vercel Deployment (Frontend)

1. Push your repository to GitHub.
2. Import the `frontend/` directory into [Vercel](https://vercel.com).
3. Set the Environment Variable:
   - `NEXT_PUBLIC_API_URL` = `https://api.yourdomain.com/api/v1`
4. Deploy! Next.js App Router will compile with automatic SSR and API proxying defined in `vercel.json`.

---

## ☁️ Railway / Render Deployment (Backend & Database)

### Railway Setup
1. Create a new project on [Railway](https://railway.app).
2. Provision a **PostgreSQL** service and a **Redis** service.
3. Deploy the `backend/` directory as a Web Service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
4. Set Environment Variables matching `.env.example`:
   - `DATABASE_URL` (Asyncpg PostgreSQL URL)
   - `REDIS_URL`
   - `SECRET_KEY`
   - `CORS_ORIGINS`

---

## 🔄 Development Workflow

1. **Database Migrations**:
   Generate new Alembic migration after model changes:
   ```bash
   cd backend
   alembic revision --autogenerate -m "Add new column"
   alembic upgrade head
   ```

2. **Frontend Type Checking & Building**:
   ```bash
   cd frontend
   npm run build
   ```

3. **API Testing**:
   Access FastAPI Swagger UI at `http://localhost:8000/docs` or verify `/api/v1/health`.

---

## 🔒 Health Check Endpoint

`GET /api/v1/health`
```json
{
  "status": "ok",
  "version": "1.0.0",
  "environment": "development",
  "services": {
    "database": "healthy",
    "redis": "healthy"
  }
}
```
