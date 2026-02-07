// Simple in-memory storage for Vercel (temporary solution)
// Data resets on each deployment - use Vercel KV or Postgres for persistence

let applications = [];
let tests = [];

module.exports = {
  getApplications: () => applications,
  
  saveApplication: (app) => {
    applications.push(app);
    return app;
  },
  
  updateApplication: (id, updates) => {
    const index = applications.findIndex(a => a.id === id);
    if (index !== -1) {
      applications[index] = { ...applications[index], ...updates };
      return applications[index];
    }
    return null;
  },
  
  getApplicationById: (id) => {
    return applications.find(a => a.id === id);
  },
  
  deleteApplication: (id) => {
    applications = applications.filter(a => a.id !== id);
    return true;
  },
  
  getTests: () => tests,
  
  saveTest: (test) => {
    tests.push(test);
    return test;
  },
  
  getTestById: (id) => {
    return tests.find(t => t.id === id);
  }
};
