import { useState } from 'react';
import { 
  Settings, 
  Activity, 
  Cpu, 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { ML_MODELS, ML_FEATURES } from '../data';

export default function MLExplainability() {
  const [selectedModel, setSelectedModel] = useState<string>('XGBoost (Selected MVP Model)');

  return (
    <div className="w-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-950 to-emerald-950 rounded-2xl p-5 md:p-6 text-white border border-teal-900 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden shadow-xl animate-fade-in">
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-teal-400" />
            <span className="text-xs uppercase font-mono tracking-widest text-teal-300">Model Verification & Explainability</span>
          </div>
          <h2 className="font-display font-black text-xl md:text-2xl tracking-tight">XGBoost & SHAP Explainability Engine</h2>
          <p className="text-emerald-100/80 text-xs">Auditing the predictive parameters, metric coefficients, and mathematical features determining shortlist probability.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-emerald-900/40 border border-emerald-800/60 p-3 rounded-xl z-10 shrink-0 text-emerald-200">
          <Activity className="w-4.5 h-4.5 shrink-0" />
          <span className="text-xs font-mono font-bold">AUC Threshold: 0.93</span>
        </div>

        {/* Backdrop radial glow */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Visual Pipeline Section */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-3">
        <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-wider">
          Prediction & Explanation Pipeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-11 items-center gap-2 pt-2 text-center text-xs font-semibold text-slate-700">
          <div className="md:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
            Resume + Employer Job Profile
          </div>
          <div className="md:col-span-1 flex justify-center text-slate-400">
            <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </div>
          <div className="md:col-span-2 p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-sm">
            Feature Engineering
          </div>
          <div className="md:col-span-1 flex justify-center text-slate-400">
            <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </div>
          <div className="md:col-span-1 p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg shadow-sm">
            XGBoost / Random Forest
          </div>
          <div className="md:col-span-1 flex justify-center text-slate-400">
            <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </div>
          <div className="md:col-span-1 p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-lg shadow-sm">
            Predicted Shortlist Probability
          </div>
          <div className="md:col-span-1 flex justify-center text-slate-400">
            <ArrowRight className="w-4 h-4 rotate-90 md:rotate-0" />
          </div>
          <div className="md:col-span-1 p-3 bg-slate-900 border border-slate-800 text-white rounded-lg shadow-sm">
            SHAP & LLM Explanation
          </div>
        </div>
      </div>

      {/* Grid: Models comparison vs Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ML Comparative Grid (Span 5) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-5">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Settings className="w-5 h-5 text-teal-600 animate-spin-slow" />
              Model Architecture Comparison
            </h3>
            <p className="text-slate-500 text-[11px] mt-0.5">We benchmark baseline logistics against tree ensembles. The gradient-boosted XGBoost yields optimal classification.</p>
          </div>

          <div className="space-y-3">
            {ML_MODELS.map((model, idx) => {
              const isActive = selectedModel === model.name;
              return (
                <div 
                  key={idx}
                  onClick={() => setSelectedModel(model.name)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isActive 
                      ? 'bg-teal-50 border-teal-500 ring-1 ring-teal-500/30' 
                      : 'bg-slate-50 border-slate-200/60 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <p className={`text-xs font-bold font-display ${isActive ? 'text-teal-900' : 'text-slate-800'}`}>{model.name}</p>
                    {isActive && <span className="text-[9px] bg-teal-600 text-white font-bold px-1.5 rounded uppercase">Active Model</span>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 mt-2 border-t border-slate-150/50 pt-2 font-medium">
                    <p>Accuracy: <b className="text-slate-700">{model.accuracy * 100}%</b></p>
                    <p>ROC-AUC: <b className="text-slate-700">{(model.rocAuc).toFixed(2)}</b></p>
                    <p>Inference Speed: <b className="text-slate-700">{model.inferenceSpeed}</b></p>
                    <p>Deployment: <b className="text-slate-500">{model.deploymentType}</b></p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl text-[10px] text-slate-500 leading-relaxed text-center">
            💡 The MVP model uses public resume-JD matching and recruitment screening datasets with proxy labels such as match / not match or recruiter decision. Future versions can be retrained and calibrated with real employer application outcome data.
          </div>
        </div>

        {/* Feature Importance List (Span 7) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200/60 shadow-sm space-y-4">
          <div>
            <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider">XGBoost Global Feature Importance Weights</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Parameters list showing how much a specific parameter alters the resulting ready score prediction probability.</p>
          </div>

          <div className="space-y-4 pr-1">
            {ML_FEATURES.map((feat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-850 font-display text-xs">{feat.feature}</span>
                  <span className="text-teal-600 font-mono text-xs">Weight: {feat.importance}</span>
                </div>
                
                {/* Visual bar container */}
                <div className="relative w-full bg-slate-150/70 h-6 rounded overflow-hidden flex items-center pr-2 border border-slate-200/40">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full rounded" 
                    style={{ width: `${feat.importance * 100}%` }}
                  />
                  
                  <span className="absolute left-2.5 text-[10px] text-slate-800 font-medium z-10 leading-none pointer-events-none truncate select-none">
                    {feat.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* SHAP Values Explanatory section */}
      <div className="bg-white rounded-xl p-5 md:p-6 border border-slate-200/60 shadow-sm space-y-4 animate-fade-in-delayed">
        <h3 className="font-display font-bold text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          Understanding Local Explainability (SHAP values)
        </h3>
        
        <p className="text-slate-650 text-xs leading-relaxed">
          While Global Importance outlines what matters to the model in aggregate, **SHAP (SHapley Additive exPlanations)** calculates how individual items inside **John Doe’s specific profile** push or pull the estimated shortlist probability away from the baseline average.
        </p>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="space-y-3">
            <span className="font-bold text-rose-700 uppercase text-[10px] flex items-center gap-1">
              ▼ Top factors lowering the prediction (Negative Push)
            </span>
            <ul className="list-decimal list-inside space-y-2 text-slate-600 leading-relaxed font-sans">
              <li><b>Missing critical skill: SQL (-18%):</b> Heavily penalizes readiness baseline for analyst vacancies.</li>
              <li><b>Missing critical skill: Data Cleaning (-12%):</b> Pulls match probability down due to missing analytics foundations.</li>
              <li><b>Moderate resume-JD similarity (-10%):</b> Semantic vocabulary doesn't sufficiently overlap with employer expectations.</li>
              <li><b>Low critical skill coverage (-8%):</b> Having only 33% (1 out of 3) critical skills covered significantly dampens predicted shortlisting.</li>
            </ul>
          </div>

          <div className="space-y-3 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-5">
            <span className="font-bold text-emerald-700 uppercase text-[10px] flex items-center gap-1">
              ▲ Factors pulling up the prediction (Positive Pull)
            </span>
            <ul className="list-decimal list-inside space-y-2 text-slate-600 leading-relaxed font-sans mr-1">
              <li><b>Education Level alignment (+12%):</b> Bachelor’s Degree matches the requested profile guidelines nicely.</li>
              <li><b>Power BI coverage (+8%):</b> Having this critical tool covered prevents a larger negative penalty.</li>
              <li><b>Python / Excel experience (+6%):</b> Partial technical background lifts baseline features.</li>
              <li><b>Candidate Core Experience (+4%):</b> 6 months experience counts as partial credit towards criteria.</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}
