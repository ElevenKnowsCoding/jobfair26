const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DATA_DIR = path.join(process.cwd(), 'data');
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json');
const TESTS_FILE = path.join(DATA_DIR, 'tests.json');
const EXCEL_FILE = path.join(DATA_DIR, 'applications.xlsx');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const initFile = (file) => {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, JSON.stringify([]));
  }
};

initFile(APPLICATIONS_FILE);
initFile(TESTS_FILE);

const readJSON = (file) => {
  const data = fs.readFileSync(file, 'utf8');
  return JSON.parse(data);
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

const saveToExcel = (applications) => {
  const rows = applications.map(app => {
    const row = {
      ID: app.id,
      Name: app.name,
      'Extracted Name': app.extractedName || '',
      Email: app.email,
      Phone: app.phone,
      College: app.college,
      'CV File': app.cvFileName || '',
    };
    
    // Add each skill as a separate column
    const skills = app.skills || [];
    skills.forEach((skill, index) => {
      row[`Skill ${index + 1}`] = skill;
    });
    
    row['Applied At'] = app.createdAt;
    row['Test Status'] = app.testStatus || 'Pending';
    row['Test Score'] = app.testScore || 'N/A';
    
    return row;
  });
  
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Applications');
  XLSX.writeFile(wb, EXCEL_FILE);
};

module.exports = {
  getApplications: () => readJSON(APPLICATIONS_FILE),
  
  saveApplication: (app) => {
    const apps = readJSON(APPLICATIONS_FILE);
    apps.push(app);
    writeJSON(APPLICATIONS_FILE, apps);
    saveToExcel(apps);
    return app;
  },
  
  updateApplication: (id, updates) => {
    const apps = readJSON(APPLICATIONS_FILE);
    const index = apps.findIndex(a => a.id === id);
    if (index !== -1) {
      apps[index] = { ...apps[index], ...updates };
      writeJSON(APPLICATIONS_FILE, apps);
      saveToExcel(apps);
      return apps[index];
    }
    return null;
  },
  
  getApplicationById: (id) => {
    const apps = readJSON(APPLICATIONS_FILE);
    return apps.find(a => a.id === id);
  },
  
  getTests: () => readJSON(TESTS_FILE),
  
  saveTest: (test) => {
    const tests = readJSON(TESTS_FILE);
    tests.push(test);
    writeJSON(TESTS_FILE, tests);
    return test;
  },
  
  getTestById: (id) => {
    const tests = readJSON(TESTS_FILE);
    return tests.find(t => t.id === id);
  }
};
