// Question bank - 3 questions per field
const QUESTIONS = {
  'Backend Developer': [
    { q: 'What does API stand for?', a: 'Application Programming Interface' },
    { q: 'Which HTTP method is used to retrieve data from a server?', a: 'GET' },
    { q: 'What is the default port number for HTTP?', a: '80' }
  ],
  'Frontend Developer': [
    { q: 'What does HTML stand for?', a: 'HyperText Markup Language' },
    { q: 'Which CSS property is used to change text color?', a: 'color' },
    { q: 'What does DOM stand for?', a: 'Document Object Model' }
  ],
  'React JS': [
    { q: 'What is the command to create a new React app?', a: 'npx create-react-app' },
    { q: 'What hook is used to manage state in functional components?', a: 'useState' },
    { q: 'What is JSX?', a: 'JavaScript XML' }
  ],
  'Full Stack Developer': [
    { q: 'What does MERN stack stand for?', a: 'MongoDB Express React Node' },
    { q: 'What is the purpose of middleware in Express?', a: 'To process requests between client and server' },
    { q: 'What does REST stand for?', a: 'Representational State Transfer' }
  ],
  'DevOps': [
    { q: 'What does CI/CD stand for?', a: 'Continuous Integration Continuous Deployment' },
    { q: 'What is Docker used for?', a: 'Containerization' },
    { q: 'What is the purpose of Jenkins?', a: 'Automation and CI/CD' }
  ],
  'Data Science': [
    { q: 'What library is commonly used for data manipulation in Python?', a: 'Pandas' },
    { q: 'What does ML stand for?', a: 'Machine Learning' },
    { q: 'What is NumPy used for?', a: 'Numerical computing' }
  ],
  'Mobile Developer': [
    { q: 'What language is used for iOS development?', a: 'Swift' },
    { q: 'What is React Native?', a: 'Cross-platform mobile framework' },
    { q: 'What language is used for Android development?', a: 'Kotlin' }
  ],
  'UI/UX Designer': [
    { q: 'What does UI stand for?', a: 'User Interface' },
    { q: 'What is Figma used for?', a: 'Design and prototyping' },
    { q: 'What does UX stand for?', a: 'User Experience' }
  ],
  'Database Administrator': [
    { q: 'What does SQL stand for?', a: 'Structured Query Language' },
    { q: 'What command is used to retrieve data from a database?', a: 'SELECT' },
    { q: 'What is a primary key?', a: 'Unique identifier for a record' }
  ],
  'Cloud Engineer': [
    { q: 'What does AWS stand for?', a: 'Amazon Web Services' },
    { q: 'What is S3 used for in AWS?', a: 'Storage' },
    { q: 'What does EC2 stand for?', a: 'Elastic Compute Cloud' }
  ],
  'Quality Assurance': [
    { q: 'What does QA stand for?', a: 'Quality Assurance' },
    { q: 'What is Selenium used for?', a: 'Test automation' },
    { q: 'What is regression testing?', a: 'Testing after changes to ensure no new bugs' }
  ],
  'Project Manager': [
    { q: 'What does Agile methodology focus on?', a: 'Iterative development' },
    { q: 'What is a sprint in Scrum?', a: 'Time-boxed iteration' },
    { q: 'What does KPI stand for?', a: 'Key Performance Indicator' }
  ],
  'Business Analyst': [
    { q: 'What is the purpose of requirements gathering?', a: 'To understand business needs' },
    { q: 'What does ROI stand for?', a: 'Return on Investment' },
    { q: 'What is a use case?', a: 'Description of system functionality' }
  ],
  'Cybersecurity': [
    { q: 'What does SSL stand for?', a: 'Secure Sockets Layer' },
    { q: 'What is phishing?', a: 'Fraudulent attempt to obtain sensitive information' },
    { q: 'What is encryption?', a: 'Converting data into coded form' }
  ],
  'Network Engineer': [
    { q: 'What does IP stand for?', a: 'Internet Protocol' },
    { q: 'What is the purpose of a router?', a: 'To route data between networks' },
    { q: 'What does DNS stand for?', a: 'Domain Name System' }
  ],
  'System Administrator': [
    { q: 'What is Linux?', a: 'Open-source operating system' },
    { q: 'What does SSH stand for?', a: 'Secure Shell' },
    { q: 'What is Active Directory used for?', a: 'User and resource management' }
  ]
};

// Generate 10 random questions from all fields
function generateQuestions() {
  const allQuestions = [];
  
  // Collect all questions with their field
  Object.entries(QUESTIONS).forEach(([field, questions]) => {
    questions.forEach(q => {
      allQuestions.push({ ...q, field });
    });
  });
  
  // Shuffle and pick 10
  const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

module.exports = { generateQuestions, QUESTIONS };
