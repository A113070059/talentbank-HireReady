import { 
  Users, 
  Award, 
  TrendingUp, 
  BookOpen, 
  School, 
  MapPin, 
  AlertTriangle,
  Flame,
  Calendar,
  Sparkles
} from 'lucide-react';
import { COHORT_STATS, COHORT_ROLE_READINESS, COHORT_GAP_LEVELS, WORKSHOPS } from '../data';

export default function UniversityPortal() {
  return (
    <div className="w-full space-y-6" id="university-portal">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-5 md:p-6 text-white border border-indigo-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-xl">
        <div className="space-y-1 z-10 font-sans text-xs">
          <div className="flex items-center gap-2">
            <School className="w-5 h-5 text-indigo-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-indigo-300">University Career Readiness Portal</span>
          </div>
          <h2 className="font-display font-black text-xl md:text-2xl tracking-tight text-white mt-1">Cohort Career Readiness Analytics</h2>
          <p className="text-slate-300 text-xs">Analyze aggregate curriculum outcomes, detect curriculum skill gaps, and coordinate targeted cohort workshops.</p>
        </div>
        
        <div className="flex items-center gap-3 bg-indigo-950/80 border border-indigo-800/60 p-3 rounded-xl z-10 shrink-0">
          <MapPin className="w-5 h-5 text-indigo-400" />
          <div className="text-left font-sans text-xs">
            <span className="text-[10px] text-slate-400 block uppercase">Departmental scope</span>
            <span className="font-bold text-slate-100">Information Systems & Analytics</span>
          </div>
        </div>
        
        {/* Decorative background circle */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Aggregate Scorecards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Total Cohort Students</span>
              <p className="text-3xl font-bold font-display text-slate-800 mt-1">{COHORT_STATS.totalAnalyzed}</p>
            </div>
            <div className="bg-indigo-50 p-2.5 rounded-lg">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 border-t border-slate-100 pt-2.5">
            Active majors analyzed via resume syncing profile diagnostics.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Cohort HireReady Avg</span>
              <p className="text-3xl font-bold font-display text-indigo-600 mt-1">{COHORT_STATS.avgHireReadyScore}<span className="text-sm font-normal text-slate-400">/100</span></p>
            </div>
            <div className="bg-indigo-50 p-2.5 rounded-lg">
              <Award className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4 border-t border-slate-100 pt-2.5">
            Compared to regional peer target benchmarks of <b className="text-slate-705">45/100</b>
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Shortlist Probability</span>
              <p className="text-3xl font-bold font-display text-emerald-600 mt-1">{COHORT_STATS.avgShortlistChance}%</p>
            </div>
            <div className="bg-emerald-50 p-2.5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
          <p className="text-[11px] text-slate-405 mt-4 border-t border-slate-100 pt-2.5">
            National average benchmark: <b className="text-slate-705">38%</b>
          </p>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Most Common Skill Gap</span>
              <p className="text-3xl font-bold font-display text-rose-500 mt-1">{COHORT_STATS.mostCommonMissingSkill}</p>
            </div>
            <div className="bg-rose-50 p-2.5 rounded-lg">
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-4 border-t border-slate-100 pt-2.5">
            Missing from <b className="text-rose-700">78% of student resume profiles</b>
          </p>
        </div>

      </div>

      <div className="bg-indigo-50 p-4 border border-indigo-100 rounded-xl text-xs text-slate-600 flex items-center gap-2.5 leading-relaxed">
        <Sparkles className="w-5 h-5 text-indigo-600 shrink-0" />
        <div>
          <b>Privacy Policy Aggregation Notice:</b> Individual student data is protected. This dashboard visualizes aggregate cohort dynamics and curricular outcomes to identify broad training requirements.
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Role Readiness Breakdown */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">Cohort Concentrations & Skill Ratings</h3>
            <p className="text-slate-500 text-[11px]">Breakdown of student career tracks, aggregate readiness indexes, and dominant technical skill gaps.</p>
          </div>
          
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left text-[11px] text-slate-700">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-150">
                <tr>
                  <th className="p-3">Track Profile</th>
                  <th className="p-3 text-center">Students Count</th>
                  <th className="p-3 text-center">Avg HireReady</th>
                  <th className="p-3 text-center">Est. Shortlist Chance</th>
                  <th className="p-3">Dominant Missing Skill</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {COHORT_ROLE_READINESS.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                    <td className="p-3 font-bold text-slate-800">{item.role}</td>
                    <td className="p-3 text-center">{item.count}</td>
                    <td className="p-3 text-center font-mono text-indigo-600">{item.avgScore}/100</td>
                    <td className="p-3 text-center text-emerald-600 font-mono">{item.avgChance}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {item.topGap.split(', ').map((skill, sIdx) => (
                          <span key={sIdx} className="bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded border border-rose-100 text-[10px] font-semibold whitespace-nowrap">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Major Gap Heatmap/Bar Chart */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">Top Curriculum Gaps (% lacking proof)</h3>
            <p className="text-slate-500 text-[11px]">The percentage of analyzed resumes lacking explicit keywords or demonstration for required employer roles.</p>
          </div>
          
          <div className="space-y-3.5 pt-2 text-xs">
            {COHORT_GAP_LEVELS.map((g, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">{g.skill} <span className="text-[10px] text-slate-400 font-normal">({g.category})</span></span>
                  <span className="text-rose-600 font-mono">{g.gapPct}% Lacking Coverage</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" 
                    style={{ width: `${g.gapPct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* High-Fidelity Cohort Intervention Dashboard with Interactive Graphic Heatmap */}
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm space-y-6">
        <div>
          <h2 className="font-display font-black text-xl md:text-2xl text-slate-900 tracking-tight">
            University Ecosystem: Proactive Cohort Analytics
          </h2>
          <p className="text-slate-500 text-xs mt-1">
            Visualizes live curriculum keyword coverage gaps to flag student cohorts before recruiter-side keyword filtering triggers automatic screening rejections.
          </p>
        </div>

        {/* Dashboard Grid Container */}
        <div className="relative pt-4">
          
          {/* Proportional Grid Layer */}
          <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch z-20">
            
            {/* Heatmap Card (8 Cols) */}
            <div className="md:col-span-8 bg-white border border-slate-250/80 rounded-2xl p-5 md:p-6 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-center font-display font-bold text-slate-800 text-base mb-4 tracking-tight">
                  Cohort Intervention Dashboard
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2.5 bg-slate-50 border border-slate-200 w-28 md:w-36 text-slate-500 font-bold text-[10px] uppercase tracking-wider">Track</th>
                        <th className="p-2.5 border border-slate-200 text-center font-bold text-slate-505 text-[10px] sm:text-[11px] leading-tight bg-slate-50 uppercase tracking-wider">
                          Missing<br/>SQL
                        </th>
                        <th className="p-2.5 border border-slate-200 text-center font-bold text-slate-505 text-[10px] sm:text-[11px] leading-tight bg-slate-50 uppercase tracking-wider">
                          Missing Data<br/>Cleaning
                        </th>
                        <th className="p-2.5 border border-slate-200 text-center font-bold text-slate-505 text-[10px] sm:text-[11px] leading-tight bg-slate-50 uppercase tracking-wider">
                          Missing<br/>Git
                        </th>
                        <th className="p-2.5 border border-slate-200 text-center font-bold text-slate-505 text-[10px] sm:text-[11px] leading-tight bg-slate-50 uppercase tracking-wider">
                          Missing Model<br/>Deployment
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs">
                      {/* Row 1: Junior Data Analyst */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 border border-slate-200 font-bold text-slate-800 text-left text-[11px] bg-slate-50/20 leading-tight">
                          Junior Data Analyst
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-rose-100 text-rose-700 font-black text-lg md:text-xl relative shadow-inner">
                          {COHORT_GAP_LEVELS.find(g => g.skill === 'SQL')?.gapPct ?? 78}%
                          <span className="absolute inset-0 bg-rose-500/5 animate-pulse pointer-events-none" />
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm">
                          {COHORT_GAP_LEVELS.find(g => g.skill === 'Data Cleaning')?.gapPct ?? 65}%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50 text-slate-600 font-semibold text-xs">
                          18%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50/50 text-slate-550 font-semibold text-[11px]">
                          15%
                        </td>
                      </tr>

                      {/* Row 2: Software Eng Intern */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 border border-slate-200 font-bold text-slate-800 text-left text-[11px] bg-slate-50/20 leading-tight">
                          Software Eng Intern
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50 text-slate-550 font-semibold text-[11px]">
                          19%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50/60 text-slate-500 font-medium text-xs">
                          21%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm">
                          {COHORT_GAP_LEVELS.find(g => g.skill === 'Git')?.gapPct ?? 45}%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-[#E5DCDD] text-slate-500 font-medium text-[11px]">
                          22%
                        </td>
                      </tr>

                      {/* Row 3: AI Eng Intern */}
                      <tr className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-3 border border-slate-200 font-bold text-slate-800 text-left text-[11px] bg-slate-50/20 leading-tight">
                          AI Eng Intern
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50/30 text-slate-400 font-normal text-[11px]">
                          13%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50/50 text-slate-500 font-normal text-[11px]">
                          16%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-slate-50/60 text-slate-500 font-semibold text-xs">
                          20%
                        </td>
                        <td className="p-3 border border-slate-200 text-center bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm">
                          {COHORT_GAP_LEVELS.find(g => g.skill === 'Model Deployment')?.gapPct ?? 32}%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* System Recommendation Banner (4 Cols) */}
            <div className="md:col-span-4 bg-slate-50/50 border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-center min-h-[160px] border-l-4 border-l-indigo-600 group hover:bg-white hover:shadow-sm transition-all relative">
              <div className="space-y-3">
                <h4 className="font-display font-black text-[11px] text-indigo-900 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  System Recommendation:
                </h4>
                <div className="space-y-2 text-xs leading-relaxed text-slate-700">
                  <p>
                    Deploy targeted <b className="text-indigo-600">'SQL Foundations Sprint'</b> to address the critical <span className="font-bold text-rose-600">{COHORT_GAP_LEVELS.find(g => g.skill === 'SQL')?.gapPct ?? 78}% SQL gap</span> found inside the Junior Data Analyst cohort.
                  </p>
                  <p className="text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                    💡 <b>Impact Forecast:</b> Remediating this deficit across the <span className="font-bold text-slate-800">{COHORT_ROLE_READINESS.find(r => r.role === 'Junior Data Analyst')?.count ?? 52} Junior Analyst</span> candidates will boost average track readiness from <span className="font-semibold text-rose-500">{COHORT_ROLE_READINESS.find(r => r.role === 'Junior Data Analyst')?.avgChance ?? '38%'}</span> to an estimated <span className="font-bold text-emerald-600">52%</span>.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Transition statement summary callout at the bottom */}
        <div className="bg-slate-50 border border-slate-200/50 rounded-xl px-4 py-3.5 text-center text-slate-700 text-xs font-semibold leading-relaxed">
          Universities transition from relying on lagging post-graduation surveys to accessing real-time, actionable diagnostics.
        </div>
      </div>

      {/* RECOMMENDED CURRICULUM WORKSHOPS */}
      <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-200/60 shadow-sm space-y-4 font-sans text-xs">
        <div>
          <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="w-5 h-5 text-indigo-600" />
            Recommended Curriculum Workshops
          </h3>
          <p className="text-slate-500 text-[11px] mt-0.5">Focus areas and recommended workshops to address cohort curriculum gaps detected in analytics data.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {WORKSHOPS.map((w, idx) => {
            return (
              <div key={idx} className="p-4 rounded-xl border border-slate-200/60 bg-slate-50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-display font-bold text-xs text-indigo-950 leading-snug">{w.title}</h4>
                    <span className="text-[9px] font-mono text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded shrink-0 font-bold">
                      {w.duration}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                    <span className="font-semibold text-slate-700">Focus:</span> {w.focus}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-slate-200/50 flex justify-between items-center text-[10px]">
                  <span className="text-slate-600 font-medium">Cohort Need: <b className="text-rose-600">{w.cohortNeedPct}% Lacking Coverage</b></span>
                  <span className="text-indigo-600 bg-indigo-50/50 px-2 py-0.5 rounded text-[9px] uppercase tracking-wide font-bold">Recommended</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
