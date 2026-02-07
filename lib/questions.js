const QUESTIONS = {
  'Backend Developer': [
    { q: 'What is the purpose of middleware in Express.js?', a: 'Functions that execute during request-response cycle' },
    { q: 'Explain the difference between SQL and NoSQL databases.', a: 'SQL is relational with fixed schema, NoSQL is flexible document-based' },
    { q: 'What is RESTful API?', a: 'Architectural style using HTTP methods for CRUD operations' },
    { q: 'What is the purpose of indexing in databases?', a: 'Improves query performance by creating data structure for faster lookups' },
    { q: 'Explain what is JWT and its use case.', a: 'JSON Web Token for secure authentication and authorization' },
    { q: 'What is the difference between PUT and PATCH?', a: 'PUT replaces entire resource, PATCH updates partial resource' },
    { q: 'What is CORS and why is it needed?', a: 'Cross-Origin Resource Sharing for secure cross-domain requests' },
    { q: 'Explain database normalization.', a: 'Organizing data to reduce redundancy and improve integrity' },
    { q: 'What is the purpose of connection pooling?', a: 'Reuses database connections to improve performance' },
    { q: 'What are HTTP status codes 200, 404, and 500?', a: 'Success, Not Found, Internal Server Error' }
  ],
  'Frontend Developer': [
    { q: 'What is the Virtual DOM?', a: 'Lightweight copy of actual DOM for efficient updates' },
    { q: 'Explain the box model in CSS.', a: 'Content, padding, border, and margin layers' },
    { q: 'What is event bubbling?', a: 'Event propagates from target element up to parent elements' },
    { q: 'Difference between let, const, and var?', a: 'Block scope vs function scope, const is immutable' },
    { q: 'What is responsive design?', a: 'Design that adapts to different screen sizes' },
    { q: 'Explain CSS Flexbox.', a: 'Layout model for arranging items in rows or columns' },
    { q: 'What is the purpose of async/await?', a: 'Handles asynchronous operations with cleaner syntax' },
    { q: 'What are semantic HTML tags?', a: 'Tags that describe their meaning like header, nav, article' },
    { q: 'Explain localStorage vs sessionStorage.', a: 'localStorage persists, sessionStorage clears on tab close' },
    { q: 'What is AJAX?', a: 'Asynchronous JavaScript for updating page without reload' }
  ],
  'React JS': [
    { q: 'What are React Hooks?', a: 'Functions to use state and lifecycle in functional components' },
    { q: 'Explain useState hook.', a: 'Hook to add state to functional components' },
    { q: 'What is useEffect used for?', a: 'Side effects like data fetching and subscriptions' },
    { q: 'Difference between props and state?', a: 'Props are passed from parent, state is internal' },
    { q: 'What is JSX?', a: 'JavaScript XML syntax for writing HTML in React' },
    { q: 'Explain component lifecycle.', a: 'Mounting, updating, and unmounting phases' },
    { q: 'What is Redux?', a: 'State management library for predictable state container' },
    { q: 'What are controlled components?', a: 'Form elements controlled by React state' },
    { q: 'Explain React Router.', a: 'Library for navigation and routing in React apps' },
    { q: 'What is the purpose of keys in lists?', a: 'Helps React identify which items changed' }
  ],
  'Full Stack Developer': [
    { q: 'What is MERN stack?', a: 'MongoDB, Express, React, Node.js' },
    { q: 'Explain client-server architecture.', a: 'Client requests services from server' },
    { q: 'What is API endpoint?', a: 'URL where API can access resources' },
    { q: 'Difference between authentication and authorization?', a: 'Authentication verifies identity, authorization grants access' },
    { q: 'What is MVC pattern?', a: 'Model-View-Controller architectural pattern' },
    { q: 'Explain session management.', a: 'Tracking user state across requests' },
    { q: 'What is ORM?', a: 'Object-Relational Mapping for database operations' },
    { q: 'What are environment variables?', a: 'Configuration values stored outside code' },
    { q: 'Explain deployment process.', a: 'Building, testing, and releasing application to production' },
    { q: 'What is version control?', a: 'System for tracking code changes like Git' }
  ],
  'DevOps': [
    { q: 'What is Docker?', a: 'Platform for containerizing applications' },
    { q: 'Explain CI/CD pipeline.', a: 'Continuous Integration and Continuous Deployment automation' },
    { q: 'What is Kubernetes?', a: 'Container orchestration platform' },
    { q: 'What is Infrastructure as Code?', a: 'Managing infrastructure through code files' },
    { q: 'Explain microservices architecture.', a: 'Application built as independent services' },
    { q: 'What is load balancing?', a: 'Distributing traffic across multiple servers' },
    { q: 'What are containers?', a: 'Lightweight isolated environments for applications' },
    { q: 'Explain blue-green deployment.', a: 'Two identical environments for zero-downtime deployment' },
    { q: 'What is monitoring in DevOps?', a: 'Tracking application and infrastructure health' },
    { q: 'What is Jenkins?', a: 'Automation server for CI/CD pipelines' }
  ],
  'Data Science': [
    { q: 'What is machine learning?', a: 'Algorithms that learn from data without explicit programming' },
    { q: 'Explain supervised vs unsupervised learning.', a: 'Supervised uses labeled data, unsupervised finds patterns' },
    { q: 'What is a neural network?', a: 'Computing system inspired by biological neural networks' },
    { q: 'What is overfitting?', a: 'Model performs well on training but poor on new data' },
    { q: 'Explain data preprocessing.', a: 'Cleaning and transforming raw data for analysis' },
    { q: 'What is cross-validation?', a: 'Technique to assess model performance' },
    { q: 'What are features in ML?', a: 'Input variables used for predictions' },
    { q: 'Explain regression vs classification.', a: 'Regression predicts continuous, classification predicts categories' },
    { q: 'What is pandas library?', a: 'Python library for data manipulation and analysis' },
    { q: 'What is a confusion matrix?', a: 'Table showing prediction accuracy' }
  ],
  'Mobile Developer': [
    { q: 'What is React Native?', a: 'Framework for building mobile apps using React' },
    { q: 'Difference between native and hybrid apps?', a: 'Native is platform-specific, hybrid uses web technologies' },
    { q: 'What is Flutter?', a: 'UI toolkit for building natively compiled applications' },
    { q: 'Explain mobile app lifecycle.', a: 'States like active, background, suspended' },
    { q: 'What is responsive design in mobile?', a: 'Adapting UI to different screen sizes' },
    { q: 'What are push notifications?', a: 'Messages sent from server to mobile device' },
    { q: 'Explain AsyncStorage.', a: 'Key-value storage for React Native' },
    { q: 'What is APK?', a: 'Android Package Kit file format' },
    { q: 'What are mobile design patterns?', a: 'Common UI solutions like tab bars, navigation drawers' },
    { q: 'Explain app permissions.', a: 'User authorization for accessing device features' }
  ],
  'UI/UX Designer': [
    { q: 'What is user experience?', a: 'Overall experience of person using product' },
    { q: 'Explain wireframing.', a: 'Basic visual guide of page layout' },
    { q: 'What is a prototype?', a: 'Interactive mockup of final product' },
    { q: 'What is design thinking?', a: 'Problem-solving approach focused on user needs' },
    { q: 'Explain color theory.', a: 'Principles of mixing and combining colors' },
    { q: 'What is typography?', a: 'Art of arranging text for readability' },
    { q: 'What are design systems?', a: 'Collection of reusable components and guidelines' },
    { q: 'Explain user personas.', a: 'Fictional characters representing user types' },
    { q: 'What is A/B testing?', a: 'Comparing two versions to see which performs better' },
    { q: 'What is accessibility in design?', a: 'Making products usable for people with disabilities' }
  ],
  'Database Administrator': [
    { q: 'What is database backup?', a: 'Copy of data for recovery purposes' },
    { q: 'Explain ACID properties.', a: 'Atomicity, Consistency, Isolation, Durability' },
    { q: 'What is query optimization?', a: 'Improving query performance' },
    { q: 'What are stored procedures?', a: 'Precompiled SQL code stored in database' },
    { q: 'Explain database replication.', a: 'Copying data from one database to another' },
    { q: 'What is a primary key?', a: 'Unique identifier for database record' },
    { q: 'What are foreign keys?', a: 'Field linking two tables together' },
    { q: 'Explain database sharding.', a: 'Partitioning data across multiple databases' },
    { q: 'What is a transaction?', a: 'Sequence of operations performed as single unit' },
    { q: 'What is database migration?', a: 'Moving data between databases or versions' }
  ],
  'Cloud Engineer': [
    { q: 'What is cloud computing?', a: 'Delivery of computing services over internet' },
    { q: 'Explain IaaS, PaaS, SaaS.', a: 'Infrastructure, Platform, Software as Service' },
    { q: 'What is AWS EC2?', a: 'Elastic Compute Cloud for virtual servers' },
    { q: 'What is S3?', a: 'Simple Storage Service for object storage' },
    { q: 'Explain auto-scaling.', a: 'Automatically adjusting resources based on demand' },
    { q: 'What is serverless computing?', a: 'Running code without managing servers' },
    { q: 'What is VPC?', a: 'Virtual Private Cloud for isolated network' },
    { q: 'Explain CDN.', a: 'Content Delivery Network for faster content delivery' },
    { q: 'What is cloud security?', a: 'Protecting cloud-based systems and data' },
    { q: 'What are availability zones?', a: 'Isolated locations within cloud regions' }
  ]
};

const getQuestionsForSkills = (skills) => {
  const allQuestions = [];
  
  skills.forEach(skill => {
    if (QUESTIONS[skill]) {
      allQuestions.push(...QUESTIONS[skill]);
    }
  });
  
  if (allQuestions.length === 0) {
    allQuestions.push(...QUESTIONS['Full Stack Developer']);
  }
  
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 10);
};

module.exports = { getQuestionsForSkills, QUESTIONS };
