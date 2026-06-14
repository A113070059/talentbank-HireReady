import { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XOctagon, 
  Flame, 
  TrendingUp, 
  BookOpen, 
  Award, 
  BarChart4, 
  Workflow, 
  Sparkles,
  Search,
  Globe,
  ArrowRight,
  Info
} from 'lucide-react';
import { INITIAL_SKILLS } from '../data';
import { SkillComparison } from '../types';
import WhatIfSimulator from './WhatIfSimulator';

interface StudentOverviewProps {
  shortlistChance: number;
  skillMatchRatio: number;
  hireReadyScore: number;
  isSimulated: boolean;
  setIsSimulated: (b: boolean) => void;
  activeTab: 'overview' | 'gap' | 'simulator';
  setActiveTab: (tab: 'overview' | 'gap' | 'simulator') => void;
}

export default function StudentOverview({
  shortlistChance: baseShortlistChance,
  skillMatchRatio: baseSkillMatchRatio,
  hireReadyScore: baseHireReadyScore,
  isSimulated,
  setIsSimulated,
  activeTab,
  setActiveTab
}: StudentOverviewProps) {


  // Simulated vs non-simulated responsive values
  const shortlistChance = isSimulated ? 52 : 38;
  const skillMatchRatio = isSimulated ? 67 : 50;
  const hireReadyScore = isSimulated ? 78 : 64;
  const criticalSkillCoverage = isSimulated ? 67 : 33;
  const resumeJdSimilarity = isSimulated ? 68 : 58;
  const missingCriticalCount = isSimulated ? 1 : 2;
  const missingTotalCount = isSimulated ? 2 : 3;

  // Render required skills mapping list
  const skillsList: SkillComparison[] = INITIAL_SKILLS.map(skill => {
    let found = skill.foundInResume;
    let status = skill.status;
    let priority = skill.priority;

    if (isSimulated && (skill.name === 'SQL' || skill.name === 'Tableau')) {
      found = true;
      status = 'Covered';
      priority = 'Covered';
    }

    return {
      ...skill,
      foundInResume: found,
      status,
      priority
    };
  });

  const matchedSkillsNames = skillsList.filter(s => s.foundInResume).map(s => s.name);
  const missingSkillsNames = skillsList.filter(s => !s.foundInResume).map(s => s.name);

  return (
    <div className="w-full bg-slate-50/50 rounded-2xl p-4 md:p-6 border border-slate-200/80">
      
      {/* Sub-NavigationBar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-2">
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'overview' 
                ? 'bg-white text-indigo-700 shadow-sm font-bold' 
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            📊 Readiness Dashboard Overview
          </button>
          <button
            onClick={() => setActiveTab('gap')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'gap' 
                ? 'bg-white text-indigo-700 shadow-sm font-bold' 
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            🎯 Skill Gap Diagnosis
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-all ${
              activeTab === 'simulator' 
                ? 'bg-white text-indigo-700 shadow-sm font-bold' 
                : 'text-slate-600 hover:text-indigo-600 hover:bg-slate-50'
            }`}
          >
            ⚡ LLM What-if Simulator
          </button>
        </div>
        
        <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-lg px-3 py-1.5 text-[11px] font-medium">
          <Globe className="w-3.5 h-3.5 shrink-0" />
          <span>Profile Scope: Junior Data Analyst Path</span>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}

      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Top Scoring Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Score 1 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">HireReady Score</p>
                <p className="text-3xl font-bold font-display text-slate-850 mt-2">{hireReadyScore}<span className="text-sm font-normal text-slate-400">/100</span></p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-600 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${hireReadyScore}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-mono">
                  <span>Baseline: 64</span>
                  <span className="font-bold text-indigo-600">{hireReadyScore >= 75 ? '🟢 Optimal' : '🟡 Developing'}</span>
                </div>
              </div>
              <div className="absolute right-3 top-3 bg-indigo-50 p-2 rounded-lg">
                <Award className="w-5 h-5 text-indigo-600" />
              </div>
            </div>

            {/* Score 2 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Shortlist Chance</p>
                <p className="text-3xl font-bold font-display text-emerald-600 mt-2">{shortlistChance}%</p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${shortlistChance}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-mono">
                  <span>Target: &gt;75%</span>
                  <span className={`font-semibold ${shortlistChance >= 50 ? 'text-emerald-600' : 'text-amber-500'}`}>
                    {shortlistChance}% Probability
                  </span>
                </div>
              </div>
              <div className="absolute right-3 top-3 bg-emerald-50 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
            </div>

            {/* Score 3 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skill Match Ratio</p>
                <p className="text-3xl font-bold font-display text-sky-600 mt-2">{skillMatchRatio}%</p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-sky-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${skillMatchRatio}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-mono">
                  <span>Baseline: 50%</span>
                  <span className="font-bold text-sky-600">{skillMatchRatio}% Match</span>
                </div>
              </div>
              <div className="absolute right-3 top-3 bg-sky-50 p-2 rounded-lg">
                <BookOpen className="w-5 h-5 text-sky-600" />
              </div>
            </div>

            {/* Score 4 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Critical Skill Coverage</p>
                <p className="text-3xl font-bold font-display text-purple-600 mt-2">{criticalSkillCoverage}%</p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-purple-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${criticalSkillCoverage}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-mono">
                  <span>Target: 100%</span>
                  <span className="font-bold text-purple-600">{criticalSkillCoverage}% Covered</span>
                </div>
              </div>
              <div className="absolute right-3 top-3 bg-purple-50 p-2 rounded-lg">
                <Workflow className="w-5 h-5 text-purple-600" />
              </div>
            </div>

            {/* Score 5 */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Resume-JD Similarity</p>
                <p className="text-3xl font-bold font-display text-amber-600 mt-2">{resumeJdSimilarity}%</p>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-500 h-full rounded-full transition-all duration-500" 
                    style={{ width: `${resumeJdSimilarity}%` }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2 text-[10px] text-slate-400 font-mono">
                  <span>Baseline: 58%</span>
                  <span className="font-bold text-amber-600">{resumeJdSimilarity}% Semantics</span>
                </div>
              </div>
              <div className="absolute right-3 top-3 bg-amber-50 p-2 rounded-lg">
                <Search className="w-5 h-5 text-amber-600" />
              </div>
            </div>

          </div>

          {/* DIAGNOSIS BANNER */}
          <div className={`p-5 rounded-2xl border flex flex-col md:flex-row gap-4 items-start ${isSimulated ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'}`}>
            <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-200 shrink-0">
              {isSimulated ? (
                <Sparkles className="w-6 h-6 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              )}
            </div>
            <div className="space-y-1.5 font-sans text-xs">
              <h4 className="font-display font-black text-sm uppercase tracking-wider">
                {isSimulated ? "Simulated State Analysis: COMPLETED" : "Real-time Readiness Indicator"}
              </h4>
              <p className="leading-relaxed text-slate-705">
                {isSimulated ? (
                  "You have simulated adding SQL and Tableau! Your predicted shortlist probability has risen from 38% to 52%. Adding critical keywords significantly reduces technical filtering roadblocks. Complete real-world workshops and tasks to lock in these improvements."
                ) : (
                  "You are partially ready for Junior Data Analyst roles, but your shortlist chance is reduced by missing SQL, weak data cleaning coverage, and moderate resume-job similarity."
                )}
              </p>
            </div>
          </div>

          {/* TWO COLUMN DETAIL PREVIEW */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-sans text-xs">
            
            {/* Left: Matched & Missing lists */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                Resume Extracted Skills Mapping
              </h3>

              <div className="space-y-3.5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Matched Skills ({matchedSkillsNames.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {matchedSkillsNames.map((s, idx) => (
                      <span key={idx} className="bg-emerald-50 text-emerald-800 border border-emerald-100 font-medium rounded-lg px-2.5 py-1">
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Missing Skills ({missingSkillsNames.length})</span>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {missingSkillsNames.map((s, idx) => (
                      <span key={idx} className="bg-rose-50 text-rose-800 border border-rose-100 font-medium rounded-lg px-2.5 py-1">
                        ✗ {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: SHAP Impact ranking */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-4">
              <h3 className="font-display font-bold text-sm text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                Top factors lowering shortlist chance
              </h3>

              <div className="space-y-2 text-slate-700 font-sans text-xs">
                <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg flex gap-2">
                  <span className="font-mono bg-rose-100 text-rose-800 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                  <span><b>Missing critical skill: SQL</b> — Decreases predicted shortlist chance significantly due to high vacancy listings.</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg flex gap-2">
                  <span className="font-mono bg-rose-100 text-rose-800 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                  <span><b>Missing critical skill: Data Cleaning</b> — Marked as essential by TalentBank employer guidelines.</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg flex gap-2">
                  <span className="font-mono bg-slate-200 text-slate-700 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                  <span><b>Critical skill coverage is below the recommended level</b> — Sieve rate targets require 100% of essential elements.</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg flex gap-2">
                  <span className="font-mono bg-slate-200 text-slate-700 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                  <span><b>Resume-JD similarity is moderate (58%)</b> — Textual modeling indicates vocabulary gaps against responsibilities description.</span>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-150 rounded-lg flex gap-2">
                  <span className="font-mono bg-slate-200 text-slate-700 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0">5</span>
                  <span><b>Market demand coverage is moderate (45%)</b> — Aspiring candidate lacked high-impact analytical keywords.</span>
                </div>
              </div>
            </div>

          </div>

          {/* NEXT STEP WORKCARD */}
          <div className="bg-indigo-950 text-white rounded-2xl p-5 md:p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-md">
            <div className="space-y-1 z-10 font-sans text-xs">
              <span className="text-indigo-300 font-bold uppercase text-[9px] tracking-widest font-mono">Recommended Immediate Action</span>
              <h4 className="font-display font-black text-sm tracking-wide">Primary Study Target: Relational SQL Commands</h4>
              <p className="text-indigo-200/90 leading-relaxed text-[11px]">
                {"Focus on SQL first because it is both a critical employer-defined skill and a high-demand skill for Junior Data Analyst roles."}
              </p>
            </div>
            <div className="flex gap-2 shrink-0 z-10">
              <button 
                type="button"
                onClick={() => setActiveTab('gap')}
                className="bg-white text-indigo-950 hover:bg-slate-100 text-[11px] font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1"
              >
                View Skill Gap Details
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab('simulator')}
                className="bg-indigo-700 hover:bg-indigo-650 text-white border border-indigo-600 text-[11px] font-bold px-3.5 py-2 rounded-xl transition-all"
              >
                Try What-if Simulator
              </button>
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-505/10 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      )}

      {activeTab === 'gap' && (
        <div className="space-y-6">
          
          <div className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm space-y-3 font-sans text-xs">
            <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-indigo-50/50">
              <Info className="w-4.5 h-4.5 text-indigo-600" /> What is a Skill Gap?
            </h3>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              {"Skill gap means the difference between the skills found in the student’s resume and the skills required by the employer-defined job profile. Critical skill gaps matter more because the employer marked them as essential for the role."}
            </p>
          </div>

          {/* Top Summary Blocks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Skill Match Ratio</span>
              <p className="text-2xl font-black text-indigo-600 mt-0.5">{skillMatchRatio}%</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Missing Skills</span>
              <p className="text-2xl font-black text-rose-600 mt-0.5">{missingTotalCount}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Missing Critical Gaps</span>
              <p className="text-2xl font-black text-amber-600 mt-0.5">{missingCriticalCount}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-slate-200 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Critical Skill Coverage</span>
              <p className="text-2xl font-black text-purple-600 mt-0.5">{criticalSkillCoverage}%</p>
            </div>
          </div>

          {/* Gap Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-xs font-sans">
            
            {/* Required Skills Table (Span 8) */}
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-250/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[500px]">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200/80 text-[10px]">
                    <tr>
                      <th className="p-3.5">Skill Name</th>
                      <th className="p-3.5">Importance Type</th>
                      <th className="p-3.5">Explicitly Found</th>
                      <th className="p-3.5">Market Demand</th>
                      <th className="p-3.5">Gap Status</th>
                      <th className="p-3.5">Remediation Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {skillsList.map((s, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/40">
                        <td className="p-3.5 font-semibold text-slate-800">{s.name}</td>
                        <td className="p-3.5">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                            s.type === 'critical' ? 'bg-rose-50 text-rose-700' : 'bg-slate-50 text-slate-500'
                          }`}>
                            {s.type}
                          </span>
                        </td>
                        <td className="p-3.5">
                          {s.foundInResume ? (
                            <span className="text-emerald-600 font-bold">Yes</span>
                          ) : (
                            <span className="text-rose-600 font-bold">No</span>
                          )}
                        </td>
                        <td className="p-3.5 font-mono text-slate-650">{s.marketDemand}%</td>
                        <td className="p-3.5">
                          {s.foundInResume ? (
                            <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold">Covered</span>
                          ) : (
                            <span className="text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-lg text-[10px] font-semibold">Missing</span>
                          )}
                        </td>
                        <td className="p-3.5">
                          {s.foundInResume ? (
                            <span className="text-slate-400">Good</span>
                          ) : s.type === 'critical' ? (
                            <span className="text-rose-700 font-bold uppercase text-[9px] bg-rose-50 border border-rose-100 px-1 rounded animate-pulse">High</span>
                          ) : (
                            <span className="text-amber-700 font-semibold bg-amber-50 px-1 rounded">Medium</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Sidebar Visual stats & recommend List (Span 4) */}
            <div className="lg:col-span-4 space-y-4">
              
              {/* Category coverage progress */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-3.5">
                <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-800 flex items-center gap-1.5 pb-2 border-b border-slate-100">
                  <BarChart4 className="w-4.5 h-4.5 text-indigo-600" />
                  Skill Category Coverage
                </h4>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Data Tools</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1"><div className="bg-indigo-600 h-full rounded-full" style={{ width: '60%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Programming</span>
                      <span>50%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1"><div className="bg-indigo-600 h-full rounded-full" style={{ width: '50%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Data Cleaning</span>
                      <span className={isSimulated ? 'text-emerald-600 font-bold' : 'text-slate-650'}>{isSimulated ? '100%' : '0%'}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1"><div className="bg-indigo-650 h-full rounded-full" style={{ width: isSimulated ? '100%' : '0%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Reporting</span>
                      <span>40%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1"><div className="bg-indigo-600 h-full rounded-full" style={{ width: '40%' }} /></div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] font-medium text-slate-600">
                      <span>Business Communication</span>
                      <span>25%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1"><div className="bg-indigo-600 h-full rounded-full" style={{ width: '25%' }} /></div>
                  </div>
                </div>
              </div>

              {/* Recommended next skills */}
              <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-3">
                <h4 className="font-display font-medium text-[11px] uppercase tracking-wider text-slate-800 pb-2 border-b border-slate-100">Recommended Next Skills</h4>
                <div className="space-y-2.5 pt-1 text-slate-700">
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-700">1.</span>
                    <span><b>Learn SQL:</b> Address the most significant search rate vacancy mismatch.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-700">2.</span>
                    <span><b>Learn Data Cleaning:</b> Map out structured pipeline processes inside Python notebooks.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold text-indigo-700">3.</span>
                    <span><b>Improve Business Reporting wording:</b> Restructure presentation slides to center exact sales KPI outcomes.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {activeTab === 'simulator' && (
        <WhatIfSimulator 
          isSimulated={isSimulated}
          setIsSimulated={setIsSimulated}
        />
      )}

    </div>
  );
}
