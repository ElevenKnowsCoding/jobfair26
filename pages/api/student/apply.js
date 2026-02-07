const { v4: uuidv4 } = require('uuid');
const { saveApplication } = require('../../../lib/database');
const { log } = require('../../../lib/logger');

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, college } = req.body;

    if (!name || !email || !phone || !college) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const application = {
      id: uuidv4(),
      name,
      email,
      phone,
      college,
      createdAt: new Date().toISOString(),
      testStatus: 'Pending'
    };

    saveApplication(application);

    log(`REGISTRATION: ${name} | ${email} | ${phone} | ${college} | ID: ${application.id}`);

    res.status(200).json({ success: true, applicationId: application.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit application' });
  }
}
