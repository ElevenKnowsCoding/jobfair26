const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const excelFile = path.join(process.cwd(), 'data', 'applications.xlsx');
    
    if (!fs.existsSync(excelFile)) {
      return res.status(404).json({ error: 'No data available' });
    }

    const fileBuffer = fs.readFileSync(excelFile);
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=applications.xlsx');
    res.send(fileBuffer);
  } catch (error) {
    console.error('Failed to download Excel:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
}
