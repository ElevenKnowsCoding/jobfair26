const { formidable } = require('formidable');
const fs = require('fs');
const { parseCV } = require('../../../lib/cvParser');
const { updateApplication } = require('../../../lib/database');
const { log } = require('../../../lib/logger');

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Form parse error:', err);
        return res.status(500).json({ error: 'Failed to parse form: ' + err.message });
      }

      try {
        const applicationId = Array.isArray(fields.applicationId) ? fields.applicationId[0] : fields.applicationId;
        const file = Array.isArray(files.cv) ? files.cv[0] : files.cv;
        
        if (!file) {
          return res.status(400).json({ error: 'No file uploaded' });
        }

        const buffer = fs.readFileSync(file.filepath);
        const filename = file.originalFilename || file.newFilename || 'file.pdf';
        const parsed = await parseCV(buffer, filename);

        updateApplication(applicationId, {
          cvFileName: filename,
          extractedName: parsed.extractedName,
          skills: parsed.skills
        });

        log(`CV UPLOADED: ${parsed.extractedName || 'Unknown'} | File: ${filename} | Skills: ${parsed.skills.join(', ')} | ID: ${applicationId}`);

        res.status(200).json({
          success: true,
          extractedName: parsed.extractedName,
          skills: parsed.skills
        });
      } catch (error) {
        console.error('CV parse error:', error);
        res.status(500).json({ error: error.message || 'Failed to parse CV' });
      }
    });
  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ error: error.message });
  }
}
