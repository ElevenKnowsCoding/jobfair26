# Hostinger Deployment Guide - Zaina Solutions Job Fair
## (Static Site + PHP Backend - Works on ANY Hostinger Plan)

## Your Server Path
`/home/u545375382/domains/zainasolutions.com/public_html/jobfair26`

## Step-by-Step Deployment

### 1. Build Static Site Locally
```bash
cd "c:\Users\Eleven\Desktop\New folder (7)\jobfair26"
copy next.config.static.js next.config.js
npm run build
```
This creates an `out` folder with static HTML files.

### 2. Login to Hostinger
- Go to hpanel.hostinger.com
- Login with your credentials

### 3. Open File Manager & Backup Existing
1. In hPanel, click "File Manager"
2. Navigate to: `/home/u545375382/domains/zainasolutions.com/public_html/`
3. **IMPORTANT:** Right-click on `jobfair26` folder → Download (backup)
4. Enter the `jobfair26` folder

### 4. Delete Old Files (Keep data folder!)
1. In `jobfair26` folder, select and delete:
   - All `.html` files
   - `_next` folder (if exists)
   - Old `admin`, `qr-code` folders
2. **DO NOT DELETE:** `data` folder, `public/uploads` folder

### 5. Upload New Static Files
1. Select all files/folders from `out` folder on your computer:
   - `index.html`
   - `_next` folder
   - `admin` folder
   - `qr-code` folder
   - `thank-you` folder
   - Any other HTML files
2. Click "Upload" button
3. Select and upload all files
4. Wait for upload to complete

### 6. Upload PHP Backend
1. Delete old `api` folder if exists
2. Upload the new `api` folder from your project
3. Upload/replace `.htaccess` file from your project

### 7. Check Data Folders
1. Verify `data` folder exists (should have your existing data)
2. Verify `public/uploads` folder exists
3. If missing, create them:
   - Create folder: `data`
   - Create folder: `public` (if not exists)
   - Inside `public`, create: `uploads`

### 8. Verify Folder Permissions
1. Right-click on `data` folder → Permissions → Ensure `755`
2. Right-click on `public/uploads` folder → Permissions → Ensure `755`

### 9. Test Your Site
1. Visit: `https://zainasolutions.com/jobfair26`
2. Check student form loads
3. Check admin login works
4. Verify existing data still shows in admin

## Access Your Application

- **Student Form:** https://zainasolutions.com/jobfair26
- **QR Code:** https://zainasolutions.com/jobfair26/qr-code
- **Admin Login:** https://zainasolutions.com/jobfair26/admin
- **Admin Password:** zaina2026

(Or use subdomain if created: https://jobfair.zainasolutions.com)

## Troubleshooting

### If pages show 404:
1. Check `.htaccess` file uploaded correctly
2. Verify all files from `out` folder uploaded
3. Check file permissions

### If form submission fails:
1. Check `api` folder uploaded correctly
2. Verify `data` folder exists with 755 permissions
3. Check PHP error logs in hPanel

### If CV upload fails:
1. Check `public/uploads` folder exists
2. Verify folder permissions (755)
3. Check file size limit (5MB max)

## File Structure on Server
```
/home/u545375382/domains/zainasolutions.com/public_html/jobfair26/
├── index.html
├── _next/
├── admin/
│   └── index.html
├── qr-code/
│   └── index.html
├── api/
│   ├── config.php
│   ├── student/
│   │   ├── apply.php
│   │   └── upload-cv.php
│   └── admin/
│       ├── applications.php
│       ├── logs.php
│       ├── delete-application.php
│       └── download-excel.php
├── data/
│   ├── applications.json
│   └── activity.log
├── public/
│   └── uploads/
└── .htaccess
```

## Quick Update Checklist

- [ ] Backup existing `jobfair26` folder
- [ ] Build project locally (`npm run build`)
- [ ] Delete old HTML files (keep `data` folder!)
- [ ] Upload all files from `out` folder
- [ ] Upload new `api` folder
- [ ] Upload `.htaccess` file
- [ ] Verify `data` folder exists (755 permissions)
- [ ] Verify `public/uploads` folder exists (755 permissions)
- [ ] Test student form
- [ ] Test admin login
- [ ] Verify existing data still shows

## Important Notes

1. **No Node.js Required:** Works on any Hostinger plan (uses PHP)
2. **Data Backup:** Download CSV regularly from admin dashboard
3. **Logs Location:** `/data/activity.log`
4. **Applications:** `/data/applications.json`
5. **Uploads:** `/public/uploads/`

## Updating Your Site

1. Make changes locally
2. Run `npm run build`
3. Upload new files from `out` folder (overwrite existing)
4. Don't delete `data` or `api` folders

## Support

If you face issues:
1. Check file permissions (755 for folders)
2. Check PHP error logs in hPanel
3. Verify `.htaccess` uploaded correctly
4. Contact Hostinger support if needed
