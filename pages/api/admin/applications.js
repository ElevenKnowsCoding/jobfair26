const { getApplications, getTests } = require('../../../lib/database');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const applications = getApplications();
    const tests = getTests();

    const enrichedApps = applications.map(app => {
      const test = tests.find(t => t.applicationId === app.id);
      return {
        ...app,
        testDetails: test ? {
          score: test.score,
          timeTaken: test.timeTaken,
          completedAt: test.completedAt,
          status: test.status
        } : null
      };
    });

    res.status(200).json({ success: true, applications: enrichedApps });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
}
