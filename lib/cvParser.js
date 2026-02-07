const pdf = require('pdf-parse');
const mammoth = require('mammoth');

const SKILL_KEYWORDS = {
  'Backend Developer': ['node', 'nodejs', 'node.js', 'express', 'expressjs', 'django', 'flask', 'fastapi', 'spring', 'springboot', 'spring boot', 'java', 'python', 'php', 'laravel', 'symfony', 'ruby', 'rails', 'ruby on rails', 'go', 'golang', 'c#', 'asp.net', '.net', 'dotnet', 'api', 'rest', 'restful', 'graphql', 'microservices', 'mongodb', 'mysql', 'postgresql', 'sql', 'database', 'server', 'backend', 'nest', 'nestjs', 'koa', 'hapi'],
  'Frontend Developer': ['react', 'reactjs', 'angular', 'angularjs', 'vue', 'vuejs', 'vue.js', 'html', 'html5', 'css', 'css3', 'javascript', 'js', 'typescript', 'ts', 'jquery', 'bootstrap', 'tailwind', 'tailwindcss', 'sass', 'scss', 'less', 'webpack', 'vite', 'parcel', 'rollup', 'frontend', 'front-end', 'ui', 'user interface', 'responsive', 'spa', 'pwa', 'material-ui', 'mui', 'chakra', 'styled-components', 'emotion'],
  'React JS': ['react', 'reactjs', 'redux', 'mobx', 'jsx', 'tsx', 'hooks', 'context', 'nextjs', 'next.js', 'gatsby', 'create-react-app', 'cra', 'react router', 'react native', 'component', 'props', 'state'],
  'Full Stack Developer': ['mern', 'mean', 'lamp', 'full stack', 'fullstack', 'full-stack', 'frontend', 'backend', 'end-to-end', 'web development', 'web developer', 'javascript', 'typescript', 'node', 'react', 'angular', 'vue', 'database'],
  'DevOps': ['docker', 'kubernetes', 'k8s', 'jenkins', 'ci/cd', 'continuous integration', 'continuous deployment', 'aws', 'amazon web services', 'azure', 'microsoft azure', 'gcp', 'google cloud', 'terraform', 'ansible', 'puppet', 'chef', 'vagrant', 'git', 'github', 'gitlab', 'bitbucket', 'linux', 'ubuntu', 'centos', 'nginx', 'apache', 'monitoring', 'prometheus', 'grafana', 'elk', 'elasticsearch', 'logstash', 'kibana'],
  'Data Science': ['python', 'r', 'pandas', 'numpy', 'scipy', 'matplotlib', 'seaborn', 'plotly', 'machine learning', 'ml', 'artificial intelligence', 'ai', 'deep learning', 'neural networks', 'tensorflow', 'keras', 'pytorch', 'scikit-learn', 'sklearn', 'data analysis', 'data mining', 'statistics', 'jupyter', 'anaconda', 'spark', 'hadoop', 'big data', 'sql', 'nosql', 'tableau', 'power bi', 'excel'],
  'Mobile Developer': ['android', 'ios', 'mobile', 'mobile development', 'react native', 'flutter', 'dart', 'swift', 'objective-c', 'kotlin', 'java', 'xamarin', 'cordova', 'phonegap', 'ionic', 'app development', 'mobile app', 'smartphone', 'tablet', 'cross-platform'],
  'UI/UX Designer': ['figma', 'sketch', 'adobe xd', 'xd', 'photoshop', 'illustrator', 'indesign', 'ui', 'ux', 'user interface', 'user experience', 'design', 'graphic design', 'web design', 'wireframe', 'prototype', 'mockup', 'usability', 'interaction design', 'visual design', 'typography', 'color theory', 'design thinking', 'user research', 'persona', 'journey map'],
  'Database Administrator': ['mysql', 'postgresql', 'postgres', 'mongodb', 'oracle', 'sql server', 'mssql', 'sqlite', 'redis', 'cassandra', 'dynamodb', 'database', 'dba', 'sql', 'nosql', 'query optimization', 'indexing', 'backup', 'recovery', 'replication', 'sharding', 'acid', 'transaction'],
  'Cloud Engineer': ['aws', 'amazon web services', 'azure', 'microsoft azure', 'gcp', 'google cloud platform', 'cloud', 'cloud computing', 'lambda', 'serverless', 's3', 'ec2', 'rds', 'vpc', 'iam', 'cloudformation', 'arm templates', 'cloud functions', 'app engine', 'compute engine', 'kubernetes', 'docker', 'containerization'],
  'Quality Assurance': ['qa', 'qc', 'testing', 'test automation', 'selenium', 'cypress', 'jest', 'mocha', 'junit', 'testng', 'cucumber', 'postman', 'api testing', 'manual testing', 'automated testing', 'regression testing', 'performance testing', 'load testing', 'unit testing', 'integration testing', 'bug tracking', 'jira'],
  'Project Manager': ['project management', 'scrum', 'agile', 'kanban', 'waterfall', 'pmp', 'prince2', 'jira', 'confluence', 'trello', 'asana', 'monday', 'stakeholder management', 'risk management', 'budget management', 'timeline', 'milestone', 'deliverable', 'sprint', 'backlog'],
  'Business Analyst': ['business analysis', 'requirements gathering', 'stakeholder management', 'process improvement', 'workflow', 'documentation', 'use cases', 'user stories', 'gap analysis', 'feasibility study', 'roi', 'kpi', 'metrics', 'reporting', 'excel', 'sql', 'tableau', 'power bi'],
  'Cybersecurity': ['cybersecurity', 'information security', 'network security', 'penetration testing', 'ethical hacking', 'vulnerability assessment', 'firewall', 'ids', 'ips', 'siem', 'encryption', 'ssl', 'tls', 'vpn', 'compliance', 'gdpr', 'iso 27001', 'nist', 'cissp', 'ceh', 'oscp'],
  'Network Engineer': ['networking', 'cisco', 'juniper', 'router', 'switch', 'firewall', 'vpn', 'lan', 'wan', 'tcp/ip', 'dns', 'dhcp', 'vlan', 'bgp', 'ospf', 'mpls', 'ccna', 'ccnp', 'ccie', 'network troubleshooting', 'wireshark'],
  'System Administrator': ['system administration', 'linux', 'windows server', 'active directory', 'powershell', 'bash', 'shell scripting', 'virtualization', 'vmware', 'hyper-v', 'backup', 'monitoring', 'troubleshooting', 'server management', 'patch management', 'user management']
};

