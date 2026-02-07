const { getTestById } = require('../../../lib/database');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { testId } = req.query;

    if (!testId) {
      return res.status(400).json({ error: 'Test ID required' });
    }

    const test = getTestById(testId);

    if (!test) {
      return res.status(404).json({ error: 'Test not found' });
    }

    if (test.status === 'Completed') {
      return res.status(400).json({ error: 'Test already completed' });
    }

    const questionsWithoutAnswers = test.questions.map(q => ({ q: q.q }));

    res.status(200).json({
      success: true,
      questions: questionsWithoutAnswers,
      testId: test.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch test' });
  }
}
