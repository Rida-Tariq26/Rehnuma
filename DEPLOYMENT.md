# Rehnuma Deployment Guide 🚀

This guide walks you through deploying Rehnuma for free:
- **Frontend (Next.js)** on **Vercel**
- **Backend (FastAPI)** on **Render** (or Railway / Hugging Face Spaces)

---

## Part 1: Deploying the Backend on Render

1. **Create a GitHub Repository**:
   - Push your code to GitHub (make sure `backend` folder contains `Dockerfile` and `requirements.txt`).

2. **Create a Render Account**:
   - Go to [render.com](https://render.com) and sign up with GitHub.

3. **New Web Service**:
   - Click **New +** -> **Web Service**.
   - Connect your GitHub repository.
   - Set **Root Directory**: `backend`
   - Set **Environment**: `Docker` (Render will automatically detect `Dockerfile`).
   - Set **Instance Type**: Free.

4. **Environment Variables**:
   In the Render dashboard under **Environment**:
   - `GOOGLE_API_KEY`: Your Gemini API key from Google AI Studio.
   - `PORT`: `8000`

5. **Deploy**:
   - Click **Create Web Service**.
   - Render will build the container, run data ingestion, and give you a public API URL (e.g. `https://rehnuma-api.onrender.com`).

---

## Part 2: Deploying the Frontend (Render Web Service or Vercel)

### Option A: Render Web Service (Node.js)
1. In Render dashboard, click **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Set **Root Directory**: `frontend`
4. Set **Build Command**: `npm install && npm run build`
5. Set **Start Command**: `npm start`
6. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: `https://<your-backend-app-name>.onrender.com/api`
7. Click **Create Web Service**.

### Option B: Deploying on Vercel
1. Sign in to [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New...** -> **Project** and select your Rehnuma repository.
3. Set **Root Directory**: `frontend`
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_API_URL`: `https://<your-backend-app-name>.onrender.com/api`
5. Click **Deploy**.

---

## Testing Your Live Deployment

- Open your Vercel URL (e.g., `https://rehnuma.vercel.app`).
- Try querying in English or Urdu:
  - *"Can landlord evict me without notice under Punjab law?"*
  - *"ایف آئی آر درج کروانے کا کیا طریقہ ہے؟"*
- Observe domain classification, section citations, and confidence refusal when asking about unsupported topics!
