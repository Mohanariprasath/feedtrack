# FeedTrack - AI-Powered Student Feedback Analytics

FeedTrack is a modern, AI-powered student feedback analytics platform that bridges the communication gap between students and academic staff. It leverages Google Gemini AI to perform real-time sentiment analysis, categorize feedback, and generate actionable insights.

## 🚀 Features

- **AI-Driven Sentiment Analysis** — Automatic categorization and sentiment scoring powered by Google Gemini
- **Dual Portal System** — Separate portals for Students (submit feedback) and Staff (view analytics)
- **Real-Time Analytics Dashboard** — Sentiment trends, category distribution, and department-wise analysis
- **Smart Alerts** — Automatic notifications for critical or urgent feedback
- **PDF Report Generation** — One-click downloadable reports for departmental reviews
- **Glassmorphism UI** — Premium, modern interface with smooth animations

## 🛠️ Tech Stack

| Layer      | Technology                                      |
|------------|------------------------------------------------|
| Frontend   | React 19, TypeScript, Vite, Recharts, Lucide    |
| Backend    | Node.js, Express.js, MongoDB (Mongoose)          |
| AI         | Google Gemini AI (@google/genai)                 |
| Auth       | JWT, Bcryptjs                                    |
| Deployment | Vercel (Frontend + Serverless API)               |

## 📁 Project Structure

```
feedtrack/
├── api/                # Vercel serverless function adapter
├── backend/            # Express.js API server
│   ├── config/         # Database configuration
│   ├── controllers/    # Route handlers (auth, feedback, analytics)
│   ├── middleware/      # JWT auth & error handling middleware
│   ├── models/         # Mongoose schemas (User, Feedback, Alert)
│   ├── routes/         # API route definitions
│   ├── services/       # AI service integrations (Gemini, Groq)
│   └── utils/          # Helper functions
├── frontend/           # React + TypeScript application
│   ├── components/     # UI components (Dashboards, Auth, Landing)
│   ├── services/       # API and AI service layers
│   └── utils/          # Report generation utilities
├── package.json        # Monorepo configuration
└── vercel.json         # Deployment configuration
```

## 🏁 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB instance (local or Atlas)
- Google Gemini API Key

### Installation

```bash
# Install all dependencies (frontend + backend)
npm install

# Or install separately
npm install --prefix frontend
npm install --prefix backend
```

### Environment Setup

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

### Running Locally

```bash
# Start backend (development mode)
cd backend && npm run dev

# Start frontend (in another terminal)
cd frontend && npm run dev
```

## 📡 API Endpoints

| Category   | Endpoint            | Method | Description                      |
|------------|---------------------|--------|----------------------------------|
| Auth       | `/api/auth/signup`  | POST   | Register student or staff        |
| Auth       | `/api/auth/signin`  | POST   | Authenticate and return JWT      |
| Feedback   | `/api/feedback`     | GET    | Fetch feedback (role-based)      |
| Feedback   | `/api/feedback`     | POST   | Submit feedback for AI analysis  |
| Analytics  | `/api/analytics`    | GET    | Sentiment trends and statistics  |
| Alerts     | `/api/alerts`       | GET    | Critical feedback alerts         |
| Dashboard  | `/api/dashboard`    | GET    | Dashboard overview data          |
| Admin      | `/api/admin`        | GET    | Admin panel data                 |

## 🤖 AI Integration

FeedTrack uses **Google Gemini AI** to:
1. Automatically categorize feedback into topics (Academics, Facilities, Faculty, etc.)
2. Extract sentiment scores (Positive, Neutral, Negative)
3. Generate concise summaries and actionable insights for staff

## 📄 License

This project is licensed under the ISC License.
