# GranthX Frontend

## Overview
The frontend for **GranthX.ai**, a GenAI-powered platform that transforms documents, websites, and data into interactive conversations.  
It connects to the backend API to index content, enable chat, and display analytics.

---

## Tech Stack
- **React** (CRA / Vite compatible)  
- **Clerk** (Authentication)  

---

## Prerequisites
- Node.js **v18+**  
- npm or yarn  

---

## Environment Variables
Create a `.env` file in the project root:

```env
REACT_APP_API_BASE=http://localhost:5000
REACT_APP_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
