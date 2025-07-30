# Sugar Signal

This is a simple full-stack web application built for learning purposes. The goal is to serve a machine learning model through a FastAPI backend and connect it to a minimal frontend interface using Next.js.

---

## Why I Built This

I wanted to try:
- Serving an ML model as an API using **FastAPI**
- Deploying the backend to **Railway**
- Hosting the frontend with **Vercel**

---

## Tech Stack

- **Frontend**: Next.js (TypeScript)
- **Backend**: FastAPI (Python)
- **Model**: scikit-learn `.sav` file
- **Deployment**:
  - Backend → Railway
  - Frontend → Vercel

---

## How to Run Locally

### Backend (FastAPI)
```bash
cd Backend
pip install -r requirements.txt
uvicorn index:app --reload
```

### Frontend (Next.js)
```bash
cd Frontend
npm run dev
```