const { generateQuestions } = require('../../../lib/questions');
const { getApplicationById } = require('../../../lib/database');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Application ID required' });
  }

  try {
    const application = await getApplicationById(id);
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // Generate 10 random questions
    const questions = generateQuestions();
    
    // Return questions without answers
    const questionsForStudent = questions.map((q, index) => ({
      id: index,
      question: q.q,
      field: q.field
    }));

    res.status(200).json({
      success: true,
      questions: questionsForStudent
    });
  } catch (error) {
    console.error('Quiz start error:', error);
    res.status(500).json({ error: 'Failed to start quiz' });
  }
}
