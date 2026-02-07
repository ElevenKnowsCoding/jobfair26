# Hostinger Deployment (Without Node.js)

## Quick Steps

### 1. Build Static Site
```bash
cd "c:\Users\Eleven\Desktop\New folder (7)\jobfair26"
copy next.config.static.js next.config.js
npm run build
```

### 2. Upload to Hostinger
Upload these to `/public_html/jobfair26/`:
- `out/` folder contents → root of jobfair26
- `api/` folder → as is
- `data/` folder (create empty)
- `public/uploads/` folder (create empty)
- `.htaccess` file

### 3. Set Permissions
- `data/` → 755
- `public/uploads/` → 755

### 4. Done!
Visit: https://zainasolutions.com/jobfair26

## File Structure on Server
```
/public_html/jobfair26/
├── index.html (from out/)
├── _next/ (from out/)
├── admin/ (from out/)
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
├── public/
│   └── uploads/
└── .htaccess
```

## URLs
- Student Form: https://zainasolutions.com/jobfair26
- Admin: https://zainasolutions.com/jobfair26/admin
- Password: zaina2026
