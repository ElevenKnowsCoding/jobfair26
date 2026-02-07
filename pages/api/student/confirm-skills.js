const { v4: uuidv4 } = require('uuid');
const { updateApplication, saveTest } = require('../../../lib/database');
const { sendTestLink } = require('../../../lib/email');
const { getQuestionsForSkills } = require('../../../lib/questions');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { applicationId, skills } = req.body;

    if (!applicationId || !skills || !Array.isArray(skills)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const questions = getQuestionsForSkills(skills);
    const testId = uuidv4();

    const test = {
      id: testId,
      applicationId,
      questions,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };

    saveTest(test);

    const app = updateApplication(applicationId, {
      skills,
      testId,
      testStatus: 'Sent'
    });

    await sendTestLink(app.email, app.name, testId);

    res.status(200).json({ success: true, message: 'Test link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send test link' });
  }
}
