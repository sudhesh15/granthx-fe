GranthX Frontend — README
Overview

React app for GranthX.ai: lets users index content, chat with context, and view analytics. Points to a separate backend via REACT_APP_API_BASE.

Tech

React (CRA/Vite compatible)

Clerk (auth) — publishable key on client

Prerequisites

Node 18+

npm or yarn

Environment

Create .env in the project root:

REACT_APP_API_BASE=http://localhost:5000
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key


REACT_APP_API_BASE should point to your backend (local or deployed).

Install & Run
npm install
npm start         # dev server
# or
npm run build     # production build
npm run preview   # if using Vite

Config Notes

CORS: Backend must allow the frontend origin.

Auth (Clerk): Ensure the same domain is configured in Clerk for local/dev.

Folder Tips (optional)
src/
  components/
  pages/
  hooks/
  lib/        # API client using REACT_APP_API_BASE

Troubleshooting

404s or blank screen after build: ensure your host serves SPA fallback to index.html.

Network errors: check REACT_APP_API_BASE and backend CORS.
