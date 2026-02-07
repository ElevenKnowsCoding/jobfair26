# Vercel Deployment Guide - Zaina Solutions Job Fair

## Step 1: Prepare Your Project

### 1.1 Create .gitignore (if not exists)
```
node_modules/
.next/
out/
.env.local
data/
public/uploads/
.DS_Store
```

### 1.2 Initialize Git (if not done)
```bash
cd "c:\Users\Eleven\Desktop\New folder (7)\jobfair26"
git init
git add .
git commit -m "Initial commit"
```

## Step 2: Push to GitHub

### 2.1 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `jobfair26` (or any name)
3. Make it Private (recommended)
4. Don't initialize with README
5. Click "Create repository"

### 2.2 Push Your Code
```bash
git remote add origin https://github.com/YOUR_USERNAME/jobfair26.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Sign Up/Login
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel

### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Find your `jobfair26` repository
3. Click "Import"

### 3.3 Configure Project
- **Framework Preset:** Next.js (auto-detected)
- **Root Directory:** ./
- **Build Command:** `npm run build` (auto-filled)
- **Output Directory:** .next (auto-filled)
- **Install Command:** `npm install` (auto-filled)

### 3.4 Environment Variables (Optional)
Add if needed:
- `NODE_ENV` = `production`

### 3.5 Deploy
1. Click "Deploy"
2. Wait 2-3 minutes
3. Done! 🎉

## Step 4: Access Your Site

Your site will be live at:
```
https://jobfair26.vercel.app
```
(or custom domain if configured)

- **Student Form:** https://jobfair26.vercel.app
- **Admin:** https://jobfair26.vercel.app/admin
- **Password:** zaina2026

## Step 5: Custom Domain (Optional)

### 5.1 Add Domain
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add: `jobfair.zainasolutions.com`

### 5.2 Configure DNS in Hostinger
1. Go to Hostinger hPanel
2. Domains → DNS/Name Servers
3. Add CNAME record:
   - **Type:** CNAME
   - **Name:** jobfair
   - **Points to:** cname.vercel-dns.com
4. Save

Wait 5-10 minutes for DNS propagation.

## Important Notes

### Data Storage
⚠️ **Vercel is serverless** - file storage (data folder) won't persist between deployments.

**Solutions:**
1. **Use Vercel KV** (Redis) - Recommended
2. **Use external database** (MongoDB, PostgreSQL)
3. **Use Vercel Blob** for file uploads

### Current Limitations
- `data/applications.json` won't persist
- `public/uploads/` won't persist
- Need to migrate to database

## Quick Database Migration (Optional)

I can help you migrate to:
1. **Vercel KV** (Redis) - Free tier available
2. **MongoDB Atlas** - Free tier available
3. **Supabase** - Free PostgreSQL

Let me know if you want to add database support!

## Updating Your Site

1. Make changes locally
2. Commit and push:
```bash
git add .
git commit -m "Update"
git push
```
3. Vercel auto-deploys in 2 minutes!

## Advantages Over Hostinger

✅ Free SSL certificate
✅ Global CDN (super fast)
✅ Auto-deploys on git push
✅ No server management
✅ Built for Next.js
✅ Free tier (generous limits)
✅ No build issues

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
