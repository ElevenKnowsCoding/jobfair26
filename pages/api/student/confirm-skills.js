const { updateApplication } = require('../../../lib/database');
const { log } = require('../../../lib/logger');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { applicationId, skills } = req.body;

    if (!applicationId || !skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    await updateApplication(applicationId, {
      skills,
      testStatus: 'Pending'
    });

    log(`SKILLS CONFIRMED: ID: ${applicationId} | Skills: ${skills.join(', ')}`);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Confirm skills error:', error);
    res.status(500).json({ error: 'Failed to confirm skills' });
  }
}
