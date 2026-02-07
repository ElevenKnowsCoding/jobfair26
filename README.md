# Zaina Solutions - Job Fair 2026 Recruitment System

## Features
- Student application form with college selection
- CV upload (PDF/DOCX) with automatic skill extraction
- Skill verification and modification
- Automated email with test link
- 10-question aptitude test with copy-paste prevention
- Time tracking for test completion
- Admin dashboard to track all applications
- Excel export of all applications
- Detailed test results view for admins

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Email
Edit `.env.local` file:
```
YAGMAIL_USER=your-email@gmail.com
YAGMAIL_PASSWORD=your-app-password
BASE_URL=http://localhost:3000
```

**To get Gmail App Password:**
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate new password
4. Use that password in YAGMAIL_PASSWORD

### 3. Update College List
Edit `pages/index.js` line 6-11 to add your 4 colleges:
```javascript
const COLLEGES = [
  'Your College 1',
  'Your College 2',
  'Your College 3',
  'Your College 4'
];
```

### 4. Run Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Pages

### Student Portal
- `/` - Application form
- `/upload-cv` - CV upload and skill verification
- `/test/[testId]` - Aptitude test
- `/thank-you` - Confirmation page

### Admin Dashboard
- `/admin/dashboard` - View all applications and test results

## Data Storage
- Applications saved to: `data/applications.json`
- Tests saved to: `data/tests.json`
- Excel export: `data/applications.xlsx`

## Deployment to Your Website

### Option 1: Deploy as Subdirectory
1. Build the project:
```bash
npm run build
```

2. Copy the `.next`, `public`, `node_modules`, and `package.json` to your server

3. Run on your server:
```bash
npm start
```

### Option 2: Integrate with Existing Website
Add an iframe or link from your main website to this application.

## Features Details

### CV Parsing
- Supports PDF and DOCX formats
- Extracts skills using keyword matching
- Identifies: Backend, Frontend, React, Full Stack, DevOps, Data Science, Mobile, UI/UX, Database, Cloud roles

### Test System
- 10 questions based on detected skills
- Copy-paste disabled
- Time tracking from start to submission
- Automatic scoring (visible only to admin)

### Admin Features
- View all applications in table format
- See test scores and completion times
- View detailed test answers vs correct answers
- Export to Excel automatically

## Customization

### Add More Skills
Edit `lib/cvParser.js` - Add keywords to SKILL_KEYWORDS object

### Add More Questions
Edit `lib/questions.js` - Add questions for each skill category

### Change Email Template
Edit `lib/email.js` - Modify the HTML email template

## Support
For issues or questions, contact Zaina Solutions team.
