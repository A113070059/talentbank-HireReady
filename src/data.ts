import { TargetRole, SkillComparison, Candidate, Workshop, CohortMeta } from './types';

export const TARGET_ROLES: TargetRole[] = [
  {
    id: 'data-analyst',
    title: 'Junior Data Analyst',
    company: 'TalentBank Demo Employer',
    jobFamily: 'Data & Analytics',
    roleLevel: 'Entry Level',
    description: 'Transform raw data into meaningful business insights. Design dashboards, write data queries, and deliver regular analytics reports to cross-functional teams.',
    requiredSkills: ['SQL', 'Python', 'Excel', 'Power BI', 'Data Cleaning', 'Business Reporting'],
    criticalSkills: ['SQL', 'Data Cleaning', 'Power BI'],
    niceToHaveSkills: ['Tableau', 'A/B Testing', 'Basic Statistics'],
    responsibilities: [
      'Clean and prepare business datasets',
      'Build dashboards and weekly reports',
      'Analyze sales and customer trends',
      'Present insights to business stakeholders',
      'Support business teams with data-driven reporting'
    ],
    minimumExperienceMonths: '0–12 months',
    educationRequirement: 'Bachelor’s Degree or equivalent'
  },
  {
    id: 'swe-intern',
    title: 'Software Engineer Intern',
    company: 'Global Tech Systems',
    jobFamily: 'Engineering',
    roleLevel: 'Internship',
    description: 'Build robust scalable frontend and backend code blocks. Work with senior engineers inside modern stack development workflows.',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Git', 'REST APIs', 'Data Structures', 'Unit Testing', 'Docker', 'System Integration'],
    criticalSkills: ['React', 'TypeScript', 'Git'],
    niceToHaveSkills: ['Next.js', 'Redis', 'Kubernetes'],
    responsibilities: [
      'Implement modular, responsive layouts in TypeScript CSS framework.',
      'Write backend controller logics in Express or Node framework.',
      'Construct automated test coverage across REST API nodes.',
      'Integrate codebase features inside Git-led parallel branches.'
    ],
    minimumExperienceMonths: '0–6 months',
    educationRequirement: 'Bachelor’s Degree or equivalent'
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer Intern',
    company: 'Nexus Intelligence',
    jobFamily: 'Engineering (AI)',
    roleLevel: 'Internship',
    description: 'Deploy predictive models and prompt frameworks. Build workflows with Large Language Models and automate information retrievals.',
    requiredSkills: ['Python', 'PyTorch', 'Gemini API', 'Vector Databases', 'Prompt Engineering', 'LangChain', 'Data Engineering', 'Git', 'Docker', 'Machine Learning'],
    criticalSkills: ['Python', 'Gemini API', 'Machine Learning'],
    niceToHaveSkills: ['TensorFlow', 'LLaMA Tuning', 'GPU cluster setup'],
    responsibilities: [
      'Build backend LLM agents linking memory files and search vectors.',
      'Fine-tune prompt pipelines to extract reliable JSON nodes from raw pdf files.',
      'Coordinate training setups for specific regression forecasting runs.',
      'Dockerize running data engines for local and server environments.'
    ],
    minimumExperienceMonths: '0–6 months',
    educationRequirement: 'Bachelor’s Degree or equivalent'
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    company: 'Enterprise Partners',
    jobFamily: 'Product & Consulting',
    roleLevel: 'Entry Level',
    description: 'Bridge business requirements and technical product releases. Map customer operational pipelines and draft system documentation.',
    requiredSkills: ['Agile Jira', 'SQL', 'Process Mapping', 'Excel Modeling', 'Requirement Gathering', 'User Story Drafting', 'Market Research', 'Tableau', 'Presentation', 'Financial Modeling'],
    criticalSkills: ['Agile Jira', 'Requirement Gathering', 'Excel Modeling'],
    niceToHaveSkills: ['Confluence', 'SCRUM certification', 'Visio'],
    responsibilities: [
      'Facilitate requirement discovery rounds across client groups.',
      'Design detailed AS-IS and TO-BE swimlane flowchart diagrams.',
      'Draft formal user stories matching epic criteria in project boards.',
      'Track monthly deployment burnup and quality metrics.'
    ],
    minimumExperienceMonths: '0–12 months',
    educationRequirement: 'Bachelor’s Degree or equivalent'
  },
  {
    id: 'product-analyst',
    title: 'Product Analyst',
    company: 'SaaS Growth Group',
    jobFamily: 'Product Management',
    roleLevel: 'Entry Level',
    description: 'Unpack user engagement loops and product feature adoptions. Calculate retention cohorts and evaluate design changes with data.',
    requiredSkills: ['SQL', 'Product Metrics', 'Google Analytics', 'A/B Testing', 'Amplitude', 'Python', 'User Centered Theory', 'Data Visualization', 'Cohort Analysis', 'User Funnels'],
    criticalSkills: ['SQL', 'Product Metrics', 'A/B Testing'],
    niceToHaveSkills: ['Mixpanel', 'SQL subqueries', 'UX principles'],
    responsibilities: [
      'Model retention grids to capture custom feature click-through trends.',
      'Deploy and monitor specific A/B trial branches to judge design variants.',
      'Audit navigation heatmaps to flag high-churn checkout phases.',
      'Deliver actionable insights to direct next-quarter sprint layouts.'
    ],
    minimumExperienceMonths: '0–12 months',
    educationRequirement: 'Bachelor’s Degree or equivalent'
  }
];

