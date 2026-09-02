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

## Part 2: Deploying the Frontend on Vercel

1. **Create a Vercel Account**:
   - Go to [vercel.com](https://vercel.com) and sign up with GitHub.

2. **Import Project**:
   - Click **Add New...** -> **Project**.
   - Select your Rehnuma GitHub repository.

3. **Configure Project**:
   - Set **Framework Preset**: `Next.js`
   - Set **Root Directory**: `frontend`

4. **Environment Variables**:
   - Add variable name: `NEXT_PUBLIC_API_URL`
   - Value: `https://rehnuma-api.onrender.com/api` (your Render backend API URL).

5. **Deploy**:
   - Click **Deploy**. In under 60 seconds, your site will be live!

---

## Testing Your Live Deployment

- Open your Vercel URL (e.g., `https://rehnuma.vercel.app`).
- Try querying in English or Urdu:
  - *"Can landlord evict me without notice under Punjab law?"*
  - *"ایف آئی آر درج کروانے کا کیا طریقہ ہے؟"*
- Observe domain classification, section citations, and confidence refusal when asking about unsupported topics!
