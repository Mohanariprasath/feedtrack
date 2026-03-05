#  FeedTrack: AI-Powered Student Feedback Analytics

<p align="center">
  <em>A modern, AI-powered platform bridging the communication gap between students and academic staff through real-time sentiment analysis and actionable insights.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

---

##  Why FeedTrack?

Traditional feedback mechanisms are often slow, manual, and ignore the nuance of student sentiment. **FeedTrack** changes this by leveraging the power of **Google Gemini AI** to provide instant sentiment categorization, anomaly detection, and automated reporting.

##  Key Features

*   ** AI-Driven Sentiment Analysis**: Automatic categorization and sentiment scoring powered by Google Gemini.
*   ** Dual Portal System**: Dedicated, secure portals for Students (to submit feedback) and Staff (to analyze data).
*   ** Real-Time Analytics Dashboard**: Visualize sentiment trends, category distribution, and department-wise analysis instantly.
*   ** Smart Alerts**: Automatic notifications for hyper-critical, urgent, or highly negative feedback.
*   ** PDF Report Generation**: One-click downloadable summaries for quick departmental reviews.
*   ** Glassmorphism UI**: A premium, highly responsive modern interface built with smooth animations and intuitive design.

---

##  Technology Stack

### Frontend Hub
*   **Core**: React 19, TypeScript
*   **Tooling**: Vite
*   **Data Visualization**: Recharts
*   **Icons**: Lucide React

### Backend Services
*   **Server**: Node.js & Express.js
*   **Database**: MongoDB (via Mongoose)
*   **Authentication**: JWT & Bcrypt.js

### AI & Deployment
*   **Intelligence Engine**: Google Gemini AI (`@google/genai`)
*   **Hosting**: Vercel (Frontend & Serverless API Support)

---

##  Project Architecture

```plaintext
feedtrack/
├── api/                # Vercel serverless function adapter
├── backend/            # Express.js API server
│   ├── config/         # Database configuration & environment setup
│   ├── controllers/    # Route handlers logic (auth, feedback, analytics)
│   ├── middleware/     # Custom JWT auth & robust error handling
│   ├── models/         # Mongoose DB schemas (User, Feedback, Alert)
│   ├── routes/         # Express API route declarations
│   ├── services/       # AI service integrations layer
│   └── utils/          # Shared helper functions
├── frontend/           # React + TypeScript client application
│   ├── components/     # Reusable UI components (Dashboards, Auth, Landing, etc.)
│   ├── services/       # API interface callers
│   └── utils/          # Client-side helpers (e.g. PDF generation)
├── package.json        # Unified Monorepo configuration scripts
└── vercel.json         # Vercel deployment and routing rules
```

---

##  Getting Started

### Prerequisites
Before you begin, ensure you have met the following requirements:
*   **Node.js** (v18.0.0 or higher)
*   **MongoDB** (Local instance or MongoDB Atlas cluster)
*   **Google Gemini API Key** (Get one from [Google AI Studio](https://aistudio.google.com/))

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mohanariprasath/feedtrack.git
   cd feedtrack
   ```

2. **Install all dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Running Locally

To launch both the frontend and backend concurrently:

```bash
# Terminal 1: Start the backend server
cd backend
npm run dev

# Terminal 2: Start the Vite frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` (or the port specified by Vite) in your browser.

---

##  Core API Structure

| Scope | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/signup` | `POST` | Register a new student or staff member |
| **Auth** | `/api/auth/signin` | `POST` | Authenticate credentials & dispense JWT |
| **Feedback** | `/api/feedback` | `GET` | Fetch feedback lists (based on user role) |
| **Feedback** | `/api/feedback` | `POST` | Submit new feedback for AI processing |
| **Analytics** | `/api/analytics` | `GET` | Retrieve sentiment trends and aggregate stats |
| **Alerts** | `/api/alerts` | `GET` | Fetch critical insights requiring immediate attention |

---

##  Inside the AI Engine

FeedTrack relies on **Google Gemini AI** to transform raw, unstructured student text into structured insights. 
When feedback is submitted, the AI pipeline executes:
1.  **Topic Allocation**: Maps the feedback into domains like *Academics, Facilities, Faculty, Extracurricular*.
2.  **Sentiment Extraction**: Scores the emotional weight of the text (Positive, Neutral, Negative).
3.  **Insight Generation**: Synthesizes a concise, actionable summary for the staff dashboard, highlighting the root cause.

---

##  Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

##  License

This project is open-source and available under the **ISC License**.

---
<p align="center">Made with for better education.</p>
