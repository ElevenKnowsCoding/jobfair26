# Complete Job Fair System Guide

## 🎯 System Overview

Your job fair system now has:
1. ✅ Student registration form (main page)
2. ✅ QR code for printing
3. ✅ Admin login with password protection
4. ✅ Admin dashboard with live data
5. ✅ Activity logs
6. ✅ Excel export with all student data

## 📱 How It Works

### For Students:
1. Scan QR code at your stall
2. Fill registration form (Name, Email, Phone, College)
3. Upload CV (PDF/DOCX)
4. System extracts skills from CV
5. Confirm skills and get test link via email

### For You (Admin):
1. Print QR code and display at stall
2. Monitor registrations in real-time
3. Download Excel with all data
4. View activity logs

## 🔐 Admin Access

**Login URL:** `https://your-domain.com/admin`
**Password:** `zaina2026`

(Change password in: `/pages/admin/index.js` line 13)

## 📋 Pages & URLs

| Page | URL | Purpose |
|------|-----|---------|
| Registration Form | `/` | Students fill this |
| QR Code | `/qr-code` | Print this for stall |
| Admin Login | `/admin` | Login page |
| Admin Dashboard | `/admin/dashboard` | View all data |

## 🖨️ Print QR Code

1. Go to: `https://your-domain.com/qr-code`
2. Click "Print QR Code" button
3. Print and attach to your stall

## 📊 Excel Data Includes:

- ID
- Name (from form)
- Extracted Name (from CV)
- Email
- Phone
- College
- CV Filename
- Skills (extracted from CV)
- Applied At (timestamp)
- Test Status
- Test Score

## 📝 Activity Logs Show:

```
[2026-02-07T10:30:00.000Z] REGISTRATION: John Doe | john@email.com | +91 98765 43210 | MES College | ID: abc-123
[2026-02-07T10:32:00.000Z] CV UPLOADED: John Doe | File: resume.pdf | Skills: JavaScript, React | ID: abc-123
```

## 🚀 Deployment Steps (Hostinger)

1. Build project: `npm run build`
2. Create subdomain in Hostinger (e.g., jobfair.zainasolutions.com)
3. Enable Node.js app in hPanel
4. Upload all files via File Manager
5. Upload `server.js` file
6. Install dependencies: `npm install --production`
7. Start application in Node.js settings
8. Visit your subdomain!

## 📂 Files to Upload to Hostinger:

- `.next/` folder
- `components/` folder
- `data/` folder (create empty)
- `lib/` folder
- `pages/` folder
- `public/` folder
- `package.json`
- `next.config.js`
- `server.js`
- `.env.local` (if any)

## 🔄 Real-time Updates

Dashboard auto-refreshes every 5 seconds to show:
- New registrations
- CV uploads
- Activity logs

## 💾 Data Storage

All data stored in:
- `/data/applications.json` - All student data
- `/data/applications.xlsx` - Excel export
- `/data/activity.log` - Activity logs

## 🎨 Customization

To change admin password:
Edit `/pages/admin/index.js` line 13:
```javascript
if (password === 'YOUR_NEW_PASSWORD') {
```

## ✅ Testing Locally

1. Run: `npm run dev`
2. Visit: `http://localhost:3000`
3. QR Code: `http://localhost:3000/qr-code`
4. Admin: `http://localhost:3000/admin`

## 📞 Support

All data is automatically saved to Excel when:
- Student registers
- CV is uploaded
- Skills are confirmed

Download anytime from admin dashboard!
