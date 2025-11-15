# Deployment Guide

Your Next.js application is now configured for automatic deployment to Vercel via GitHub Actions.

## Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Supabase Environment Variables** - Already configured in your local `.env.local`

## Setup Steps

### Step 1: Connect Vercel to GitHub

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account (or create an account)
3. Click "New Project"
4. Select "Import Git Repository"
5. Find and select `KaiLozhichev/PRC`
6. Click "Import"

### Step 2: Configure Environment Variables in Vercel

In the Vercel project settings, add your Supabase environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

You can find these values in your Supabase project settings.

### Step 3: Get Your Vercel Credentials

You'll need three pieces of information to set up GitHub Actions:

#### Option A: Using Vercel CLI (Recommended)

```bash
npm i -g vercel
vercel login
vercel link
```

This will create a `.vercel` folder with your credentials.

#### Option B: Manual Setup

1. Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
2. Create a new token and copy it
3. Go to your GitHub repository Settings → Secrets and variables → Actions
4. Add the following secrets:

   - **VERCEL_TOKEN**: Your Vercel API token from step 2
   - **VERCEL_ORG_ID**: Your Vercel organization ID (found in Vercel settings)
   - **VERCEL_PROJECT_ID**: Your project ID (found in Vercel project settings)

### Step 4: Add GitHub Secrets

1. Go to your GitHub repository: https://github.com/KaiLozhichev/PRC
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   ```
   Name: VERCEL_TOKEN
   Value: (your Vercel token)
   ```

   ```
   Name: VERCEL_ORG_ID
   Value: (your Vercel org ID)
   ```

   ```
   Name: VERCEL_PROJECT_ID
   Value: (your Vercel project ID)
   ```

### Step 5: Deploy

Once secrets are configured, deployments happen automatically:

1. Push code to the `main` branch
2. GitHub Actions automatically builds the project
3. If build succeeds, it deploys to Vercel
4. Your app is live!

## Finding Your Vercel Credentials

### Vercel Token
- Go to [vercel.com/account/tokens](https://vercel.com/account/tokens)
- Create a new token
- Copy the token value

### Organization ID
- Go to [vercel.com/account/settings](https://vercel.com/account/settings)
- Find "Organization ID" in the General section

### Project ID
- Go to your Vercel project
- Click "Settings" → "General"
- Find "Project ID"

## Monitoring Deployments

You can monitor your deployments in two places:

1. **GitHub**: https://github.com/KaiLozhichev/PRC/actions
   - See build logs and workflow status

2. **Vercel Dashboard**: https://vercel.com/dashboard
   - See deployment history and live URL

## Troubleshooting

### Build fails on GitHub Actions
- Check the GitHub Actions logs for errors
- Common issues:
  - Missing environment variables
  - Incorrect Supabase credentials
  - Syntax errors in code

### Deployment to Vercel fails
- Check GitHub Actions logs first
- Then check Vercel deployment logs
- Verify all secrets are correctly set

### App is live but data doesn't load
- Verify Supabase credentials in Vercel project settings
- Check Vercel function logs for errors
- Ensure Supabase RLS policies allow anonymous access

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

## Useful Commands

```bash
# List Vercel projects
vercel list

# Check build logs
vercel logs

# Redeploy current version
vercel deploy --prod
```

## Support

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Docs**: https://vercel.com/docs
- **Supabase Docs**: https://supabase.com/docs
