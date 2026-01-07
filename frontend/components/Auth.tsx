
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { apiService } from '../services/apiService';
import {
  GraduationCap,
  Users,
  ShieldCheck,
  ArrowRight,
  Mail,
  Lock,
  User as UserIcon,
  Loader2,
  AlertCircle,
  ChevronLeft,
  School,
  Building2
} from 'lucide-react';

interface AuthProps {
  onAuthSuccess: (user: User) => void;
}

type AuthMode = 'signin' | 'signup';

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        // Generating a random roll number if student to avoid unique constraint error since UI doesn't have it yet.
        // In a real app we should add a field for it.
        const user = await apiService.signup(name, email, selectedRole, password);
        onAuthSuccess(user);
      } else {
        const user = await apiService.signin(email, password);
        // Basic role check simulation
        if (user.role !== selectedRole) {
          throw new Error(`This account is registered as a ${user.role.toLowerCase()}. Please use the correct portal.`);
        }
        onAuthSuccess(user);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
  };

  const resetPortal = () => {
    setSelectedRole(null);
    setError('');
    setMode('signin');
  };

  // 1. Initial Portal Selection View
  if (!selectedRole) {
    return (
      <div className="max-w-4xl mx-auto mt-12 sm:mt-24 px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Welcome to FeedTrack
          </h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Please select your portal to continue with feedback collection or analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Student Portal Card */}
          <button
            onClick={() => setSelectedRole(UserRole.STUDENT)}
            className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-indigo-100 hover:border-indigo-200 text-left"
          >
            <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-indigo-600">
              <GraduationCap className="w-8 h-8 text-indigo-600 transition-colors group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Student Portal</h3>
            <p className="text-slate-500 mb-6">Submit feedback, track issues, and see how your voice improves the campus.</p>
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              Enter Portal <ArrowRight className="w-4 h-4" />
            </div>
          </button>

          {/* Staff Portal Card */}
          <button
            onClick={() => setSelectedRole(UserRole.STAFF)}
            className="group relative bg-white rounded-3xl p-8 shadow-xl shadow-slate-200 border border-slate-100 transition-all hover:-translate-y-2 hover:shadow-emerald-100 hover:border-emerald-200 text-left"
          >
            <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors group-hover:bg-emerald-600">
              <Users className="w-8 h-8 text-emerald-600 transition-colors group-hover:text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Staff Portal</h3>
            <p className="text-slate-500 mb-6">Analyze trends, generate AI insights, and respond to student concerns.</p>
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              Enter Portal <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    );
  }

  // 2. Focused Authentication View
  const isStudentPortal = selectedRole === UserRole.STUDENT;

  return (
    <div className="max-w-md mx-auto mt-12 sm:mt-16">
      <button
        onClick={resetPortal}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium mb-6 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to portal selection
      </button>

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200 border border-slate-100 p-8 overflow-hidden relative">
        {/* Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 ${isStudentPortal ? 'bg-indigo-600' : 'bg-emerald-600'}`} />

        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-4 ${isStudentPortal ? 'bg-indigo-50' : 'bg-emerald-50'}`}>
            {isStudentPortal ? (
              <School className={`w-10 h-10 text-indigo-600`} />
            ) : (
              <Building2 className={`w-10 h-10 text-emerald-600`} />
            )}
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isStudentPortal ? 'Student' : 'Staff'} {mode === 'signin' ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="text-slate-500 mt-2">
            Access your {selectedRole.toLowerCase()} dashboard
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
          <button
            onClick={() => { setMode('signin'); setError(''); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'signin'
                ? `bg-white shadow-sm ${isStudentPortal ? 'text-indigo-600' : 'text-emerald-600'}`
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('signup'); setError(''); }}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${mode === 'signup'
                ? `bg-white shadow-sm ${isStudentPortal ? 'text-indigo-600' : 'text-emerald-600'}`
                : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === 'signup' && (
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Full Name"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Email Address"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-3 rounded-xl flex items-center gap-2 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all group disabled:opacity-70 ${isStudentPortal ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                {mode === 'signin' ? 'Enter Portal' : 'Create Account'}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
