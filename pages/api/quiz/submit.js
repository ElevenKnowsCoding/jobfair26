const { QUESTIONS } = require('../../../lib/questions');
const { updateApplication } = require('../../../lib/database');
const { log } = require('../../../lib/logger');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { applicationId, answers, timeSpent } = req.body;

  if (!applicationId || !answers) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await updateApplication(applicationId, {
      testStatus: 'Completed',
      testScore: 'Quiz Completed'
    });

    log(`QUIZ COMPLETED: ID: ${applicationId} | Time: ${timeSpent}s | Answers: ${Object.keys(answers).length}`);

    res.status(200).json({
      success: true
    });
  } catch (error) {
    console.error('Quiz submit error:', error);
    res.status(500).json({ error: 'Failed to submit quiz' });
  }
}
