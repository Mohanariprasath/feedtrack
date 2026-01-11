# FeedTrack - Frontend Application

FeedTrack is a modern, AI-powered student feedback analytics platform built with React, TypeScript, and Vite. It provides an immersive experience for both students and staff to bridge the communication gap.

## 🚀 Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Vanilla CSS (Modern CSS variables, Glassmorphism)
- **Icons**: Lucide React, Google Material Symbols
- **Charts**: Recharts
- **PDF Generation**: jsPDF, jsPDF-AutoTable

## 📄 Core Pages (5 Main Portals)

The application is structured into five primary user-facing areas:

1.  **Landing Page**: A high-impact, dual-portal entry point. It features smooth animations and a split-screen design to guide users toward either the **Student** or **Staff** portals.
2.  **Student Portal (Login/Signup)**: A dedicated authentication gateway for students. It prioritizes ease of use and secure registration using institutional student IDs.
3.  **Staff Portal (Login/Signup)**: A professional administrative gateway for departmental heads and faculty members. It ensures secure access to sensitive institutional data.
4.  **Student Dashboard**: The central hub for student participation. It includes:
    *   **Feedback Submission**: An AI-assisted form for reporting issues or suggestions.
    *   **Personal History**: A chronological record of submitted feedback and its current status.
5.  **Staff Dashboard (Analytics Hub)**: A powerful data visualization center for administrators. Features include:
    *   **Real-time Analytics**: Sentiment trends and category distribution charts.
    *   **AI Insights**: Automatic summarization of student sentiment.
    *   **Reporting**: One-click PDF generation for departmental reviews.

## 🛠️ Getting Started

### Prerequisites

- Node.js v18 or later
- Backend server running (default: `http://localhost:5000`)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment:
   Ensure the `services/apiService.ts` (or relevant config) points to your backend URL.

### Running the App

- **Development**: Starts the Vite dev server.
  ```bash
  npm run dev
  ```
- **Build**: Creates a production-ready bundle.
  ```bash
  npm run build
  ```
- **Preview**: Previews the production build locally.
  ```bash
  npm run preview
  ```

## ✨ Key Features

- **AI-Driven Sentiment Analysis**: Leveraging Google Gemini to understand student tone and urgency.
- **Glassmorphism Design**: A premium, modern UI with blurred backgrounds and vibrant gradients.
- **Responsive Layout**: Seamless transition between desktop and mobile devices.
- **Live Updates**: Polling mechanism for real-time feedback processing status.
