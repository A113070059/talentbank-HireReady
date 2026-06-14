export type UserRole = 'student' | 'employer' | 'university';

export interface SkillComparison {
  name: string;
  category: 'technical' | 'analytics' | 'business' | 'communication';
  type: 'critical' | 'required' | 'nice_to_have';
  foundInResume: boolean;
  marketDemand: number;
  status: 'Covered' | 'Missing';
  priority: 'High' | 'Medium' | 'Low' | 'Covered';
}

export interface TargetRole {
  id: string;
  title: string;
  company?: string;
  jobFamily: string;
  roleLevel: string;
  description: string;
  requiredSkills: string[];
  criticalSkills: string[];
  niceToHaveSkills: string[];
  responsibilities: string[];
  minimumExperienceMonths: string;
  educationRequirement: string;
  keywords?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  predictedShortlistProbability: number;
  skillMatchRatio: number;
  missingCriticalSkills: string[];
  resumeJdSimilarity: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  skillsFound: string[];
  resumeSummary: string;
  educationLevel: string;
  experienceMonths: number;
  certificationCount: number;
}

export interface SimulationScenario {
  scenario_type: 'add_skills' | 'add_certification' | 'add_experience' | 'improve_resume_alignment';
  added_skills: string[];
  added_certifications: string[];
  added_experience_months: number;
  resume_alignment_improvement: boolean;
}

export interface SimulationResult {
  current_shortlist_chance: number;
  new_shortlist_chance: number;
  improvement: number;
  changed_features: {
    skill_match_ratio?: [number, number];
    missing_critical_skill_count?: [number, number];
    critical_skill_coverage_ratio?: [number, number];
    market_demand_score?: [number, number];
    certification_count?: [number, number];
    experience_months?: [number, number];
    resume_jd_similarity?: [number, number];
    keyword_match_score?: [number, number];
  };
}

export interface Workshop {
  title: string;
  focus: string;
  targetSkill: string;
  duration: string;
  cohortNeedPct: number;
}

export interface CohortMeta {
  totalAnalyzed: number;
  avgHireReadyScore: number;
  avgShortlistChance: number;
  mostCommonMissingSkill: string;
}
