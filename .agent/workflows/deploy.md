---
description: How to deploy this Next.js application
---

# Deployment Guide

Since this is a Next.js application, the recommended deployment platform is **Vercel**.

## Option 1: Vercel (Recommended)

1. **Push your code to GitHub:**
   - Create a repository on GitHub.
   - Run `git init`.
   - Run `git remote add origin <your-repo-url>`.
   - Run `git add . && git commit -m "deploy"` and `git push -u origin main`.

2. **Connect to Vercel:**
   - Go to [Vercel](https://vercel.com).
   - Click "Add New" -> "Project".
   - Import your GitHub repository.
   - Vercel will automatically detect Next.js settings.
   - Click **Deploy**.

## Option 2: Netlify

1. Connect your GitHub repo to [Netlify](https://netlify.com).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `.next`

## Option 3: Manual Build (For Testing)

If you want to test how the production build looks locally:
// turbo
1. Run `npm run build`
2. Run `npm run start` (This starts the production server on localhost:3000)
