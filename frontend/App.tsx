
import React, { useState, useEffect } from 'react';
import { User, UserRole, Feedback } from './types';
import { Layout } from './components/Layout';
import { Auth } from './components/Auth';
import { StudentDashboard } from './components/StudentDashboard';
import { StaffDashboard } from './components/StaffDashboard';
import { apiService } from './services/apiService';
import { GraduationCap, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load existing user session
    const savedUser = localStorage.getItem('feedtrack_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    
    const initializeData = async () => {
      try {
        // This handles fallback internally within apiService
        const data = await apiService.getAllFeedbacks();
        setFeedbacks(data);
      } catch (err) {
        console.error("Critical failure during initialization", err);
      } finally {
        // Slight delay for smooth entrance
        setTimeout(() => setIsLoading(false), 800);
      }
    };

    initializeData();
  }, []);

  const handleAuthSuccess = (user: User) => {
    setUser(user);
    localStorage.setItem('feedtrack_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('feedtrack_user');
  };

  const handleAddFeedback = (feedback: Feedback) => {
    setFeedbacks(prev => [feedback, ...prev]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 blur-2xl opacity-20 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-2xl shadow-slate-200 mb-6 flex items-center justify-center">
            <GraduationCap className="w-12 h-12 text-indigo-600 animate-bounce" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
          <p className="text-slate-600 font-semibold tracking-tight">
            Syncing FeedTrack...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      {!user ? (
        <Auth onAuthSuccess={handleAuthSuccess} />
      ) : user.role === UserRole.STUDENT ? (
        <StudentDashboard 
          user={user} 
          feedbacks={feedbacks} 
          onAddFeedback={handleAddFeedback} 
        />
      ) : (
        <StaffDashboard feedbacks={feedbacks} />
      )}
    </Layout>
  );
};

export default App;
