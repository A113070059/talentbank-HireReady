import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, ShieldCheck, School } from 'lucide-react';

interface AuthPageProps {
  onLogin: (email: string, role: 'student' | 'employer' | 'university') => void;
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'employer' | 'university'>('student');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!email || !password) {
      setErrorMsg('Please populate all credential fields.');
      return;
    }

    if (isLogin) {
      let finalRole: 'student' | 'employer' | 'university' = 'student';
      
      const lowerEmail = email.toLowerCase().trim();
      if (
        lowerEmail.includes('school') || 
        lowerEmail.includes('edu') || 
        lowerEmail.includes('provost') || 
        lowerEmail.includes('professor') || 
        lowerEmail.includes('dean') || 
        lowerEmail.includes('university')
      ) {
        finalRole = 'university';
      } else if (
        lowerEmail.includes('recruiter') || 
        lowerEmail.includes('employer') || 
        lowerEmail.includes('hiring') || 
        lowerEmail.includes('hr') || 
        lowerEmail.includes('techcorp')
      ) {
        finalRole = 'employer';
      } else {
        finalRole = 'student';
      }
      
      onLogin(email, finalRole);
    } else {
      setSuccessMsg(`Account created successfully for ${email} as ${role === 'student' ? 'Student' : role === 'employer' ? 'Employer' : 'University Specialist'}!`);
      setTimeout(() => {
        onLogin(email, role);
      }, 1000);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl border border-slate-200/85 shadow-xl relative overflow-hidden">
        
        {/* Ambient top decoration */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-605" />
        
        <div className="text-center space-y-2">
          <div className="inline-flex bg-indigo-55/60 bg-indigo-50 p-3 rounded-2xl border border-indigo-100 mb-2">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="font-display font-black text-2xl tracking-tight text-slate-900 uppercase">
            {isLogin ? 'Sign Into HireReady' : 'Create Career OS Account'}
          </h2>
          <p className="text-xs text-slate-500">
            {isLogin 
              ? 'Enter email credentials to access your student, employer, or university workspace' 
              : 'Select your core network alignment node to start matching'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => { setIsLogin(true); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded ${isLogin ? 'bg-white text-indigo-705 shadow-sm font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            Existing Login
          </button>
          <button
            onClick={() => { setIsLogin(false); setErrorMsg(''); }}
            className={`flex-1 py-1.5 text-xs font-semibold rounded ${!isLogin ? 'bg-white text-indigo-705 shadow-sm font-bold' : 'text-slate-600 hover:text-indigo-600'}`}
          >
            Register New Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-100 rounded-lg text-xs text-rose-600 font-medium">
              🚨 {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-105 rounded-lg text-xs text-emerald-700 font-semibold">
              🎉 {successMsg}
            </div>
          )}

          {/* Role selector shown during Registration */}
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Choose Desired Workspace Role</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-all ${
                    role === 'student' 
                      ? 'bg-indigo-50 border-indigo-400 text-indigo-850' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  🎓 Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-all ${
                    role === 'employer' 
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-850' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  💼 Employer
                </button>
                <button
                  type="button"
                  onClick={() => setRole('university')}
                  className={`p-2.5 rounded-lg border text-xs font-bold text-center transition-all ${
                    role === 'university' 
                      ? 'bg-purple-50 border-purple-400 text-purple-850' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  🏫 University
                </button>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                required
                placeholder="e.g. testing@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white text-slate-705"
              />
            </div>

          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-405 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:bg-white text-slate-705"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase rounded-xl tracking-wider shadow-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>Gain Access</span>
          </button>
        </form>

      </div>
    </div>
  );
}
