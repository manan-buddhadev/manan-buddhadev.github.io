export const profile = {
  name: 'Manan Buddhadev',
  title: 'Software Development Engineer',
  location: 'San Jose, CA',
  email: 'mananbuddhadev8@gmail.com',
  linkedin: 'linkedin.com/in/mananbuddhadev',
  linkedinUrl: 'https://www.linkedin.com/in/mananbuddhadev/',
  github: 'github.com/MananBuddhadev',
  githubUrl: 'https://github.com/MananBuddhadev',
  scholar: 'Google Scholar',
  scholarUrl: 'https://scholar.google.com/citations?user=2xa5wrIAAAAJ&hl=en&authuser=1',
  summary: 'I build the infrastructure that keeps large systems honest — data platforms that govern what gets stored, what gets tracked, and what gets acted on at scale. At AWS I lead the platform bridging hardware design and manufacturing for datacenters. Before that at Microsoft I built Datapedia, a centralized data catalog that evolved into Azure Purview. I also review research for IEEE, ACM, and Springer, and occasionally publish my own.',
  badge: 'IEEE Senior Member',
}

export const experience = [
  {
    company: 'Amazon Web Services (AWS)',
    role: 'Software Development Engineer 2',
    period: 'Jan 2023 — Present',
    location: 'San Jose, CA',
    highlight: '$40M+ in combined cost savings across BOM platform migration and datacenter tracking',
    projects: [
      {
        name: 'BOM Ingestion Data Platform',
        year: '2024 · 90%+ adoption by AWS partners',
        bullets: [
          'Transitioned the inventory system across the AWS datacenter fleet, improving efficiency, data accessibility, and saving $20M+ in licensing fees.',
          'Engineered a data platform to ingest and validate Bill of Materials (BOM) for AWS racks, ensuring data accuracy and integrity across all components.',
        ],
      },
    ],
    stack: 'Java · Redshift · DynamoDB · AWS Lambda · S3 · Athena · Oracle PLM',
    bullets: [
      'Leading a cross-functional team to bridge the gap between design and manufacturing, ensuring Bill of Materials (BOM) perfectly match design specs',
      'Singlehandedly migrated BOM ingestion from a third-party tool to a complete AWS-owned data platform, saving the company ~$20M',
      'Implemented a mechanism to identify savings in mechanical components used in datacenters, leading to savings upwards of $20M',
      'Architected and implemented API enhancements, expanding data collection and enabling near real-time supply chain risk identification',
      'Worked with multiple AWS Partners to ensure smooth onboarding to ingestion tools and APIs',
      'Guided junior engineers on design principles, code review techniques, and professional development',
      'Mentored an intern on design thinking, coding best practices, and project management',
    ],
  },
  {
    company: 'Microsoft',
    role: 'Software Engineer 2',
    period: 'Jan 2019 — Jan 2023',
    location: 'Redmond, WA',
    highlight: '$5B in avoided GDPR fines · $30M annual savings · 1 Exabyte data platform · 85% manual effort reduction',
    projects: [
      {
        name: 'Data Cataloging and Privacy Asset Platform',
        year: '2022 · Adopted into Azure Purview',
        bullets: [
          "Developed a platform that automated data discovery and governance workflows, significantly reducing time to access and ensuring compliance for Microsoft's data assets.",
          'Led a company-wide data optimization effort that identified and archived unused data, achieving approximately $30M in annual savings for data compute and storage.',
        ],
      },
      {
        name: 'Cloud PC Virtual Machine System',
        year: '2019–2020 · £3 billion revenue generation, building block for $49 billion Windows 365',
        bullets: [
          'Pioneered a first-of-its-kind managed device solution that eliminated the need for on-premises IT support, streamlining operations and reducing infrastructure costs.',
          'Built a self-service data platform that enabled users to generate quick insights and seamlessly integrate with PowerBI, empowering data-driven decision-making.',
        ],
      },
    ],
    stack: 'C# · SQL · T-SQL · Azure · Python · Scala · Spark · Cosmos DB · Azure DevOps · React · Node.js',
    bullets: [
      'Led cross-functional effort across Azure to optimize data storage and processing, saving $30M annually',
      'Architected a centralized data catalog across Azure, simplifying data discovery and governance for multiple teams',
      'Migrated the team\'s big data platform to Apache Spark for improved compliance with regulatory requirements, saving ~$5B in potential fines',
      'Built a data platform monitoring over 1 Exabyte of data, enabling better data accuracy and quality using alarming',
      'Collaborated on open-source project SyncKusto, enabling users to synchronize Kusto entities from local devices to Azure',
      'Championed GDPR compliance by implementing data hashing and encryption for all datasets containing PII',
      'Reduced manual effort by 85% by designing a console application that analyzes data computation usage and identifies cost-saving opportunities',
      'Developed an anomaly detection system to identify failing data pipelines and trigger timely alerts, preventing data loss',
      'Created an NLP model to analyze customer tickets and identify trends correlated with service incidents',
      'Mentored interns and new recruits on system design, code quality, and building scalable solutions',
    ],
  },
  {
    company: 'SAP',
    role: 'Software Developer — Conversational AI',
    period: 'Oct 2018 — Jan 2019',
    location: 'Palo Alto, CA',
    highlight: '20% improvement in chatbot interaction accuracy',
    projects: [
      {
        name: 'Log Visualization Platform for Chatbot Conversations',
        year: '2018 · $1bn revenue, used by 82 companies',
        bullets: [
          'Architected a log visualization tool to streamline log analysis, resulting in a significant improvement in inference accuracy.',
          "Optimized the bot's utterance recognition engine, resulting in a 20% increase in communication accuracy.",
        ],
      },
    ],
    stack: 'Java · Python · Flask · HANA/S4 · NLP · Git',
    bullets: [
      'Developed a log visualization tool, enabling efficient analysis and leading to improved interpretation of chatbot interactions by 20%',
      'Enhanced bot utterance recognition, significantly reducing false positives and boosting communication accuracy',
    ],
  },
  {
    company: 'Amazon',
    role: 'Software Development Engineer Intern',
    period: 'Aug 2017 — Dec 2017',
    location: 'Seattle, WA',
    highlight: '30% team efficiency improvement via ML-driven automation',
    stack: 'Java · DynamoDB · AWS · Git',
    bullets: [
      'Architected, developed, and tested a novel trouble ticket analysis bot, empowering automation and reducing operational workload',
      'Implemented pattern matching and machine learning techniques, automating data extraction and boosting team efficiency by 30%',
      'Drove the project from conception to production, showcasing ownership and technical expertise in system design',
    ],
  },
  {
    company: 'Conduent',
    role: 'Process Automation and Optimization Scientist Intern',
    period: 'May 2017 — Aug 2017',
    location: 'Webster, NY',
    stack: 'R · SQL Server · R Shiny Server',
    bullets: [
      'Normalized, cleaned, and documented complex data (50+ attributes), fueling reliable models and insights',
      'Designed and implemented an algorithm leveraging operator activity data to accurately measure productivity',
    ],
  },
  {
    company: 'Ravi Group of Companies',
    role: 'Software Developer',
    period: 'June 2014 — June 2015',
    location: 'Rochester, NY',
    stack: 'C# · .NET Framework · SQL Server · MS Access · ERP',
    bullets: [
      'Successfully transitioned the inventory system, improving operational efficiency and data accessibility for stakeholders',
      'Architected and built a custom CRM tool, optimizing sales processes for increased lead generation and conversion success',
    ],
  },
]

