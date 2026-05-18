# StreamForge 🚀

**StreamForge** is an all-in-one AI-powered video transcoding and media editing platform. Upload videos, transcode them to HLS multi-resolution format, and use AI tools (smart crop, background removal, transcription, and more) — all from a single clean dashboard.

---

## Tech Stack 💻

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, shadcn/ui, Zustand |
| Auth | Clerk |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Queue | BullMQ + Upstash Redis |
| Storage | AWS S3 |
| AI Editing | Cloudinary AI |
| Payments | Stripe |
| Video Processing | FFmpeg (Node.js child_process) |

---

## Prerequisites

Before running the project, make sure you have:

- **Node.js** v18+ installed
- **npm** v9+ installed
- **ffmpeg** installed and available in your system PATH
  - Windows: Download from https://ffmpeg.org/download.html and add `bin/` to PATH
  - Mac: `brew install ffmpeg`
  - Linux: `sudo apt install ffmpeg`
- Accounts on: **Clerk**, **Neon (PostgreSQL)**, **Upstash (Redis)**, **AWS S3**, **Cloudinary**, **Stripe**

---

## Project Structure

```
media-flow-main/
├── web/                  # Next.js frontend (deploy to Vercel)
├── redis-server/         # BullMQ worker (deploy to Render/Railway)
└── video-processing/     # FFmpeg transcoding script (called by redis-server)
```

---

## Running Locally

### Step 1 — Install Dependencies

Open **three separate terminals** and run:

```bash
# Terminal 1 — Frontend
cd web; npm install

# Terminal 2 — Background Worker
cd redis-server; npm install

# Terminal 3 — Video Processor (no need to run manually, spawned by redis-server)
cd video-processing; npm install
```

### Step 2 — Configure Environment Variables

Each package needs its own `.env` file. Copy the examples below.

#### `web/.env`
```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Database (Neon PostgreSQL)
DATABASE_URL=postgresql://...

# App URL
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_DOMAIN=localhost:3000
NEXT_PUBLIC_SCHEME=http://

# Cloudinary
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://...
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name

# AWS S3
AWS_ACCESS_KEY=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
VIDEO_BUCKET=your-raw-videos-bucket
VIDEO_UPLOAD_KEY=_videos_output
NEXT_PUBLIC_TARGET_VIDEO_BUCKET=your-processed-videos-bucket

# Upstash Redis
REDIS_URL=rediss://default:...@...upstash.io:6379

# Stripe
STRIPE_SECRET=sk_test_...

# Uploadcare
NEXT_PUBLIC_UPLOAD_CARE_PUBLIC_KEY=...
```

#### `redis-server/.env`
```env
REDIS_URL=rediss://default:...@...upstash.io:6379
AWS_ACCESS_KEY=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
VIDEO_BUCKET=your-raw-videos-bucket
PROCESSED_VIDEO_BUCKET=your-processed-videos-bucket
DATABASE_URL=postgresql://...
```

#### `video-processing/.env`
```env
AWS_ACCESS_KEY=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-south-1
VIDEO_BUCKET=your-raw-videos-bucket
PROCESSED_VIDEO_BUCKET=your-processed-videos-bucket
DATABASE_URL=postgresql://...
```

### Step 3 — Set up the Database

```bash
cd web
npx prisma db push
```

### Step 4 — Start the Application

Open **two terminals** and run simultaneously:

```bash
# Terminal 1 — Start the Next.js frontend
cd web
npm run dev
# → App runs at http://localhost:3000

# Terminal 2 — Start the Redis background worker
cd redis-server
npm start
# → Worker starts listening for video processing jobs
```

> ⚠️ **Keep both terminals open at the same time.** The worker in Terminal 2 processes videos in the background when you upload from the frontend.

### Step 5 — Test the Flow

1. Open `http://localhost:3000` in your browser
2. Sign up / sign in
3. Go to **Video Transcoding** in the sidebar
4. Drop a video file and click **Upload Video**
5. Watch Terminal 2 — it will log the processing job
6. The video status will change from `QUEUE` → `PROCESSING` → `PROCESSED`

---

## Deployment

### Frontend → Vercel

1. Push `web/` to a GitHub repository
2. Connect the repo to [Vercel](https://vercel.com)
3. Set all `web/.env` variables in Vercel's **Environment Variables** dashboard
4. Update `NEXT_PUBLIC_URL` to your Vercel production URL

### Background Worker → Render or Railway

1. Push `redis-server/` to GitHub (or use a monorepo)
2. Create a **Web Service** on [Render](https://render.com) or [Railway](https://railway.app)
3. Set **Start Command** to: `node src/index.js`
4. Set all `redis-server/.env` variables in the service environment settings
5. Deploy — the worker will stay alive and process jobs from Upstash Redis

> ℹ️ **No Docker required.** The video processing runs as a native Node.js child process on the host machine.

---

## Features

- 🎬 **Video Transcoding** — Upload → HLS multi-resolution output stored in S3
- ✂️ **AI Smart Crop** — Reframe videos for YouTube, TikTok, Instagram
- 🌐 **Auto Transcription** — Generate captions in multiple languages
- 🖼️ **Background Removal/Replacement** — Powered by Cloudinary AI
- 🔒 **Secure Sharing** — Embeddable iframes with domain locks & expiration
- 📊 **Analytics** — View time, engagement tracking per video
- 💳 **Billing** — Stripe-powered plans (Hobby, Pro, Unlimited)

---

## Contributing 🤝

Pull requests are welcome! If you find a bug or have a feature suggestion, open an issue.

---

**Thank you for using StreamForge!** 🌍
