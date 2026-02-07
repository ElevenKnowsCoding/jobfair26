const { getApplications } = require('../../../lib/database');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DATA_DIR = path.join(process.cwd(), 'data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const EXCEL_FILE = path.join(DATA_DIR, 'applications.xlsx');

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { id } = req.body;
    const apps = getApplications();
    const filtered = apps.filter(a => a.id !== id);
    
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(filtered, null, 2));
    
    // Update Excel with skills in separate columns
    const rows = filtered.map(app => {
      const row = {
        ID: app.id,
        Name: app.name,
        'Extracted Name': app.extractedName || '',
        Email: app.email,
        Phone: app.phone,
        College: app.college,
        'CV File': app.cvFileName || '',
      };
      
      const skills = app.skills || [];
      skills.forEach((skill, index) => {
        row[`Skill ${index + 1}`] = skill;
      });
      
      row['Applied At'] = app.createdAt;
      return row;
    });
    
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Applications');
    XLSX.writeFile(wb, EXCEL_FILE);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to delete:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
}
