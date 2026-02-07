const fs = require('fs');
const path = require('path');
const { getTestById, updateApplication } = require('../../../lib/database');

const TESTS_FILE = path.join(process.cwd(), 'data', 'tests.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testId, answers, timeTaken } = req.body;

    if (!testId || !answers || !timeTaken) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const test = getTestById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.status === 'Completed') {
      return res.status(400).json({ error: 'Test already submitted' });
    }

    let score = 0;
    test.questions.forEach((q, idx) => {
      if (answers[idx] && q.a.toLowerCase().includes(answers[idx].toLowerCase().substring(0, 20))) {
        score++;
      }
    });

    const tests = JSON.parse(fs.readFileSync(TESTS_FILE, 'utf8'));
    const testIndex = tests.findIndex(t => t.id === testId);
    
    if (testIndex !== -1) {
      tests[testIndex].status = 'Completed';
      tests[testIndex].answers = answers;
      tests[testIndex].score = score;
      tests[testIndex].timeTaken = timeTaken;
      tests[testIndex].completedAt = new Date().toISOString();
      fs.writeFileSync(TESTS_FILE, JSON.stringify(tests, null, 2));
    }

    updateApplication(test.applicationId, {
      testStatus: 'Completed',
      testScore: `${score}/10`,
      testTime: timeTaken
    });

    res.status(200).json({
      success: true,
      message: 'Test submitted successfully',
      score: `${score}/10`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit test' });
  }
}
