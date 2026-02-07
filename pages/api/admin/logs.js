const fs = require('fs');
const path = require('path');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const logFile = path.join(process.cwd(), 'data', 'activity.log');
    
    if (!fs.existsSync(logFile)) {
      return res.status(200).json({ success: true, logs: [] });
    }

    const content = fs.readFileSync(logFile, 'utf-8');
    const logs = content.trim().split('\n').reverse().slice(0, 100);

    res.status(200).json({ success: true, logs });
  } catch (error) {
    console.error('Failed to read logs:', error);
    res.status(500).json({ error: 'Failed to read logs' });
  }
}
