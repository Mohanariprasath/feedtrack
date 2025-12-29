# FeedTrack - Backend API

The backend for FeedTrack is a robust Node.js/Express server providing real-time sentiment analysis, feedback management, and educational analytics.

## 🚀 Tech Stack

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **AI Integration**: Google Gemini AI (@google/genai)
- **Security**: Helmet, Bcryptjs, JWT Authentication
- **Performance**: Compression, Morgan (logging)

## 📁 Project Structure

```text
backend/
├── config/             # Database & environment configuration
├── controllers/        # Business logic for routes
├── middleware/         # Security & error handling
├── models/             # Mongoose schemas (User, Feedback, Alert)
├── routes/             # API endpoint definitions
├── services/           # External services (Gemini AI, PDF generation)
├── utils/              # Helper functions
└── index.js            # Server entry point
```

## 🛠️ Getting Started

### Prerequisites

- Node.js v18 or later
- MongoDB instance (local or Atlas)
- Google Gemini API Key

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables (create a `.env` file):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   ```

### Running the Server

- **Development**: Starts the server with `--watch` mode.
  ```bash
  npm run dev
  ```
- **Production**: Starts the server normally.
  ```bash
  npm start
  ```

## 🔌 API Endpoints

| Category  | Endpoint           | Method | Description                        |
|-----------|--------------------|--------|------------------------------------|
| **Auth**  | `/api/auth/signup` | POST   | Register a new student or staff    |
|           | `/api/auth/signin` | POST   | Authenticate user and return JWT   |
| **Feed**  | `/api/feedback`    | GET    | Fetch all feedback (Role specific) |
|           | `/api/feedback`    | POST   | Submit new feedback for analysis   |
| **Stats** | `/api/analytics`   | GET    | Get sentiment trends and data      |
| **Alerts**| `/api/alerts`      | GET    | Fetch critical system/user alerts  |
| **Admin** | `/api/admin`       | GET    | High-level overview for staff      |

## 🤖 AI Logic

The backend utilizes **Google Gemini AI** to:
1. Automatically categorize feedback into topics (Academics, Facilities, etc.).
2. Extract sentiment scores (Positive, Neutral, Negative).
3. Generate concise summaries and actionable insights for staff members.