export const INITIAL_SKILLS: SkillComparison[] = [
  { name: 'SQL', category: 'technical', type: 'critical', foundInResume: false, marketDemand: 82, status: 'Missing', priority: 'High' },
  { name: 'Data Cleaning', category: 'analytics', type: 'critical', foundInResume: false, marketDemand: 55, status: 'Missing', priority: 'High' },
  { name: 'Power BI', category: 'technical', type: 'critical', foundInResume: true, marketDemand: 61, status: 'Covered', priority: 'Covered' },
  { name: 'Python', category: 'technical', type: 'required', foundInResume: true, marketDemand: 58, status: 'Covered', priority: 'Covered' },
  { name: 'Excel', category: 'technical', type: 'required', foundInResume: true, marketDemand: 52, status: 'Covered', priority: 'Covered' },
  { name: 'Business Reporting', category: 'communication', type: 'required', foundInResume: false, marketDemand: 49, status: 'Missing', priority: 'Medium' }
];

export const SAMPLE_STUDENT_PROFILE = {
  detectedSkills: ['Python', 'Excel', 'Power BI'],
  educationLevel: "Bachelor’s Degree",
  experienceMonths: 6,
  certificationCount: 1,
  resumeSummary: "Candidate has basic analytics experience with Python, Excel, and Power BI. Resume shows moderate alignment with data analyst tasks but does not mention SQL or data cleaning."
};

export const SAMPLE_RESUME_TEXT = `JOHN DOE
john.doe@email.university.edu | (555) 019-2834 | New York, NY
LinkedIn: linkedin.com/in/johndoedraft

OBJECTIVE
Passionate aspiring data professional seeking an entry level Junior Data Analyst role. Interested in turning transactional databases into reports to assist corporate decision-makers.

EDUCATION
State University — B.S. in Information Systems & Business Analytics
GPA: 3.4 / 4.0 | Expected Graduation: Spring 2026

TECHNICAL PROJECTS
Academic GPA Analyst Script (Python, Pandas)
- Programmed custom local scripts utilizing pandas to strip formatting errors from grade output lists.
- Sorted grades into structured buckets and exported values directly into Excel xlsx files.
- Ran tests checking average calculation speed.

Retail Transactions Analysis Run (Python, Matplotlib)
- Downloaded public sales dataset containing 10,000 transaction columns.
- Replaced missing values using statistical mean fillups and documented deviation patterns.
- Created scatterplots of monthly transaction timelines.

EXPERIENCE
IT Service Desk Assistant | University Tech Services (2024 - Present)
- Answered over 20 support calls daily from students seeking password assistance.
- Documented system issues in ticketing interfaces and categorized hardware vs network items.

VOLUNTEER & MEMBERSHIPS
- University Analytics Association General Member (2023 - Present)
- State Chess Club Secretary
`;

export const COHORT_STATS: CohortMeta = {
  totalAnalyzed: 248,
  avgShortlistChance: 42,
  avgHireReadyScore: 42, // mapped to shortlist chance or score
  mostCommonMissingSkill: 'SQL'
};

export const COHORT_ROLE_READINESS = [
  { role: 'Junior Data Analyst', count: 52, avgScore: 45, avgChance: '38%', topGap: 'SQL, Data Cleaning', recommendedWorkshop: 'SQL + Data Cleaning Sprint' },
  { role: 'Software Engineer Intern', count: 58, avgScore: 49, avgChance: '42%', topGap: 'Git, Testing', recommendedWorkshop: 'API + Testing Workshop' },
  { role: 'AI Engineer Intern', count: 46, avgScore: 36, avgChance: '30%', topGap: 'Model Deployment', recommendedWorkshop: 'ML Deployment Bootcamp' }
];

export const COHORT_GAP_LEVELS = [
  { skill: 'SQL', gapPct: 78, category: 'Technical' },
  { skill: 'Data Cleaning', gapPct: 65, category: 'Analytics' },
  { skill: 'Business Reporting', gapPct: 58, category: 'Communication' },
  { skill: 'Git', gapPct: 45, category: 'Technical' },
  { skill: 'Testing', gapPct: 38, category: 'Technical' },
  { skill: 'Model Deployment', gapPct: 32, category: 'Analytics' }
];

