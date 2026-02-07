# Setup Neon Database (Free PostgreSQL)

## Step 1: Create Neon Account

1. Go to https://neon.tech
2. Click "Sign Up" → Continue with GitHub
3. Authorize Neon

## Step 2: Create Database

1. Click "Create Project"
2. Project name: `jobfair26`
3. Region: Choose closest to you
4. Click "Create Project"

## Step 3: Get Connection String

1. After project created, you'll see connection details
2. Copy the **Connection String** (starts with `postgresql://`)
3. It looks like: `postgresql://user:password@host/database`

## Step 4: Add to Vercel

1. Go to https://vercel.com/dashboard
2. Click your `jobfair26` project
3. Go to "Settings" → "Environment Variables"
4. Add new variable:
   - **Name:** `DATABASE_URL`
   - **Value:** Paste your Neon connection string
   - **Environment:** Production, Preview, Development (check all)
5. Click "Save"

## Step 5: Redeploy

1. Go to "Deployments" tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait 2 minutes

Done! Your data will now persist permanently.

## Free Tier Limits

- 0.5 GB storage
- 100 hours compute/month
- Perfect for job fair app!

## Verify It Works

1. Visit your site: https://jobfair26.vercel.app
2. Submit a test application
3. Check admin panel - data should persist
4. Redeploy - data should still be there!
