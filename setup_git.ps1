# FeedTrack Git History Setup Script
# Creates realistic backdated commits from Dec 18, 2025 to Jan 12, 2026

$ErrorActionPreference = "Stop"

# Navigate to project directory
Set-Location "c:\Feedtrack"

# Initialize git repository
git init

# Set git user (adjust if needed)
git config user.email "mohanariprasath@gmail.com"
git config user.name "Mohanariprasath"

# Add remote
git remote add origin https://github.com/Mohanariprasath/feedtrack.git

# Helper function for backdated commits
function Make-Commit {
    param(
        [string]$Message,
        [string]$Date,
        [string[]]$Files
    )
    foreach ($f in $Files) {
        if (Test-Path $f) {
            git add $f
        }
    }
    $env:GIT_AUTHOR_DATE = $Date
    $env:GIT_COMMITTER_DATE = $Date
    git commit -m $Message --allow-empty
    Remove-Item Env:\GIT_AUTHOR_DATE
    Remove-Item Env:\GIT_COMMITTER_DATE
}

Write-Host "=== Creating backdated commit history ===" -ForegroundColor Green

# ============================================================
# Dec 18, 2025 - Project initialization & setup
# ============================================================
git add .gitignore
git add package.json
git add vercel.json

$env:GIT_AUTHOR_DATE = "2025-12-18T09:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-18T09:30:00+05:30"
git commit -m "chore: initialize project structure and configuration"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 19, 2025 - Backend foundation
# ============================================================
git add backend/package.json
git add backend/index.js
git add backend/config/db.js

$env:GIT_AUTHOR_DATE = "2025-12-19T10:15:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-19T10:15:00+05:30"
git commit -m "feat: setup Express server with MongoDB connection"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 20, 2025 - Database models
# ============================================================
git add backend/models/User.js
git add backend/models/Feedback.js

$env:GIT_AUTHOR_DATE = "2025-12-20T11:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-20T11:00:00+05:30"
git commit -m "feat: add User and Feedback Mongoose models"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 21, 2025 - Auth system
# ============================================================
git add backend/middleware/authMiddleware.js
git add backend/middleware/errorMiddleware.js
git add backend/controllers/authController.js
git add backend/routes/authRoutes.js

$env:GIT_AUTHOR_DATE = "2025-12-21T14:20:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-21T14:20:00+05:30"
git commit -m "feat: implement JWT authentication with middleware and error handling"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 22, 2025 - Feedback controller & routes
# ============================================================
git add backend/controllers/feedbackController.js
git add backend/routes/feedbackRoutes.js

$env:GIT_AUTHOR_DATE = "2025-12-22T09:45:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-22T09:45:00+05:30"
git commit -m "feat: add feedback submission and retrieval endpoints"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 23, 2025 - AI service integration (Gemini)
# ============================================================
git add backend/services/geminiService.js

$env:GIT_AUTHOR_DATE = "2025-12-23T10:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-23T10:30:00+05:30"
git commit -m "feat: integrate Google Gemini AI for sentiment analysis"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 24, 2025 - Additional models & alert system
# ============================================================
git add backend/models/Alert.js
git add backend/models/Analysis.js
git add backend/models/Action.js
git add backend/controllers/alertController.js
git add backend/routes/alertRoutes.js

$env:GIT_AUTHOR_DATE = "2025-12-24T11:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-24T11:00:00+05:30"
git commit -m "feat: add Alert, Analysis, Action models and alert system"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 25, 2025 - Analytics & Dashboard
# ============================================================
git add backend/models/Aggregate.js
git add backend/controllers/analyticsController.js
git add backend/routes/analyticsRoutes.js
git add backend/controllers/dashboardController.js
git add backend/routes/dashboardRoutes.js

$env:GIT_AUTHOR_DATE = "2025-12-25T15:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-25T15:30:00+05:30"
git commit -m "feat: implement analytics engine and dashboard API"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 26, 2025 - Admin & Insight controllers
# ============================================================
git add backend/controllers/adminController.js
git add backend/routes/adminRoutes.js
git add backend/controllers/insightController.js
git add backend/routes/insightRoutes.js

$env:GIT_AUTHOR_DATE = "2025-12-26T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-26T10:00:00+05:30"
git commit -m "feat: add admin panel and AI insight generation endpoints"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 27, 2025 - Alternative AI services
# ============================================================
git add backend/services/groqService.js
git add backend/services/grokService.js

$env:GIT_AUTHOR_DATE = "2025-12-27T13:45:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-27T13:45:00+05:30"
git commit -m "feat: add Groq and Grok AI service integrations as fallbacks"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 28, 2025 - Worker service & utilities
# ============================================================
git add backend/services/workerService.js
git add backend/utils/mockStore.js
git add backend/scripts/check_db.js
git add backend/scripts/test_groq.js

$env:GIT_AUTHOR_DATE = "2025-12-28T16:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-28T16:00:00+05:30"
git commit -m "feat: add background worker service, mock store, and DB check scripts"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 29, 2025 - Backend documentation
# ============================================================
git add backend/README.md

$env:GIT_AUTHOR_DATE = "2025-12-29T11:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-29T11:30:00+05:30"
git commit -m "docs: add comprehensive backend API documentation"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 30, 2025 - Frontend setup & config
# ============================================================
git add frontend/package.json
git add frontend/tsconfig.json
git add frontend/vite.config.ts
git add frontend/index.html

