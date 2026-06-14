import React, { useState } from 'react';
import { 
  Search, 
  Upload, 
  ExternalLink, 
  Github, 
  ShieldAlert, 
  CheckCircle2, 
  ChevronRight, 
  Filter, 
  Briefcase, 
  X,
  FileText,
  TrendingUp,
  Sliders,
  Sparkles,
  Award
} from 'lucide-react';
import { EMPLOYER_CANDIDATES } from '../data';
import { Candidate, TargetRole } from '../types';

interface EmployerPortalProps {
  isSimulated: boolean;
  jobRoles: TargetRole[];
  onCreateJob: (newJob: TargetRole) => void;
}

export default function EmployerPortal({ isSimulated, jobRoles, onCreateJob }: EmployerPortalProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [activeJobFilter, setActiveJobFilter] = useState<string>(jobRoles[0]?.id || 'data-analyst');
  const [searchQuery, setSearchQuery] = useState('');

  // Post dynamic job creation form fields
  const [showAddJob, setShowAddJob] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newLevel, setNewLevel] = useState('Entry Level');
  const [newDesc, setNewDesc] = useState('');
  const [newKeywords, setNewKeywords] = useState('');
  const [newSkills, setNewSkills] = useState('');
  const [newResponsibilities, setNewResponsibilities] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Find current active job
  const activeJobRole = jobRoles.find(r => r.id === activeJobFilter) || jobRoles[0];

  const processedCandidates = EMPLOYER_CANDIDATES.map(cand => {
    // Determine shortlist probability
    let shortlistProb = cand.predictedShortlistProbability;
    let skillsList = [...cand.skillsFound];

    // If candidate is John Doe and simulation is active, elevate attributes
    if (cand.id === 'cand-3') {
      if (isSimulated) {
        shortlistProb = 52;
        if (!skillsList.includes('SQL')) skillsList.push('SQL');
        if (!skillsList.includes('Tableau')) skillsList.push('Tableau');
      } else {
        shortlistProb = 38;
      }
    }

    // Dynamic calculations against active job's requirements
    const requiredSkills = activeJobRole?.requiredSkills || [];
    const criticalSkills = activeJobRole?.criticalSkills || [];
    const duties = activeJobRole?.responsibilities || [];

    // Found skills (intersection with required)
    const skillsFound = skillsList.filter(s => requiredSkills.some(req => req.toLowerCase() === s.toLowerCase()));
    
    // Missing critical skills
    const missingCritical = criticalSkills.filter(crit => !skillsList.some(has => has.toLowerCase() === crit.toLowerCase()));

    // Matched responsibilities: let's calculate based on matching credentials or return a proportion
    let matchedResponsibilitiesCount = 2; // Baseline
    if (cand.id === 'cand-3' && isSimulated) {
      matchedResponsibilitiesCount = 4;
    } else if (cand.id === 'cand-1') {
      matchedResponsibilitiesCount = 5;
    } else if (cand.id === 'cand-2') {
      matchedResponsibilitiesCount = 3;
    }
    
    if (matchedResponsibilitiesCount > duties.length) {
      matchedResponsibilitiesCount = duties.length;
    }

    return {
      ...cand,
      skillsFound,
      missingCritical,
      shortlistProb,
      matchedResponsibilitiesCount,
      totalResponsibilitiesCount: duties.length === 0 ? 5 : duties.length
    };
  });

  // Apply search query
  const filteredCandidates = processedCandidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.skillsFound.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Sort candidates by Estimated Shortlist Probability descending
  const sortedCandidates = [...filteredCandidates].sort((a, b) => b.shortlistProb - a.shortlistProb);

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!newTitle.trim() || !newDesc.trim() || !newSkills.trim()) {
      setFormError('Please enter Title, Description, and at least one Required Skill.');
      return;
    }

    // Parse skills and detect asterisk critical skills
    const rawSkillsList = newSkills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    const requiredSkills: string[] = [];
    const criticalSkillsFromStars: string[] = [];
    
    rawSkillsList.forEach(skill => {
      if (skill.includes('*')) {
        const cleaned = skill.replace(/\*/g, '').trim();
        if (cleaned) {
          requiredSkills.push(cleaned);
          criticalSkillsFromStars.push(cleaned);
        }
      } else {
        requiredSkills.push(skill);
      }
    });

    const criticalSkills = criticalSkillsFromStars.length > 0 
      ? criticalSkillsFromStars 
      : requiredSkills.slice(0, Math.min(2, Math.max(1, Math.round(requiredSkills.length / 2))));
    
    // Parse keywords
    const keywords = newKeywords.trim()
      ? newKeywords.split(',').map(k => k.trim()).filter(k => k.length > 0)
      : [];

    // Parse responsibilities
    const responsibilities = newResponsibilities.trim() 
      ? newResponsibilities.split(',').map(r => r.trim()).filter(r => r.length > 0)
      : [
          "Deploy data validation models and coordinate analytics reports.",
          "Write optimized backend queries to join relational transaction metrics.",
          "Design interactive visualization canvas reporting decks."
        ];

    const generatedId = `role-${Date.now()}`;
    const newJob: TargetRole = {
      id: generatedId,
      title: newTitle.trim(),
      company: 'TalentBank Demo Employer',
      jobFamily: 'Data & Engineering',
      roleLevel: newLevel,
      description: newDesc.trim(),
      requiredSkills,
      criticalSkills,
      niceToHaveSkills: [requiredSkills[0] || 'SQL'],
      responsibilities,
      minimumExperienceMonths: '0–12 months',
      educationRequirement: 'Bachelor’s Degree or equivalent',
      keywords
    };

    onCreateJob(newJob);
    setActiveJobFilter(generatedId);
    
    setFormSuccess('Job posting created and published successfully!');
    setNewTitle('');
    setNewDesc('');
    setNewKeywords('');
    setNewSkills('');
    setNewResponsibilities('');
    
    setTimeout(() => {
      setShowAddJob(false);
      setFormSuccess('');
    }, 1200);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-5 md:p-6 text-white border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-xl">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-300">Employer Matching Portal</span>
          </div>
          <h2 className="font-display font-black text-xl md:text-2xl tracking-tight">HireReady Candidate Shortlist Leaderboard</h2>
          <p className="text-slate-300 text-xs">Verify resume alignment against job requirements and identify perfect matches using estimated shortlist probabilities.</p>
        </div>
        
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Grid: Filters on Left, Leaderboard in Center/Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: JD Selection & Filter sidebar (Span 4) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Active Job Posting Cards */}
          <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/60 shadow-sm space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="font-display font-bold text-xs text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-indigo-600" />
                Active Target Job Positions
              </h3>
              <button
                type="button"
                onClick={() => { setShowAddJob(!showAddJob); setFormError(''); setFormSuccess(''); }}
                className="text-[10px] font-bold text-indigo-600 hover:text-indigo-850 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded transition-all cursor-pointer"
              >
                {showAddJob ? '✖ Close Form' : '➕ Create Job Profile'}
              </button>
            </div>

            {/* ADVERT FORM */}
            {showAddJob ? (
              <form onSubmit={handleCreateJob} className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-3 animate-fade-in text-xs">
                <p className="font-bold text-slate-705 text-[11px] mb-1">📢 Publish Job Profile</p>
                
                {formError && <div className="p-2 bg-rose-50 border border-rose-100 text-rose-600 rounded text-[10px] font-medium">{formError}</div>}
                {formSuccess && <div className="p-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded text-[10px] font-bold">{formSuccess}</div>}

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Job Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Junior Data Analyst"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Job Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded text-xs focus:ring-1 focus:ring-indigo-550"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Entry Level">Entry Level (0-12 months)</option>
                    <option value="Mid Level">Mid Level</option>
                  </select>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Job Description (JD)</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Describe core tools & business goals of the role..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Job Keywords (comma-separated)</label>
                  <input
                    type="text"
                    placeholder="e.g. cloud, analytical, real-time, telemetry"
                    value={newKeywords}
                    onChange={(e) => setNewKeywords(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Required Skill tags (comma-separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. *SQL, Python, Excel (use * for Critical skills)"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                  <p className="text-[9px] text-slate-400 mt-1 leading-tight">
                    💡 <b>Tip:</b> Include an asterisk (<code className="bg-slate-100 font-bold px-0.5 rounded">*</code>) before a skill names to mark it as <b>Critical</b> (e.g. <code className="bg-slate-100 px-1 rounded font-mono font-bold text-[9px]">*SQL</code>, <code className="bg-slate-100 px-1 rounded font-mono font-bold text-[9px]">Python</code>).
                  </p>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">Duties / Responsibilities (comma-separated - optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Build Power BI dashboards, Write SQL queries, Clean records"
                    value={newResponsibilities}
                    onChange={(e) => setNewResponsibilities(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-250 rounded text-xs focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-[11px] uppercase tracking-wider shadow-sm transition-all"
                >
                  Publish Job Profile
                </button>
              </form>
            ) : null}

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 text-xs">
              {jobRoles.map(role => (
                <button
                  key={role.id}
                  onClick={() => setActiveJobFilter(role.id)}
                  className={`w-full p-3 rounded-lg border text-left transition-all relative overflow-hidden flex items-center justify-between ${
                    activeJobFilter === role.id
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-900 font-bold'
                      : 'bg-slate-50 border-slate-200/60 text-slate-600 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="max-w-[75%]">
                    <p className="font-semibold text-xs text-slate-800 truncate">{role.title}</p>
                    <p className="text-[10px] text-slate-400 font-normal mt-0.5 truncate">{role.roleLevel}</p>
                  </div>
                  <span className="text-[9px] bg-slate-150 text-slate-705 font-medium px-1.5 py-0.5 rounded italic shrink-0">
                    Active
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-5 border border-slate-200/60 shadow-sm space-y-3 font-sans text-xs">
            <h4 className="font-display font-medium text-xs text-slate-800 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-indigo-600" />
              Employer Job Specifications
            </h4>
            <div className="space-y-2 text-slate-650 text-[11px]">
              <p><b>Description:</b> {activeJobRole?.description}</p>
              <p><b>Critical Skills:</b> {activeJobRole?.criticalSkills.join(', ')}</p>
              <p><b>Required Skills:</b> {activeJobRole?.requiredSkills.join(', ')}</p>
              {activeJobRole?.keywords && activeJobRole.keywords.length > 0 && (
                <p><b>Job Keywords:</b> {activeJobRole.keywords.join(', ')}</p>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Leaderboard Table (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-slate-200/60 shadow-sm overflow-hidden space-y-4">
          
          <div className="p-4 border-b border-slate-150 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search candidates/skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:bg-white"
              />
            </div>
            
            <div className="text-right text-[11px] text-slate-400">
              Ranked by Estimated Shortlist Probability
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-705">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-150">
                <tr>
                  <th className="p-4">Rank & Applicant</th>
                  <th className="p-4 text-center text-indigo-700">Shortlist Probability</th>
                  <th className="p-4">Skills Found</th>
                  <th className="p-4 text-rose-700">Missing Critical Skills</th>
                  <th className="p-4 text-center">Responsibilities Match</th>
                  <th className="p-4">Verify</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {sortedCandidates.map((cand, idx) => {
                  const isJohnDoe = cand.id === 'cand-3';
                  return (
                    <tr 
                      key={cand.id} 
                      className={`hover:bg-indigo-50/20 transition-colors ${
                        isJohnDoe ? 'bg-indigo-50/10' : ''
                      }`}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-400 text-sm">#{idx + 1}</span>
                          <div>
                            <p className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                              {cand.name}
                              {isJohnDoe && isSimulated && (
                                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded uppercase animate-pulse">
                                  Simulated Improved
                                </span>
                              )}
                            </p>
                            <p className="text-[10px] text-slate-400 font-normal">{cand.educationLevel}</p>
                          </div>
                        </div>
                      </td>
                      
                      <td className="p-4 text-center">
                        <span className={`inline-block px-2.5 py-1 text-xs font-black font-mono rounded ${
                          cand.shortlistProb >= 75 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : cand.shortlistProb >= 50 
                            ? 'bg-amber-100 text-amber-805' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {cand.shortlistProb}%
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[140px]">
                          {cand.skillsFound.map((ps, sidx) => (
                            <span key={sidx} className="bg-slate-105 text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded text-[9px]">
                              {ps}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="flex flex-wrap gap-1 max-w-[140px]">
                          {cand.missingCritical && cand.missingCritical.length > 0 ? (
                            cand.missingCritical.map((sk, sidx) => (
                              <span key={sidx} className="bg-rose-50 text-rose-700 border border-rose-100 px-1.5 py-0.5 rounded text-[9px] font-semibold">
                                {sk}
                              </span>
                            ))
                          ) : (
                            <span className="text-emerald-600 font-bold text-[10px]">✓ All Covered</span>
                          )}
                        </div>
                      </td>

                      <td className="p-4 text-center font-mono font-bold text-slate-600">
                        {cand.matchedResponsibilitiesCount} / {cand.totalResponsibilitiesCount}
                      </td>

                      <td className="p-4 font-semibold">
                        <button
                          onClick={() => setSelectedCandidate(cand)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-[10px] font-bold uppercase rounded tracking-wide transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* DETAIL DRAWER COMPONENT (SLIDES IN IF ANY CANDIDATE CLICKED) */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 overflow-hidden font-sans">
          {/* Backdrop mask */}
          <div 
            onClick={() => setSelectedCandidate(null)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" 
          />

          <div className="absolute inset-y-0 right-0 max-w-lg w-full bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200 animate-slide-in">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-slate-150 bg-slate-900 text-white flex justify-between items-center flex-wrap">
              <div className="space-y-0.5">
                <span className="text-[9px] bg-indigo-700 text-indigo-100 px-2.5 py-0.5 rounded font-black uppercase tracking-widest">
                  Estimated shortlist ranking Profile
                </span>
                <h3 className="font-display font-black text-lg mt-1">{selectedCandidate.name}</h3>
                <p className="text-slate-350 text-xs">{selectedCandidate.educationLevel}</p>
              </div>
              <button 
                onClick={() => setSelectedCandidate(null)}
                className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body (Scrollable) */}
            <div className="p-5 flex-grow overflow-y-auto space-y-6 text-xs text-slate-70s leading-relaxed">
              
              {/* Score Dashboard block */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 text-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-500 uppercase font-medium">Estimated Shortlist Probability</span>
                  <p className="text-2xl font-black font-mono text-indigo-700">{selectedCandidate.shortlistProb}%</p>
                </div>
              </div>

              {/* Bio summary */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Candidate parsed Summary</span>
                <p className="text-slate-650 leading-relaxed italic border-l-2 border-indigo-200 pl-3">
                  "{selectedCandidate.resumeSummary}"
                </p>
              </div>

              {/* External URL status */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Verifiable Links</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-medium font-display">
                  {selectedCandidate.portfolioUrl ? (
                    <div className="p-2.5 rounded-lg border border-indigo-100 bg-indigo-50/50 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <ExternalLink className="w-4 h-4" /> Portfolio Site
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold bg-white px-1.5 rounded">Active</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg border border-slate-100 text-slate-400 bg-slate-52/50 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">Portfolio URL</span>
                      <span className="text-[9px] bg-slate-100 px-1.5 rounded">None Found</span>
                    </div>
                  )}

                  {selectedCandidate.githubUrl ? (
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Github className="w-4 h-4" /> Code Source
                      </span>
                      <span className="text-[10px] text-emerald-650 font-bold bg-white px-1.5 rounded">Active</span>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg border border-slate-100 text-slate-400 bg-slate-52/50 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">GitHub link</span>
                      <span className="text-[9px] bg-slate-100 px-1.5 rounded">None Found</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Verified Tools found */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Skills Found</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidate.skillsFound.map((sk, sidx) => (
                    <span 
                      key={sidx}
                      className="bg-emerald-50 text-emerald-805 border border-emerald-100 px-2.5 py-1 rounded-md font-medium text-[11px]"
                    >
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matching responsibilities list */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Matched duties & responsibilities</span>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1.5 border border-slate-150">
                  <p>Matches <b>{selectedCandidate.matchedResponsibilitiesCount}</b> out of <b>{selectedCandidate.totalResponsibilitiesCount}</b> employer responsibilities.</p>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full" style={{ width: `${(selectedCandidate.matchedResponsibilitiesCount / selectedCandidate.totalResponsibilitiesCount) * 100}%` }} />
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer controls */}
            <div className="p-4 border-t border-slate-150 bg-slate-50 flex gap-2">
              <button 
                onClick={() => {
                  alert(`Interview Invitation scheduled for ${selectedCandidate.name}! Sent to ATS.`);
                  setSelectedCandidate(null);
                }}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase rounded-lg text-xs tracking-wider transition-colors"
              >
                Schedule Interview / Contact Candidate
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
