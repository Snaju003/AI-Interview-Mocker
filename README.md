# InterviewAI

InterviewAI is an AI-powered mock interview platform that helps users practice job interviews.  
Built with **Next.js**, **Clerk** authentication, **Drizzle ORM** (with **NeonDB** as the database), and **PostgreSQL** — deployed on **Vercel**.

## 🚀 Live Demo
[https://interview-ai1.vercel.app](https://interview-ai1.vercel.app)

## ✨ Features
- AI-generated mock interview questions and answers.
- Feedback analysis to help improve responses.
- Secure authentication via Clerk.
- Recent interview history tracking.
- Responsive UI built with Tailwind CSS.

## 🛠️ Tech Stack
- **Frontend:** Next.js (App Router), Tailwind CSS, TypeScript
- **Backend:** Next.js API Routes, Drizzle ORM
- **Database:** NeonDB (PostgreSQL)
- **Auth:** Clerk
- **AI:** Gemini API
- **Deployment:** Vercel

## 📦 Installation
```bash
# Clone the repository
git clone https://github.com/Snaju003/AI-Interview-Mocker.git
cd AI-Interview-Mocker

# Install dependencies
pnpm install

# Create a .env.local file and add your keys
cp .env.example .env.local

# Run locally
pnpm run dev
