<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your URSP app

This repo contains a Vite frontend plus `/api` endpoints for the Ubuntu Rising Scholars Program app.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `OPENROUTER_API_KEY` in `.env.local` to your OpenRouter API key
3. Optional: set `OPENROUTER_MODEL=openrouter/free` in `.env.local` to keep the app on free models by default
4. Run the app:
   `npm run dev`

The local dev server runs at `http://localhost:3000`.

## Deploy on Vercel

1. Push this repo to GitHub.
2. Import the repo into Vercel.
3. Keep the framework preset as `Vite`.
4. Set these environment variables in Vercel Project Settings:
   `OPENROUTER_API_KEY` required
   `OPENROUTER_MODEL` optional
   `APP_URL` optional, recommended for your production domain
5. Deploy.

Vercel will build the frontend into `dist/` and serve the backend through these serverless functions:
- `/api/health`
- `/api/guidance`
- `/api/sop/polish`
- `/api/visa/feedback`

## Optional local Vercel emulation

If you want to test the exact Vercel routing model locally, you can also run:
`vercel dev`