export const CRITICAL_GAP_HEATMAP = [
  { program: 'Data Science', SQL: 'High', DataCleaning: 'Medium', PowerBI: 'Low', BusinessReporting: 'High' },
  { program: 'Business Analytics', SQL: 'High', DataCleaning: 'High', PowerBI: 'Medium', BusinessReporting: 'Medium' },
  { program: 'Computer Science', SQL: 'Medium', DataCleaning: 'Medium', PowerBI: 'High', BusinessReporting: 'High' }
];

export const WORKSHOPS: Workshop[] = [
  { title: 'SQL Foundations Sprint', focus: 'Database querying, SQL syntax, joins, aggregate functions', targetSkill: 'SQL', duration: '3 Days Intensive', cohortNeedPct: 78 },
  { title: 'Data Cleaning Workshop', focus: 'Handling duplicates, stripping trailing errors, formatting datasets', targetSkill: 'Data Cleaning', duration: '1 Day Bootcamp', cohortNeedPct: 65 },
  { title: 'Resume-JD Alignment Clinic', focus: 'Tailoring bullet points, STAR context framing, alignment strategies', targetSkill: 'Resume Formatting', duration: '3 Hours Sprint', cohortNeedPct: 58 },
  { title: 'Business Reporting Bootcamp', focus: 'Presentation storytelling, executive dashboard delivery, metrics framing', targetSkill: 'Business Reporting', duration: '2 Days Online', cohortNeedPct: 49 }
];

export const EMPLOYER_CANDIDATES: Candidate[] = [
  {
    id: 'cand-1',
    name: 'Sarah Jenkins',
    predictedShortlistProbability: 82,
    skillMatchRatio: 83,
    missingCriticalSkills: [],
    resumeJdSimilarity: 76,
    riskLevel: 'Low',
    skillsFound: ['Python', 'Excel', 'Power BI', 'Data Cleaning', 'Business Reporting'],
    resumeSummary: 'Systems Engineering graduate with outstanding projects. High alignment across SQL database models and automated business reports.',
    educationLevel: 'Bachelor’s Degree',
    experienceMonths: 12,
    certificationCount: 2
  },
  {
    id: 'cand-2',
    name: 'Alex Rivera',
    predictedShortlistProbability: 61,
    skillMatchRatio: 50,
    missingCriticalSkills: ['SQL'],
    resumeJdSimilarity: 58,
    riskLevel: 'Medium',
    skillsFound: ['Python', 'Excel', 'Power BI', 'Data Cleaning'],
    resumeSummary: 'Candidate B has a moderate match because they cover several required tools, but they are missing SQL, which is marked as critical for this role.',
    educationLevel: 'Bachelor’s Degree',
    experienceMonths: 6,
    certificationCount: 1
  },
  {
    id: 'cand-3',
    name: 'John Doe',
    predictedShortlistProbability: 44,
    skillMatchRatio: 33,
    missingCriticalSkills: ['SQL', 'Data Cleaning'],
    resumeJdSimilarity: 41,
    riskLevel: 'High',
    skillsFound: ['Python', 'Excel', 'Power BI'],
    resumeSummary: 'Candidate has basic analytics experience with Python, Excel, and Power BI. Resume shows moderate alignment with data analyst tasks but does not mention SQL or data cleaning.',
    educationLevel: 'Bachelor’s Degree',
    experienceMonths: 6,
    certificationCount: 1
  }
];

export const ML_MODELS = [
  { name: 'Logistic Regression', accuracy: 0.79, rocAuc: 0.81, deploymentType: 'High Interpretability baseline', inferenceSpeed: '< 2ms' },
  { name: 'Random Forest Classifier', accuracy: 0.85, rocAuc: 0.88, deploymentType: 'Decision-tree ensemble (used for feature ranking)', inferenceSpeed: '< 5ms' },
  { name: 'XGBoost (Selected MVP Model)', accuracy: 0.89, rocAuc: 0.93, deploymentType: 'Gradient-boosted machine (powers score prediction)', inferenceSpeed: '< 4ms' }
];

export const ML_FEATURES = [
  { feature: 'Skill Match Ratio', importance: 0.28, description: 'Overall overlap percentage between resume detected skills and employer job requirements.' },
  { feature: 'Missing Critical Skill Count', importance: 0.32, description: 'Direct negative penalty of missing essential tools flagged by employers.' },
  { feature: 'Critical Skill Coverage Ratio', importance: 0.18, description: 'Percentage of critical-classified tools successfully covered in resume.' },
  { feature: 'Resume-JD Similarity', importance: 0.10, description: 'Vector similarity scoring generated by advanced text processing.' },
  { feature: 'Keyword Match Score', importance: 0.05, description: 'Direct exact-word counts mapped against defined requirements.' },
  { feature: 'Market Demand Score', importance: 0.04, description: 'Regional demand weight adjustments calculated by real-time postings.' },
  { feature: 'Experience Months', importance: 0.02, description: 'Verified resume duration duration mapped against role requirements.' },
  { feature: 'Certification Count', importance: 0.01, description: 'Complementary credentials validating domain expertise.' }
];
