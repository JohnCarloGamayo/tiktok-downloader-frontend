# TikTok Downloader – Frontend

React + Vite frontend for the TikTok Downloader.

## Setup

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Runs on `http://localhost:3000`. API calls to `/api/*` are proxied to the backend at `http://localhost:8000`.

## Production Build

```bash
npm run build
```

Output goes to `dist/`.

## Environment Variables

| Variable             | Description                        | Default |
|----------------------|------------------------------------|---------|
| `VITE_API_BASE_URL`  | Backend URL (production only)      | `""`    |

## Deploy to Vercel

1. Push the `frontend/` folder (or set **Root Directory** to `frontend` in Vercel).
2. Set the environment variable `VITE_API_BASE_URL` to your deployed backend URL:
   ```
   VITE_API_BASE_URL=https://your-backend-name.onrender.com
   ```
   **Important**: Replace with your actual Render backend URL (no trailing slash)
3. Vercel will auto-detect Vite and build accordingly.

## Production Deployment

- **Frontend**: https://tiktok-downloader-byjcg.vercel.app/
- **Backend**: Deploy to Render (see backend README for instructions)
