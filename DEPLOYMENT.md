# Deployment Guide

Your Next.js application is configured for deployment to Vercel. We recommend using Vercel's GitHub App for the easiest setup.

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Supabase Environment Variables** - Already configured in your local `.env.local`

## Setup Steps (Recommended: Vercel GitHub App)

### Step 1: Install Vercel GitHub App

1. Go to your GitHub repository: https://github.com/KaiLozhichev/PRC
2. Click **Settings** → **Applications** → **Authorized OAuth Apps**
3. Or visit: https://github.com/apps/vercel
4. Click **Install** and select your repository
5. Authorize the Vercel GitHub App

### Step 2: Connect Repository to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Connect to GitHub (if not already connected)
4. Find and select `KaiLozhichev/PRC`
5. Click **Import**

### Step 3: Configure Environment Variables

In Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Add your Supabase credentials:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
     Value: (your Supabase project URL)
   - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     Value: (your Supabase anonymous key)

You can find these in your Supabase project settings under "API Keys".

### Step 4: Deploy

Your app will automatically deploy when you:
- Push to the `main` branch
- Create a pull request (creates preview deployment)
- Redeploy manually from Vercel dashboard

## Finding Your Supabase Credentials

1. Go to your Supabase project: https://supabase.com/dashboard
2. Click your project
3. Go to **Settings** → **API**
4. Copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Monitoring Deployments

### GitHub Actions
- Build validation logs: https://github.com/KaiLozhichev/PRC/actions

### Vercel Dashboard
- Deployment history: https://vercel.com/dashboard
- Live URL and logs

## Troubleshooting

### Build fails on GitHub Actions
- Check the GitHub Actions logs: https://github.com/KaiLozhichev/PRC/actions
- Common issues:
  - Node.js version mismatch
  - Missing dependencies
  - TypeScript errors

### App deploys but data doesn't load
1. Verify Supabase credentials in Vercel Environment Variables
2. Check browser console for fetch errors
3. Check Vercel function logs for backend errors
4. Ensure Supabase RLS policies allow anonymous access

### CORS errors
- Verify Supabase URL is correct
- Check that anon key is properly set
- Supabase CORS should be handled automatically

## Alternative Deployment Options

If you prefer not to use Vercel, you can deploy to:

- **Railway**: [railway.app](https://railway.app) - Similar to Heroku, free tier available
- **Render**: [render.com](https://render.com) - Free static site hosting
- **Netlify**: [netlify.com](https://netlify.com) - Best for static sites
- **AWS/DigitalOcean**: Self-hosted options
- **Traditional VPS**: Any Linux server with Node.js

## Local Development

To test locally before deploying:

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production build locally
pnpm start
```

## Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **GitHub Actions**: https://docs.github.com/en/actions