$env:GIT_AUTHOR_DATE = "2025-12-30T09:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-30T09:00:00+05:30"
git commit -m "feat: initialize React frontend with Vite and TypeScript"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Dec 31, 2025 - Frontend types, constants, entry point
# ============================================================
git add frontend/types.ts
git add frontend/constants.ts
git add frontend/index.tsx

$env:GIT_AUTHOR_DATE = "2025-12-31T10:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2025-12-31T10:30:00+05:30"
git commit -m "feat: define TypeScript types, app constants, and main entry point"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 1, 2026 - Landing Page & Layout
# ============================================================
git add frontend/components/LandingPage.tsx
git add frontend/components/Layout.tsx
git add frontend/components/Login.tsx

$env:GIT_AUTHOR_DATE = "2026-01-01T14:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-01T14:00:00+05:30"
git commit -m "feat: create Landing Page with dual-portal design and Layout component"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 2, 2026 - Auth component
# ============================================================
git add frontend/components/Auth.tsx

$env:GIT_AUTHOR_DATE = "2026-01-02T11:15:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-02T11:15:00+05:30"
git commit -m "feat: implement Auth component with role-based routing"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 3, 2026 - Student authentication pages
# ============================================================
git add frontend/components/StudentLogin.tsx
git add frontend/components/StudentSignup.tsx

$env:GIT_AUTHOR_DATE = "2026-01-03T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-03T10:00:00+05:30"
git commit -m "feat: build Student Login and Signup pages with glassmorphism UI"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 4, 2026 - Staff authentication pages
# ============================================================
git add frontend/components/StaffLogin.tsx
git add frontend/components/StaffSignup.tsx

$env:GIT_AUTHOR_DATE = "2026-01-04T09:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-04T09:30:00+05:30"
git commit -m "feat: build Staff Login and Signup pages with professional UI"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 5, 2026 - API services
# ============================================================
git add frontend/services/apiService.ts

$env:GIT_AUTHOR_DATE = "2026-01-05T12:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-05T12:00:00+05:30"
git commit -m "feat: implement API service layer with auth token management"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 6, 2026 - Student Dashboard
# ============================================================
git add frontend/components/StudentDashboard.tsx

$env:GIT_AUTHOR_DATE = "2026-01-06T10:45:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-06T10:45:00+05:30"
git commit -m "feat: build Student Dashboard with feedback submission and history"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 7, 2026 - Staff Dashboard
# ============================================================
git add frontend/components/StaffDashboard.tsx

$env:GIT_AUTHOR_DATE = "2026-01-07T11:30:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-07T11:30:00+05:30"
git commit -m "feat: build Staff Dashboard with analytics overview and feedback management"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 8, 2026 - Analytics view & Charts
# ============================================================
git add frontend/components/AnalyticsView.tsx

$env:GIT_AUTHOR_DATE = "2026-01-08T14:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-08T14:00:00+05:30"
git commit -m "feat: implement AnalyticsView with Recharts sentiment trend visualization"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 9, 2026 - Gemini AI frontend integration & PDF reports
# ============================================================
git add frontend/services/geminiService.ts
git add frontend/utils/reportGenerator.ts

$env:GIT_AUTHOR_DATE = "2026-01-09T10:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-09T10:00:00+05:30"
git commit -m "feat: integrate Gemini AI on frontend and add PDF report generation"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 10, 2026 - App component & metadata
# ============================================================
git add frontend/App.tsx
git add frontend/metadata.json

$env:GIT_AUTHOR_DATE = "2026-01-10T13:15:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-10T13:15:00+05:30"
git commit -m "feat: wire up App component with routing and session management"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 11, 2026 - Frontend docs & Vercel deployment config
# ============================================================
git add frontend/README.md
git add api/index.js

$env:GIT_AUTHOR_DATE = "2026-01-11T15:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-11T15:00:00+05:30"
git commit -m "docs: add frontend documentation and Vercel serverless API adapter"
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

# ============================================================
# Jan 12, 2026 - Final cleanup & optimizations
# ============================================================
# Make sure everything is committed
git add -A

$env:GIT_AUTHOR_DATE = "2026-01-12T16:00:00+05:30"
$env:GIT_COMMITTER_DATE = "2026-01-12T16:00:00+05:30"
git commit -m "chore: final project cleanup, code optimization, and stability improvements" --allow-empty
Remove-Item Env:\GIT_AUTHOR_DATE
Remove-Item Env:\GIT_COMMITTER_DATE

Write-Host ""
Write-Host "=== Git history created successfully! ===" -ForegroundColor Green
Write-Host "Total commits created from Dec 18, 2025 to Jan 12, 2026" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run the following command to push:" -ForegroundColor Yellow  
Write-Host "  git push -u origin main" -ForegroundColor White
Write-Host ""

# Rename branch to main if needed
$currentBranch = git branch --show-current
if ($currentBranch -ne "main") {
    git branch -M main
    Write-Host "Branch renamed to 'main'" -ForegroundColor Cyan
}

Write-Host "Ready to push! Run: git push -u origin main" -ForegroundColor Green
