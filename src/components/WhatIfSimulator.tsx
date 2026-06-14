import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  TrendingUp, 
  Code, 
  MessageSquare, 
  Play, 
  Info, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

interface WhatIfSimulatorProps {
  isSimulated: boolean;
  setIsSimulated: (b: boolean) => void;
}

interface Message {
  sender: 'user' | 'assistant';
  text: string;
  scenario?: {
    type: string;
    skills: string[];
    certs: string[];
    exp: number;
    aligned: boolean;
    json: any;
    explanation: string;
  };
}

export default function WhatIfSimulator({ isSimulated, setIsSimulated }: WhatIfSimulatorProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'assistant',
      text: "Hello John! I am the HireReady LLM what-if simulation assistant. Type any scenario you'd like to simulate—such as learning SQL, adding experience, or obtaining certifications—and I will translate it into feature variables for our ML model to recalculate your estimated shortlist chance."
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const presetResponses: Record<string, {
    text: string,
    type: string,
    skills: string[],
    certs: string[],
    exp: number,
    aligned: boolean,
    explanation: string
  }> = {
    'sql_tableau': {
      text: "I detected that you want to add two skills: SQL and Tableau. I’ll simulate how that changes your skill match and shortlist probability.",
      type: "add_skills",
      skills: ["SQL", "Tableau"],
      certs: [],
      exp: 0,
      aligned: false,
      explanation: "If you add SQL and Tableau, your estimated shortlist chance may increase from 38% to 52%. Most of the improvement comes from SQL because it is marked as a critical skill by the employer and has high market demand. Tableau helps slightly, but its impact is smaller because this job profile prioritizes Power BI."
    },
    'google_cert': {
      text: "I detected that you want to add a professional certification: Google Data Analytics Professional Certificate. I will run the ML model to see how this credential influences your readiness.",
      type: "add_certification",
      skills: ["SQL", "Data Cleaning"],
      certs: ["Google Data Analytics Professional Certificate"],
      exp: 0,
      aligned: false,
      explanation: "Obtaining the Google Data Analytics Certificate improves your estimated shortlist chance to 52% as it infers structured competency. The model awards higher stability indices to verified coursework, especially when it addresses missing critical skills like SQL and Data Cleaning."
    },
    'experience_months': {
      text: "I detected that you want to simulate adding 6 months of professional Junior Data Analyst experience.",
      type: "add_experience",
      skills: [],
      certs: [],
      exp: 6,
      aligned: false,
      explanation: "Adding 6 months of data analyst experience pushes your total experience to 12 months, putting you fully in line with the target job profile guidelines (0-12 months). Your predicted shortlist chance elevates to 52%."
    },
    'resume_alignment': {
      text: "I detected that you want to simulate rewriting your resume to fully align its vocabulary with the target job description's responsibilities and keywords.",
      type: "improve_resume_alignment",
      skills: ["Business Reporting"],
      certs: [],
      exp: 0,
      aligned: true,
      explanation: "Improving your resume keyword alignment boosts your Resume-JD Similarity score from 58% to 68%. The ML model recalculates your estimated shortlist chance to 52% due to high semantic similarity overlap."
    }
  };

  const handleSimulate = (key: string, customText?: string) => {
    const userText = customText || getPromptChipText(key);
    
    // Add user message
    const newMessages = [...messages, { sender: 'user' as const, text: userText }];
    setMessages(newMessages);
    setIsTyping(true);

    const matchKey = presetResponses[key] ? key : 'sql_tableau'; // Fallback to SQL scenario if customized
    const preset = presetResponses[matchKey];

    setTimeout(() => {
      setIsTyping(false);
      setIsSimulated(true);
      setMessages(prev => [
        ...prev,
        {
          sender: 'assistant',
          text: preset.text,
          scenario: {
            type: preset.type,
            skills: preset.skills,
            certs: preset.certs,
            exp: preset.exp,
            aligned: preset.aligned,
            json: {
              scenario_type: preset.type,
              added_skills: preset.skills,
              added_certifications: preset.certs,
              added_experience_months: preset.exp,
              resume_alignment_improvement: preset.aligned
            },
            explanation: preset.explanation
          }
        }
      ]);
    }, 1000);
  };

  const getPromptChipText = (key: string) => {
    if (key === 'sql_tableau') return "What if I learn SQL and Tableau?";
    if (key === 'google_cert') return "What if I get a Google Data Analytics Certificate?";
    if (key === 'experience_months') return "What if I gain 6 months of data analyst experience?";
    if (key === 'resume_alignment') return "What if I rewrite my resume to better match this job?";
    return "";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const query = inputText.trim().toLowerCase();
    let key = 'sql_tableau';
    if (query.includes('cert') || query.includes('google')) {
      key = 'google_cert';
    } else if (query.includes('experience') || query.includes('month') || query.includes('year') || query.includes('gain')) {
      key = 'experience_months';
    } else if (query.includes('rewrite') || query.includes('align') || query.includes('word')) {
      key = 'resume_alignment';
    }

    handleSimulate(key, inputText);
    setInputText('');
  };

  // Get active scenario details from the latest assistant response
  const latestAssMeta = [...messages].reverse().find(m => m.sender === 'assistant' && m.scenario);
  const activeScenario = latestAssMeta?.scenario;

  return (
    <div className="w-full space-y-6" id="simulator">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-100 p-5 rounded-2xl border border-slate-200/80">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Conversational AI Sandbox</span>
          </div>
          <h2 className="font-display font-black text-xl text-slate-800 tracking-tight">LLM-Powered What-If Simulator</h2>
          <p className="text-slate-500 text-xs">Simulate potential improvements to see how the ML model recalculates your shortlist probability.</p>
        </div>
        {isSimulated && (
          <button 
            type="button"
            onClick={() => {
              setIsSimulated(false);
              setMessages([
                {
                  sender: 'assistant',
                  text: "Simulation reset. Enter another query or tap any suggested chip to begin."
                }
              ]);
            }}
            className="text-[11px] bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-lg font-bold"
          >
            Reset Simulation
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Chat Interface (Span 6) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-sm flex flex-col h-[520px] overflow-hidden">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2 shrink-0">
            <MessageSquare className="w-4.5 h-4.5 text-indigo-600" />
            <span className="text-xs uppercase tracking-wider font-bold text-slate-700">Predictive Chat Playground</span>
          </div>

          {/* Messages list */}
          <div className="p-4 flex-grow overflow-y-auto space-y-4">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-150'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'assistant' && m.scenario && (
                  <div className="w-full mt-2 p-3 bg-indigo-50 border border-indigo-150 rounded-xl space-y-2 text-[11px] self-start">
                    <p className="font-bold text-indigo-900 flex items-center gap-1.5 text-[10px] uppercase">
                      <Code className="w-3.5 h-3.5" /> Detected Scenario Parameters:
                    </p>
                    <div className="text-slate-650 space-y-1 font-mono text-[10px]">
                      <p>• <b>Scenario Type:</b> {m.scenario.type}</p>
                      {m.scenario.skills.length > 0 && <p>• <b>Added Skills:</b> {m.scenario.skills.join(', ')}</p>}
                      {m.scenario.certs.length > 0 && <p>• <b>Added Certs:</b> {m.scenario.certs.join(', ')}</p>}
                      {m.scenario.exp > 0 && <p>• <b>Added Exp Months:</b> {m.scenario.exp} mo</p>}
                      {m.scenario.aligned && <p>• <b>Optimize Resume Alignment:</b> Yes</p>}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex items-start self-start space-y-1">
                <div className="bg-slate-100 text-slate-400 rounded-2xl rounded-tl-none border border-slate-150 p-3.5 text-xs">
                  <span className="animate-pulse">Thinking & mapping features...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input tray */}
          <form onSubmit={handleSend} className="p-3 bg-slate-50 border-t border-slate-100 flex gap-2 shrink-0">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="e.g. What if I learn SQL and Tableau?"
              className="flex-grow bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700"
            />
            <button 
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white p-2.5 rounded-xl transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Right Side: Simulation Result Dashboard (Span 6) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Current vs After Score Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 shadow-md">
            <h3 className="font-display font-medium text-xs text-indigo-400 uppercase tracking-widest mb-3">
              Simulation Status
            </h3>
            
            <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2 text-xs">
              <p><b>Current Estimated Shortlist Chance:</b> <span className="text-rose-455 font-mono text-xs text-rose-455 font-medium">38%</span></p>
              <p><b>Current Skill Match Ratio:</b> 50%</p>
              <p><b>Missing Critical Skills:</b> SQL, Data Cleaning</p>
            </div>

            {/* Prompt chips */}
            <div className="mt-4 space-y-2">
              <span className="text-[10px] text-slate-405 font-bold uppercase tracking-wider text-slate-400">Suggested Action Scenarios</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleSimulate('sql_tableau')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 transition-colors text-left"
                >
                  💡 What if I learn SQL and Tableau?
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulate('google_cert')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 transition-colors text-left"
                >
                  💡 What if I get a Google Data Analytics Certificate?
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulate('experience_months')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 transition-colors text-left"
                >
                  💡 What if I gain 6 months of data analyst experience?
                </button>
                <button
                  type="button"
                  onClick={() => handleSimulate('resume_alignment')}
                  className="text-[11px] bg-slate-800 hover:bg-slate-700 border border-slate-700/60 rounded-lg px-2.5 py-1.5 text-slate-200 transition-colors text-left"
                >
                  💡 What if I rewrite my resume to better match this job?
                </button>
              </div>
            </div>
          </div>

          {/* Before vs After Table */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
            <h3 className="font-display font-bold text-xs text-slate-800 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-slate-100">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Before vs After Recalculation metrics
            </h3>

            <div className="overflow-hidden border border-slate-150 rounded-xl text-xs">
              <div className="grid grid-cols-12 bg-slate-50 font-bold p-2.5 border-b border-slate-150 text-slate-500 uppercase tracking-wider text-[10px]">
                <div className="col-span-6">Metric Segment</div>
                <div className="col-span-3 text-center">Baseline</div>
                <div className="col-span-3 text-center text-indigo-700">Simulated</div>
              </div>
              
              <div className="grid grid-cols-12 p-3 border-b border-slate-100 font-medium">
                <div className="col-span-6 text-slate-800">Shortlist Chance</div>
                <div className="col-span-3 text-center font-mono text-slate-500">38%</div>
                <div className={`col-span-3 text-center font-mono font-bold ${isSimulated ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isSimulated ? '52%' : '38%'}
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-100 font-medium">
                <div className="col-span-6 text-slate-800">Skill Match Ratio</div>
                <div className="col-span-3 text-center font-mono text-slate-500">50%</div>
                <div className={`col-span-3 text-center font-mono font-bold ${isSimulated ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isSimulated ? '67%' : '50%'}
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-100 font-medium">
                <div className="col-span-6 text-slate-800">Missing Critical Skills</div>
                <div className="col-span-3 text-center font-mono text-slate-500">2</div>
                <div className={`col-span-3 text-center font-mono font-bold ${isSimulated ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isSimulated ? '1' : '2'}
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 border-b border-slate-100 font-medium">
                <div className="col-span-6 text-slate-800">Critical Skill Coverage</div>
                <div className="col-span-3 text-center font-mono text-slate-500">33%</div>
                <div className={`col-span-3 text-center font-mono font-bold ${isSimulated ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isSimulated ? '67%' : '33%'}
                </div>
              </div>

              <div className="grid grid-cols-12 p-3 font-medium">
                <div className="col-span-6 text-slate-800">Market Demand Coverage</div>
                <div className="col-span-3 text-center font-mono text-slate-500">45%</div>
                <div className={`col-span-3 text-center font-mono font-bold ${isSimulated ? 'text-emerald-600' : 'text-slate-400'}`}>
                  {isSimulated ? '63%' : '45%'}
                </div>
              </div>
            </div>

            {/* Explanation & JSON preview of active scenario */}
            {isSimulated && activeScenario && (
              <div className="space-y-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-150 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">LLM Feature Explanation</span>
                  <p className="text-slate-650 leading-relaxed text-[11px] font-sans">
                    {activeScenario.explanation}
                  </p>
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase font-bold text-slate-500 font-mono">Simulated JSON Payload Preview</span>
                    <span className="text-[9px] bg-slate-800 text-slate-450 text-indigo-400 px-1 rounded font-mono">LLM output payload</span>
                  </div>
                  <pre className="text-indigo-300 font-mono text-[10px] overflow-x-auto leading-relaxed whitespace-pre-wrap">
                    {JSON.stringify(activeScenario.json, null, 2)}
                  </pre>
                </div>
              </div>
            )}

            {/* Technical Note */}
            <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl flex items-start gap-2.5">
              <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-650 leading-relaxed font-sans">
                <p className="font-bold text-indigo-900">Architecture Technical Note</p>
                <p className="text-slate-600 mt-0.5">The LLM does not directly predict the probability. It only converts the user’s what-if question into JSON. The local machine learning model (XGBoost classifier) recalculates the new shortlist chance utilizing those newly mapped feature vectors.</p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