export const skills = {
  'Languages': ['Java', 'Python', 'C#', 'R', 'Scala'],
  'Databases': ['SQL', 'Azure Data Explorer (Kusto)', 'DynamoDB', 'MySQL', 'Apache Spark'],
  'Data Science': ['Pandas', 'NumPy', 'Scikit-learn', 'NLTK', 'Keras', 'TensorFlow'],
  'Visualization': ['Python (Plotly)', 'PowerBI', 'ggplot2'],
  'Cloud': ['AWS', 'Microsoft Azure'],
}

export const education = [
  {
    school: 'Rochester Institute of Technology',
    degree: 'M.S. in Computer Science',
    year: 'Aug 2018',
  },
  {
    school: 'University of Mumbai',
    degree: 'B.E. in Information Technology',
    year: 'May 2014',
  },
]

export const publications = [
  {
    title: 'Cost Optimization for Data Engineering and API Workloads',
    venue: 'Medium',
    url: 'https://medium.com/@mananbuddhadev/cost-optimization-for-data-engineering-and-api-workloads-smart-fixes-that-dont-hurt-performance-d80170e9eb4e',
  },
  {
    title: 'Quantifying the Costs of Data Breaches',
    venue: 'IFIP AICT, ICCIP 2019 (Springer)',
    url: 'https://inria.hal.science/hal-03364563/document',
  },
]

export const COMMANDS = [
  { cmd: 'whoami',       label: 'whoami',       desc: 'about me'     },
  { cmd: 'highlights',   label: 'highlights',   desc: 'key projects' },
  { cmd: 'experience',   label: 'experience',   desc: 'work history' },
  { cmd: 'publications', label: 'publications', desc: 'writing'      },
  { cmd: 'skills',       label: 'skills',       desc: 'tech stack'   },
  { cmd: 'education',    label: 'education',    desc: 'degrees'      },
  { cmd: 'contact',      label: 'contact',      desc: 'reach me'     },
]

export const FILE_COMMANDS = [
  { cmd: 'viewpdf',  label: 'viewpdf',  desc: 'open resume PDF'     },
  { cmd: 'download', label: 'download', desc: 'save resume PDF'      },
]

export const BOOT_LINES = [
  'Initializing terminal...',
  'Loading profile: manan-buddhadev...',
  'Connecting to session...',
  "Type 'help' to see available commands.",
  '',
]
