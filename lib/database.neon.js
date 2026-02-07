const { neon } = require('@neondatabase/serverless');

let sql;
if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL);
}

// Initialize database tables
async function initDB() {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS applications (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        college TEXT,
        cv_file_name TEXT,
        extracted_name TEXT,
        skills TEXT[],
        created_at TIMESTAMP DEFAULT NOW(),
        test_status TEXT DEFAULT 'Pending',
        test_score TEXT
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS tests (
        id TEXT PRIMARY KEY,
        application_id TEXT,
        answers JSONB,
        score INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
  } catch (error) {
    console.error('DB Init Error:', error);
  }
}

module.exports = {
  getApplications: async () => {
    if (!sql) return [];
    await initDB();
    try {
      const result = await sql`SELECT * FROM applications ORDER BY created_at DESC`;
      return result.map(row => ({
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        college: row.college,
        cvFileName: row.cv_file_name,
        extractedName: row.extracted_name,
        skills: row.skills || [],
        createdAt: row.created_at,
        testStatus: row.test_status,
        testScore: row.test_score
      }));
    } catch (error) {
      console.error('Get applications error:', error);
      return [];
    }
  },
  
  saveApplication: async (app) => {
    if (!sql) throw new Error('Database not configured');
    await initDB();
    try {
      await sql`
        INSERT INTO applications (id, name, email, phone, college, cv_file_name, extracted_name, skills, created_at, test_status)
        VALUES (${app.id}, ${app.name}, ${app.email}, ${app.phone || ''}, ${app.college || ''}, 
                ${app.cvFileName || ''}, ${app.extractedName || ''}, ${app.skills || []}, 
                ${app.createdAt}, ${app.testStatus || 'Pending'})
      `;
      return app;
    } catch (error) {
      console.error('Save application error:', error);
      throw error;
    }
  },
  
  updateApplication: async (id, updates) => {
    if (!sql) return null;
    await initDB();
    try {
      const setClauses = [];
      if (updates.testStatus) setClauses.push(sql`test_status = ${updates.testStatus}`);
      if (updates.testScore) setClauses.push(sql`test_score = ${updates.testScore}`);
      
      if (setClauses.length > 0) {
        await sql`UPDATE applications SET ${sql(setClauses)} WHERE id = ${id}`;
      }
      
      return await module.exports.getApplicationById(id);
    } catch (error) {
      console.error('Update application error:', error);
      return null;
    }
  },
  
  getApplicationById: async (id) => {
    if (!sql) return null;
    await initDB();
    try {
      const result = await sql`SELECT * FROM applications WHERE id = ${id}`;
      if (result.length === 0) return null;
      
      const row = result[0];
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        college: row.college,
        cvFileName: row.cv_file_name,
        extractedName: row.extracted_name,
        skills: row.skills || [],
        createdAt: row.created_at,
        testStatus: row.test_status,
        testScore: row.test_score
      };
    } catch (error) {
      console.error('Get application by ID error:', error);
      return null;
    }
  },
  
  deleteApplication: async (id) => {
    if (!sql) return false;
    await initDB();
    try {
      await sql`DELETE FROM applications WHERE id = ${id}`;
      return true;
    } catch (error) {
      console.error('Delete application error:', error);
      return false;
    }
  },
  
  getTests: async () => {
    if (!sql) return [];
    await initDB();
    try {
      const result = await sql`SELECT * FROM tests ORDER BY created_at DESC`;
      return result.map(row => ({
        id: row.id,
        applicationId: row.application_id,
        answers: row.answers,
        score: row.score,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Get tests error:', error);
      return [];
    }
  },
  
  saveTest: async (test) => {
    if (!sql) throw new Error('Database not configured');
    await initDB();
    try {
      await sql`
        INSERT INTO tests (id, application_id, answers, score, created_at)
        VALUES (${test.id}, ${test.applicationId}, ${JSON.stringify(test.answers)}, ${test.score}, NOW())
      `;
      return test;
    } catch (error) {
      console.error('Save test error:', error);
      throw error;
    }
  },
  
  getTestById: async (id) => {
    if (!sql) return null;
    await initDB();
    try {
      const result = await sql`SELECT * FROM tests WHERE id = ${id}`;
      if (result.length === 0) return null;
      
      const row = result[0];
      return {
        id: row.id,
        applicationId: row.application_id,
        answers: row.answers,
        score: row.score,
        createdAt: row.created_at
      };
    } catch (error) {
      console.error('Get test by ID error:', error);
      return null;
    }
  }
};
