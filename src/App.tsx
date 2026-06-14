import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  School, 
  Users, 
  ChevronRight, 
  TrendingUp, 
  Upload, 
  ShieldAlert, 
  CheckCircle2, 
  Sliders, 
  Sparkles,
  RefreshCw, 
  Play, 
  ArrowRight,
  Info,
  Search
} from 'lucide-react';

import StudentOverview from './components/StudentOverview';
import UniversityPortal from './components/UniversityPortal';
import EmployerPortal from './components/EmployerPortal';
import MLExplainability from './components/MLExplainability';

import { TARGET_ROLES, SAMPLE_RESUME_TEXT } from './data';
import AuthPage from './components/AuthPage';

export default function App() {
  // Navigation Router: auth | landing | upload | select_job | processing | student_dashboard | university | employer | ml
  const [currentScreen, setCurrentScreen] = useState<string>('auth');
  
  // User Authentication State
  const [currentUser, setCurrentUser] = useState<{ email: string; role: 'student' | 'employer' | 'university' } | null>(null);

  // Dynamic job roles list
  const [jobRoles, setJobRoles] = useState<any[]>(TARGET_ROLES);
  const [jobSearchQuery, setJobSearchQuery] = useState('');

  // Student Inner navigation: overview | gap | simulator
  const [studentActiveTab, setStudentActiveTab] = useState<'overview' | 'gap' | 'simulator'>('overview');

  // Input states
  const [resumeText, setResumeText] = useState('');
  const [educationLevel, setEducationLevel] = useState('B.S.');
  const [major, setMajor] = useState('');
  const [expYears, setExpYears] = useState('0-1');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [isSampleLoaded, setIsSampleLoaded] = useState(false);

  // Selected Target role
  const [selectedRoleId, setSelectedRoleId] = useState('data-analyst');
  const [customJD, setCustomJD] = useState('');

  // Processing Page Progress Status Steps
  const [processingStep, setProcessingStep] = useState(0);

  // Consolidated simulation state
  const [isSimulated, setIsSimulated] = useState(false);

  // Autofill John Doe draft resume profile
  const handleAutofillJohnDoe = () => {
    setResumeText(SAMPLE_RESUME_TEXT);
    setEducationLevel('B.S.');
    setMajor('Information Systems & Business Analytics');
    setExpYears('0-1');
    setPortfolioLink('');
    setGithubLink('https://github.com/johndoe-draft');
    setIsSampleLoaded(true);
  };

  const handleCreateJobRole = (newJob: any) => {
    setJobRoles(prev => [newJob, ...prev]);
  };

  const handleCreateDynamicRole = (title: string) => {
    const formattedTitle = title.trim();
    if (!formattedTitle) return;
    
    const id = `dynamic-${Date.now()}`;
    
    // Detect skills based on keywords in title or fall back to sensible web dev suite
    let skills = ['TypeScript', 'React', 'Node.js', 'SQL', 'Git', 'Agile'];
    let critical = ['TypeScript', 'SQL'];
    let desc = `Perform analytical diagnostics and construct robust modern interfaces & pipelines mapping to ${formattedTitle} needs.`;
    let resps = [
      `Deploy modular configurations aligned with custom ${formattedTitle} specifications.`,
      'Deconstruct explicit data streams and model tool logic elements.',
      'Coordinate technical releases inside Git-led version branches.'
    ];
    
    const lowerStr = formattedTitle.toLowerCase();
    if (lowerStr.includes('devops') || lowerStr.includes('cloud') || lowerStr.includes('sre') || lowerStr.includes('infrastructure')) {
      skills = ['Docker', 'Kubernetes', 'AWS', 'Linux', 'Terraform', 'CI/CD', 'Git', 'Shell Scripting'];
      critical = ['Docker', 'AWS', 'CI/CD'];
      desc = `Orchestrate high-availability, containerized systems and automate deployment workflows.`;
      resps = [
        'Deploy and troubleshoot scalable Kubernetes container nodes.',
        'Optimize cloud provisioning metrics under high-throughput conditions.',
        'Deconstruct and wire server builds into CI/CD build channels.'
      ];
    } else if (lowerStr.includes('python') || lowerStr.includes('science') || lowerStr.includes('ml') || lowerStr.includes('ai') || lowerStr.includes('learning')) {
      skills = ['Python', 'SQL', 'pandas', 'scikit-learn', 'PyTorch', 'Data Pipelines', 'Git', 'Machine Learning'];
      critical = ['Python', 'SQL', 'Machine Learning'];
      desc = `Model large scale raw records, train statistical predictors, and expose smart feature nodes.`;
      resps = [
        'Coordinate automated ingestion pipelines over unstructured database tables.',
        'Train, audit, and output regression and classification models.',
        'Translate high-level project goals into explicit model features.'
      ];
    } else if (lowerStr.includes('frontend') || lowerStr.includes('ui') || lowerStr.includes('ux') || lowerStr.includes('design') || lowerStr.includes('web')) {
      skills = ['React', 'TypeScript', 'Tailwind CSS', 'Figma', 'HTML', 'CSS', 'Git', 'State Management'];
      critical = ['React', 'TypeScript', 'Tailwind CSS'];
      desc = `Translate digital layouts into type-safe interactive screens with high-performance responsive styling.`;
      resps = [
        'Craft scalable design elements with styled negative space.',
        'Manage nested application views via modular component controllers.',
        'Optimize touch boundaries and viewport rendering speeds.'
      ];
    } else if (lowerStr.includes('backend') || lowerStr.includes('api') || lowerStr.includes('engineer') || lowerStr.includes('developer')) {
      skills = ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'SQL', 'Docker', 'Git', 'Redis'];
      critical = ['Node.js', 'PostgreSQL', 'REST APIs'];
      desc = `Establish relational schemas, secure controller layers, and serve normalized information models.`;
      resps = [
        'Code and secure dynamic backend routes backed by relational tables.',
        'Expose system payloads via modular REST endpoints.',
        'Optimize multi-table SQL query strategies inside transaction wrappers.'
      ];
    }

    const newJob = {
      id,
      title: formattedTitle,
      company: 'TalentBank Demo Employer',
      jobFamily: 'Custom Operations',
      roleLevel: 'Entry Level',
      description: desc,
      requiredSkills: skills,
      criticalSkills: critical,
      niceToHaveSkills: [skills[0] || 'SQL'],
      responsibilities: resps,
      minimumExperienceMonths: '0–12 months',
      educationRequirement: 'Bachelor’s Degree or equivalent'
    };

    setJobRoles(prev => [newJob, ...prev]);
    setSelectedRoleId(id);
    setJobSearchQuery('');
  };

  // Processing simulation timing
  useEffect(() => {
    if (currentScreen === 'processing') {
      setProcessingStep(0);
      const timer0 = setTimeout(() => setProcessingStep(1), 400);
      const timer1 = setTimeout(() => setProcessingStep(2), 800);
      const timer2 = setTimeout(() => setProcessingStep(3), 1200);
      const timer3 = setTimeout(() => setProcessingStep(4), 1600);
      const timer4 = setTimeout(() => setCurrentScreen('student_dashboard'), 2100);

      return () => {
        clearTimeout(timer0);
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [currentScreen]);

  // Reset core states to rerun fresh tests
  const handleResetDemoState = () => {
    setResumeText('');
    setMajor('');
    setPortfolioLink('');
    setGithubLink('');
    setIsSampleLoaded(false);
    setSelectedRoleId('data-analyst');
    setIsSimulated(false);
    setCurrentScreen('landing');
    setStudentActiveTab('overview');
  };

  // CALCULATE LIVE DYNAMIC METRICS FOR JOHN DOE
  const shortlistChance = isSimulated ? 52 : 38;
  const skillMatchRatio = isSimulated ? 67 : 40;
  const hireReadyScore = isSimulated ? 78 : 35;

  const activeRole = jobRoles.find(r => r.id === selectedRoleId) || jobRoles[0];

  // Check if current screen is restricted for the current user's role
  const getDesignatedRoleForScreen = (screen: string): 'student' | 'employer' | 'university' | null => {
    if (['upload', 'select_job', 'processing', 'student_dashboard'].includes(screen)) return 'student';
    if (screen === 'university') return 'university';
    if (screen === 'employer') return 'employer';
    return null;
  };

  const designatedRole = getDesignatedRoleForScreen(currentScreen);
  const isRestrictedAccess = designatedRole !== null && (!currentUser || currentUser.role !== designatedRole);

  const handleFastSwitchRole = (newRole: 'student' | 'employer' | 'university') => {
    const emails = {
      student: 'john.doe@state.edu',
      employer: 'recruiter@techcorp.com',
      university: 'provost@state.edu'
    };
    setCurrentUser({
      email: emails[newRole],
      role: newRole
    });
  };

  return (
    <div className="min-h-screen bg-slate-50/20 text-slate-800 font-sans flex flex-col justify-between" id="app-root">
      
      {currentUser && (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-4 md:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
                <Briefcase className="w-4 h-4" />
              </div>
              <div>
                <span className="font-display font-black text-xs tracking-tight uppercase text-slate-900 block leading-tight">
                  HireReady <span className="text-indigo-600">Career OS</span>
                </span>
                <span className="text-[9px] text-slate-500 font-mono block leading-none">Platform Sandbox</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end text-right">
                <p className="text-xs font-semibold text-slate-800">{currentUser.email}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                  {currentUser.role === 'student' ? 'Student Workspace' : currentUser.role === 'employer' ? 'Employer/Recruiter' : 'University Specialist'}
                </p>
              </div>
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setCurrentScreen('auth');
                }}
                className="bg-slate-150 hover:bg-slate-200 text-slate-705 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border border-slate-200/60 transition-all flex items-center gap-1.5 cursor-pointer bg-slate-100"
              >
                Log Out
              </button>
            </div>
          </div>
        </header>
      )}

      {/* 2. MAIN WORKSPACE ENVIRONMENT */}
      <main className="max-w-7xl w-full mx-auto p-4 md:p-8 flex-grow space-y-6">
        
        {isRestrictedAccess ? (
          <div className="max-w-lg mx-auto my-12 bg-white rounded-2xl border border-slate-200/90 shadow-2xl overflow-hidden font-sans relative animate-fade-in">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 via-rose-500 to-red-650" />
            <div className="p-8 text-center space-y-6">
              <div className="inline-flex bg-amber-50 p-4 rounded-3xl border border-amber-100 text-amber-600 shadow-xs animate-pulse">
                <ShieldAlert className="w-10 h-10" />
              </div>
              
              <div className="space-y-1.5">
                <h2 className="font-display font-black text-2xl tracking-tight text-slate-800 uppercase">
                  Designated Portal Security Gate
                </h2>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You are attempting to access a workspace section that has strict clearance protocols.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 text-left rounded-xl p-5 space-y-4 font-sans">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block border-b border-slate-200/60 pb-1.5">
                  Current Session State
                </div>
                {currentUser ? (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping shrink-0" />
                      <span className="font-mono text-slate-800 text-[11px]">{currentUser.email}</span>
                    </p>
                    <div className="flex gap-2">
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-indigo-700 font-bold">
                        Credential: {currentUser.role === 'student' ? 'Student' : currentUser.role === 'employer' ? 'Recruiter' : 'University Official'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-rose-600 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>Unauthenticated Guest Profile</span>
                    </p>
                    <p className="text-[10px] text-slate-500">Sign in to gain designated evaluation credentials.</p>
                  </div>
                )}

                <div className="border-t border-slate-200/80 pt-3">
                  <span className="text-[10px] font-bold text-slate-400 font-sans uppercase tracking-widest block mb-1">Grant Access Requirements</span>
                  <span className="text-xs font-extrabold text-indigo-650 uppercase tracking-wider flex items-center gap-1 font-sans">
                    👉 Only allowed for: <strong className="text-slate-850 underline uppercase">{designatedRole === 'student' ? 'Student Portals' : designatedRole === 'employer' ? 'Employer/Recruitment Accounts' : 'University Specialists'}</strong>
                  </span>
                </div>
              </div>

              {/* Action swap buttons */}
              <div className="space-y-3 pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">INSTANT EVALUATION WORKSPACE SWITCHING</span>
                <div className="grid grid-cols-1 gap-2.5 font-display">
                  {designatedRole === 'student' && (
                    <button
                      onClick={() => handleFastSwitchRole('student')}
                      className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Unlock as Student (John Doe Preset)</span>
                    </button>
                  )}
                  {designatedRole === 'employer' && (
                    <button
                      onClick={() => handleFastSwitchRole('employer')}
                      className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-250" />
                      <span>Unlock as Recruitment Manager Preset</span>
                    </button>
                  )}
                  {designatedRole === 'university' && (
                    <button
                      onClick={() => handleFastSwitchRole('university')}
                      className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-amber-205" />
                      <span>Unlock as University Specialist Preset</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setCurrentUser(null);
                      setCurrentScreen('auth');
                    }}
                    className="py-2.5 px-3 bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold rounded-lg transition-all"
                  >
                    🔐 Sign In Page
                  </button>
                  <button
                    onClick={() => setCurrentScreen('landing')}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-all"
                  >
                    🏠 Return Home
                  </button>
                </div>
              </div>

            </div>
          </div>
        ) : (
          <>
            {/* AUTH SCREEN */}
            {currentScreen === 'auth' && (
              <AuthPage 
                onLogin={(email, role) => {
                  setCurrentUser({ email, role });
                  if (role === 'student') {
                    setCurrentScreen('upload');
                  } else if (role === 'university') {
                    setCurrentScreen('university');
                  } else if (role === 'employer') {
                    setCurrentScreen('employer');
                  }
                }} 
              />
            )}

            {/* LANDING PAGE SCREEN */}
            {currentScreen === 'landing' && (
              <div className="space-y-12 py-6 animate-fade-in" id="landing-screen">
                
                {/* HERO MODULE */}
                <div className="text-center space-y-4 max-w-4xl mx-auto py-4">
                  <span className="bg-indigo-55 text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
                    🚀 Proof of competence over hollow buzzwords
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 tracking-tight leading-tight">
                    Understand why you are <span className="text-indigo-650">not getting shortlisted</span> — and simulate the fix.
                  </h2>
                  <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                    HireReady maps a student’s profile against employer-defined job requirements, predicts estimated shortlist probability using ML, and allows students to run sandbox improvements.
                  </p>
                </div>

                {/* THREE SIDES MAIN CARD GRID - Dynamically filtered by User Role */}
                {(() => {
                  const showStudent = !currentUser || currentUser.role === 'student';
                  const showSchool = !currentUser || currentUser.role === 'university';
                  const showRecruiter = !currentUser || currentUser.role === 'employer';
                  
                  const count = [showStudent, showSchool, showRecruiter].filter(Boolean).length;
                  const gridCols = count === 1 
                    ? 'grid grid-cols-1 max-w-md mx-auto gap-6' 
                    : count === 2 
                      ? 'grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6' 
                      : 'grid grid-cols-1 md:grid-cols-3 gap-6';

                  return (
                    <div className={gridCols}>
                      {/* Card 1: Student */}
                      {showStudent && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-205 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                          <div>
                            <div className="bg-indigo-50 text-indigo-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-indigo-100 shadow-xs">
                              <Users className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-slate-900">1. Student Career OS</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                              Compare your resume profile against structured employer specifications. Diagnose critical tool gaps and try what-if scenarios in our sandbox.
                            </p>
                          </div>
                          <button
                            onClick={() => setCurrentScreen('upload')}
                            className="mt-6 w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold uppercase rounded-xl tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer font-display"
                          >
                            <span>Student Portal: Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}

                      {/* Card 2: College */}
                      {showSchool && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-205 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group font-sans">
                          <div>
                            <div className="bg-indigo-50 text-indigo-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-indigo-100 shadow-xs">
                              <School className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-slate-900">2. University Cohort Panel</h3>
                            <p className="text-xs text-slate-505 mt-2 leading-relaxed">
                              Access aggregate departmental analytics. Sift cohort skill vacuum trends and program targeted workshops to elevate readiness metrics.
                            </p>
                          </div>
                          <button
                            onClick={() => setCurrentScreen('university')}
                            className="mt-6 w-full py-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-900 text-xs font-bold uppercase rounded-xl tracking-wider transition-colors flex items-center justify-center gap-1 border border-indigo-200 cursor-pointer font-display"
                          >
                            <span>University Portal: Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}

                      {/* Card 3: Recruiting */}
                      {showRecruiter && (
                        <div className="bg-white rounded-2xl p-6 border border-slate-205 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                          <div>
                            <div className="bg-indigo-50 text-indigo-700 w-12 h-12 rounded-xl flex items-center justify-center mb-4 border border-indigo-100 shadow-xs">
                              <Briefcase className="w-6 h-6" />
                            </div>
                            <h3 className="font-display font-bold text-lg text-slate-900">3. Employer match Board</h3>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                              Sift talent based on estimated shortlist probability. Build custom job requirement benchmarks and review qualified candidates.
                            </p>
                          </div>
                          <button
                            onClick={() => setCurrentScreen('employer')}
                            className="mt-6 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase rounded-xl tracking-wider transition-colors flex items-center justify-center gap-1 cursor-pointer font-display"
                          >
                            <span>Employer Portal: Verify Talent</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Methodology block */}
                <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 border border-slate-800 flex flex-col md:flex-row gap-6 justify-between items-center relative overflow-hidden">
                  <div className="space-y-2 z-10 text-center md:text-left">
                    <span className="text-indigo-400 font-bold uppercase font-mono text-xs">Aesthetic Integrity Paradigm</span>
                    <h3 className="font-display font-black text-xl md:text-2xl mt-1">Shortlist Probability Forecasting Engine</h3>
                    <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
                      HireReady matches structural credentials, estimates shortlist probability via an interpretable prediction classifier model, and lets candidates simulate outcomes before submitting resumes.
                    </p>
                  </div>
                  <div className="shrink-0 flex gap-4 text-center z-10">
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl w-32">
                      <p className="text-indigo-400 font-bold uppercase text-[10px]">Unverified Match</p>
                      <p className="text-2xl font-black text-slate-100 mt-1 font-mono">38%</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Average probability</p>
                    </div>
                    <div className="bg-slate-950 p-4 border border-slate-850 rounded-xl w-32">
                      <p className="text-emerald-400 font-bold uppercase text-[10px]">Simulated Match</p>
                      <p className="text-2xl font-black text-slate-105 mt-1 font-mono">82%</p>
                      <p className="text-[9px] text-slate-500 mt-0.5">Sandbox verification</p>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                </div>

              </div>
            )}

            {/* RESUME UPLOAD SCREEN */}
            {currentScreen === 'upload' && (
              <div className="space-y-6 max-w-3xl mx-auto py-6 animate-fade-in" id="upload-screen">
                
                <div className="space-y-1">
                  <h2 className="font-display font-black text-2xl tracking-tight text-slate-800 uppercase">Input Resume Profile Specs</h2>
                  <p className="text-xs text-slate-500">Provide your actual resume details or use our John Doe mock draft to test the recruitment pipeline.</p>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 shadow-sm space-y-6">
                  
                  {/* John Doe prefill trigger */}
                  <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 flex flex-col sm:flex-row justify-between items-center gap-3 font-sans">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-indigo-600" />
                        <p className="font-bold text-indigo-905 text-xs">Run the Recommended Storyline Scenario:</p>
                      </div>
                      <p className="text-slate-500 text-[11px] leading-snug">Loads John Doe's resume draft which lacks SQL project proof, triggering the recruitment analysis.</p>
                    </div>
                    
                    <button
                      onClick={handleAutofillJohnDoe}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase rounded-lg shadow-xs transition-colors shrink-0 cursor-pointer font-display"
                    >
                      📋 Use John Doe's Draft
                    </button>
                  </div>

                  {/* Form elements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Education Level</label>
                      <select 
                        value={educationLevel}
                        onChange={(e) => setEducationLevel(e.target.value)}
                        className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-201 rounded-lg focus:ring-1 focus:ring-indigo-500"
                      >
                        <option value="B.S.">Bachelor of Science (B.S.)</option>
                        <option value="M.S.">Master of Science (M.S.)</option>
                        <option value="Ph.D.">Doctor of Philosophy (Ph.D.)</option>
                        <option value="Bootcamp">Bootcamp Certificate</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Declared College Major</label>
                      <input 
                        type="text"
                        placeholder="e.g. Information Systems"
                        value={major}
                        onChange={(e) => setMajor(e.target.value)}
                        className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-201 rounded-lg focus:ring-1 focus:ring-indigo-500 text-slate-705"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">Personal Portfolio Link</label>
                      <input 
                        type="text"
                        placeholder="e.g. https://myportfolio.dev"
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-201 rounded-lg focus:ring-1 focus:ring-indigo-500 text-slate-705"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-1">GitHub Account URL</label>
                      <input 
                        type="text"
                        placeholder="e.g. github.com/username"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="w-full text-xs font-medium p-2.5 bg-slate-50 border border-slate-201 rounded-lg focus:ring-1 focus:ring-indigo-500 text-slate-705"
                      />
                    </div>

                  </div>

                  {/* Drag drop uploader */}
                  <div className="border-2 border-dashed border-slate-180 border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-indigo-400 transition-colors bg-slate-50/50">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                    <p className="font-bold text-slate-700 mt-2 text-xs uppercase font-display">Drag & Drop PDF / DOCX resume file here</p>
                    <p className="text-slate-400 text-[10px] mt-0.5">Automated screening algorithms extract text structures</p>
                  </div>

                  {/* Paste Textbox */}
                  <div className="space-y-1.5 font-sans">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Or paste raw resume text below:</label>
                    <textarea
                      rows={6}
                      placeholder="Paste continuous ASCII resume text blocks here..."
                      value={resumeText}
                      onChange={(e) => setResumeText(e.target.value)}
                      className="w-full text-xs font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 placeholder-slate-400 text-slate-705"
                    />
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed font-sans">
                    <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <p>
                      <b>Resume Data Security:</b> Your document is parsed as isolated numerical tensors for vector matching inside sandboxed memory buffers. Files are encrypted.
                    </p>
                  </div>

                  {/* Next Button */}
                  <div className="flex justify-end pt-3">
                    <button
                      onClick={() => {
                        if (!resumeText) {
                          alert("Please paste text or load John Doe's resume draft to proceed!");
                          return;
                        }
                        setCurrentScreen('select_job');
                      }}
                      className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase rounded-xl tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer font-display"
                    >
                      <span>Choose Target Job Role</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* SELECT TARGET JOB SCREEN */}
            {currentScreen === 'select_job' && (() => {
              const filteredRoles = jobRoles.filter(role => 
                role.title.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                role.roleLevel.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                role.description.toLowerCase().includes(jobSearchQuery.toLowerCase()) ||
                role.requiredSkills.some((sk: string) => sk.toLowerCase().includes(jobSearchQuery.toLowerCase()))
              );

              return (
                <div className="space-y-6 max-w-4xl mx-auto py-6 animate-fade-in" id="select-job-screen">
                  
                  <div className="space-y-1">
                    <h2 className="font-display font-black text-2xl tracking-tight text-slate-800 uppercase">Select Target Job Position</h2>
                    <p className="text-xs text-slate-500 font-sans">Compare paper credentials against structured employer requirements to evaluate match accuracy.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start font-sans">
                    
                    {/* Left Column: Job Cards List */}
                    <div className="md:col-span-5 space-y-3">
                      {/* Search Bar */}
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Search className="w-3.5 h-3.5 text-slate-400" />
                        </span>
                        <input
                          type="text"
                          value={jobSearchQuery}
                          onChange={(e) => setJobSearchQuery(e.target.value)}
                          className="w-full text-xs p-2.5 pl-9 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500 text-slate-700 placeholder-slate-400 font-medium shadow-sm"
                          placeholder="Search listed jobs or type any desired title..."
                        />
                        {jobSearchQuery && (
                          <button
                            onClick={() => setJobSearchQuery('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 text-[10px] font-bold uppercase tracking-wider"
                          >
                            Clear
                          </button>
                        )}
                      </div>

                      {/* Filtered roles list */}
                      <div className="space-y-3 max-h-[460px] overflow-y-auto px-1.5 py-1">
                        {filteredRoles.length > 0 ? (
                          filteredRoles.map(role => (
                            <button
                              key={role.id}
                              onClick={() => setSelectedRoleId(role.id)}
                              className={`w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                                selectedRoleId === role.id 
                                  ? 'bg-purple-50/80 border-purple-300 text-purple-950 font-bold ring-2 ring-purple-500/10' 
                                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50/50'
                              }`}
                            >
                              <div className="flex justify-between items-start w-full">
                                <div>
                                  <span className="text-[9px] text-purple-600 uppercase font-mono tracking-widest block font-bold">{role.roleLevel}</span>
                                  <h4 className="font-display font-bold text-sm text-slate-850 mt-0.5">{role.title}</h4>
                                </div>
                                {role.id === 'data-analyst' && (
                                  <span className="text-[9px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-black tracking-wide shrink-0">Recommended</span>
                                )}
                              </div>
                            </button>
                          ))
                        ) : (
                          <div className="bg-slate-50 border border-dashed border-slate-250 rounded-xl p-6 text-center space-y-2">
                            <p className="text-xs text-slate-600 font-medium leading-relaxed font-sans">
                              The role that you are looking for is currently not available to analyze.
                            </p>
                          </div>
                        )}
                      </div>



                    </div>

                    {/* Right Column: Selected Role Specific detail specification */}
                    <div className="md:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-xs space-y-5">
                      
                      <div className="border-b border-indigo-50 pb-3">
                        <span className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">{activeRole.roleLevel} Position</span>
                        <h3 className="font-display font-black text-lg text-slate-900 mt-1">{activeRole.title}</h3>
                        <p className="text-xs text-slate-505 italic mt-1 leading-relaxed">"{activeRole.description}"</p>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Required Tool Competencies</span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeRole.requiredSkills.map(sk => {
                            const isCritical = activeRole.criticalSkills.includes(sk);
                            return (
                              <span 
                                key={sk} 
                                className={`inline-flex px-2.5 py-1 text-xs rounded-md font-medium border ${
                                  isCritical 
                                    ? 'bg-rose-50 text-rose-700 border-rose-100 font-bold' 
                                    : 'bg-slate-50 text-slate-600 border-slate-100'
                                }`}
                              >
                                {sk} {isCritical && <span className="text-[9px] font-mono text-rose-500 ml-1">Critical</span>}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Example Responsibilities */}
                      <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Core Duties & Activities</span>
                        <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 pl-1 leading-relaxed">
                          {activeRole.responsibilities.map((resp, idx) => (
                            <li key={idx}>{resp}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Action buttons */}
                      <div className="flex justify-between items-center pt-2">
                        <button 
                          onClick={() => setCurrentScreen('upload')}
                          className="text-xs text-slate-500 hover:underline uppercase tracking-wider font-bold animate-pulse"
                        >
                          ← Edit Resume Text
                        </button>
                        
                        <button
                          onClick={() => {
                            setCurrentScreen('processing');
                          }}
                          className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow-xs transition-all flex items-center gap-1.5 cursor-pointer font-display"
                        >
                          <span>Begin Skill Matching</span>
                          <Play className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>

                </div>
              );
            })()}

            {/* PROCESSING SCREEN */}
            {currentScreen === 'processing' && (
              <div className="max-w-md mx-auto py-16 text-center space-y-8 font-sans animate-fade-in" id="processing-screen">
                
                <div className="space-y-3">
                  <div className="relative w-16 h-16 mx-auto">
                    <div className="absolute inset-0 border-4 border-slate-200 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-indigo-600 border-r-indigo-600/30 rounded-full animate-spin" />
                  </div>
                  <h2 className="font-display font-black text-xl text-slate-800 uppercase tracking-tight">HireReady Scanning Engine Running</h2>
                  <p className="text-slate-500 text-xs">Matching profile syntax against {activeRole.title} specifications...</p>
                </div>

                {/* steps checklist */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 text-left">
                  
                  <div className="flex items-center gap-3">
                    <div className="shrink-0 animate-pulse">
                      {processingStep >= 1 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full animate-spin" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold ${processingStep >= 1 ? 'text-slate-800' : 'text-slate-400'}`}>
                      📂 Parsing ASCII text structures & formatting...
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="shrink-0 animate-pulse">
                      {processingStep >= 2 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold ${processingStep >= 2 ? 'text-slate-800' : 'text-slate-400'}`}>
                      🔍 Extracting explicit tool keywords...
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="shrink-0 animate-pulse">
                      {processingStep >= 3 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold ${processingStep >= 3 ? 'text-slate-800' : 'text-slate-400'}`}>
                      🤖 Running ML shortlist probability classification...
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {processingStep >= 4 ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-slate-300 rounded-full" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold ${processingStep >= 4 ? 'text-slate-800' : 'text-slate-400'}`}>
                      📝 Prediction Complete: Formulating diagnostics...
                    </span>
                  </div>

                </div>

                <div className="text-xs text-slate-400">
                  Preparing layout boards...
                </div>

              </div>
            )}

            {/* STUDENT PORTFOLIO HUB / MAIN DASHBOARD SCREEN */}
            {currentScreen === 'student_dashboard' && (
              <div className="space-y-6 animate-fade-in" id="student_dashboard">
                <StudentOverview 
                  shortlistChance={shortlistChance}
                  skillMatchRatio={skillMatchRatio}
                  hireReadyScore={hireReadyScore}
                  isSimulated={isSimulated}
                  setIsSimulated={setIsSimulated}
                  activeTab={studentActiveTab}
                  setActiveTab={setStudentActiveTab}
                />
              </div>
            )}

            {/* UNIVERSITY COHORT ANALYTICS VIEW */}
            {currentScreen === 'university' && (
              <UniversityPortal />
            )}

            {/* EMPLOYER LEADERBOARD VIEW */}
            {currentScreen === 'employer' && (
              <EmployerPortal 
                isSimulated={isSimulated}
                jobRoles={jobRoles}
                onCreateJob={handleCreateJobRole}
              />
            )}

            {/* MACHINE LEARNING DIAGNOSTICS VIEW */}
            {currentScreen === 'ml' && (
              <MLExplainability />
            )}

          </>
        )}

      </main>

      <footer className="bg-slate-900 border-t border-slate-800 text-slate-500 py-6 text-center text-xs">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 HireReady Career OS. All aggregate data simulated for demonstrative validation.</p>
          <div className="flex justify-center gap-4 text-[11px] text-slate-405 font-display select-none">
            <span className="hover:text-indigo-400 cursor-pointer">Verification protocol</span>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer">Aggregate compliance encryption</span>
            <span>•</span>
            <span className="hover:text-indigo-400 cursor-pointer">Model terms</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