const extractTextFromPDF = async (buffer) => {
  const data = await pdf(buffer);
  return data.text;
};

const extractTextFromDOCX = async (buffer) => {
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
};

const extractSkills = (text) => {
  const lowerText = text.toLowerCase();
  const foundFields = [];
  
  console.log('CV Text (first 500 chars):', lowerText.substring(0, 500));
  
  for (const [field, keywords] of Object.entries(SKILL_KEYWORDS)) {
    const matchedKeywords = keywords.filter(keyword => {
      const regex = new RegExp(`\\b${keyword.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      return regex.test(lowerText);
    });
    
    if (matchedKeywords.length > 0) {
      console.log(`Found field: ${field}, matched keywords:`, matchedKeywords);
      foundFields.push(field);
    }
  }
  
  console.log('Final extracted fields:', foundFields);
  return [...new Set(foundFields)].slice(0, 10);
};

const extractName = (text) => {
  const lines = text.split('\n').filter(l => l.trim());
  return lines[0]?.trim() || '';
};

module.exports = {
  parseCV: async (buffer, filename) => {
    try {
      let text = '';
      
      if (filename.toLowerCase().endsWith('.pdf')) {
        text = await extractTextFromPDF(buffer);
      } else if (filename.toLowerCase().endsWith('.docx')) {
        text = await extractTextFromDOCX(buffer);
      } else {
        throw new Error('Unsupported file format. Please upload PDF or DOCX');
      }
      
      return {
        extractedName: extractName(text),
        skills: extractSkills(text),
        fullText: text
      };
    } catch (error) {
      console.error('CV Parse Error:', error);
      throw error;
    }
  }
};
