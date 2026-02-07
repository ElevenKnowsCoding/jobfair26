# Deployment Guide for Subdomain

## Option 1: Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```
   npm i -g vercel
   ```

2. Login to Vercel:
   ```
   vercel login
   ```

3. Deploy from project directory:
   ```
   cd jobfair26
   vercel
   ```

4. Follow prompts and note the deployment URL

5. Add custom domain in Vercel dashboard:
   - Go to Project Settings > Domains
   - Add your subdomain (e.g., jobfair.yourdomain.com)
   - Add the CNAME record to your DNS:
     - Type: CNAME
     - Name: jobfair (or your subdomain)
     - Value: cname.vercel-dns.com

## Option 2: Deploy to cPanel/Shared Hosting

1. Build the project:
   ```
   npm run build
   ```

2. Install Node.js on your hosting (if not available, use Node.js selector in cPanel)

3. Upload files via FTP/File Manager to your subdomain directory

4. SSH into server and run:
   ```
   cd /path/to/subdomain
   npm install --production
   npm run start
   ```

5. Set up PM2 to keep it running:
   ```
   npm install -g pm2
   pm2 start npm --name "jobfair" -- start
   pm2 save
   pm2 startup
   ```

6. Configure subdomain to point to port 3000 (or use reverse proxy in .htaccess)

## Access Activity Logs

After deployment, visit:
- https://your-subdomain.com/admin/logs

Logs are stored in: `data/activity.log`

## Log Format

- REGISTRATION: Shows when a student registers
- CV UPLOADED: Shows when CV is uploaded with extracted skills

Example:
```
[2026-02-07T10:30:00.000Z] REGISTRATION: John Doe | john@email.com | +91 98765 43210 | MES College of Engineering, Kuttippuram | ID: abc-123
[2026-02-07T10:32:00.000Z] CV UPLOADED: John Doe | File: resume.pdf | Skills: JavaScript, React, Node.js | ID: abc-123
```
