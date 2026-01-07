
import React, { useState } from 'react';
import { Feedback, User } from '../types';
import { apiService } from '../services/apiService';
import { MessageSquarePlus, Clock, CheckCircle, Info, Sparkles, Loader2 } from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  feedbacks: Feedback[];
  onAddFeedback: (feedback: Feedback) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, feedbacks, onAddFeedback }) => {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length < 10) {
      setError('Please provide at least 10 characters of feedback.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      // API now handles both analysis and DB saving
      const newFeedback = await apiService.submitFeedback(text, user.id, user.name);
      onAddFeedback(newFeedback);
      setText('');
    } catch (err: any) {
      console.error("Feedback Submission Error:", err);
      if (err.message === "AI Analysis Failed" || err.message.includes("API key")) {
        setError('Backend unavailable and Local AI fallback failed. Please check your GEMINI_API_KEY in .env.local');
      } else {
        // Show the actual error message from the service (e.g. "Model gemini-2.0... failed: 429")
        setError(err.message || 'Failed to submit feedback. Backend is offline and local fallback encountered an error.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const myFeedbacks = feedbacks.filter(f => f.studentId === user.id).sort((a, b) =>
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
              <MessageSquarePlus className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Submit New Feedback</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What's on your mind?
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                placeholder="Tell us about teaching, facilities, labs, etc..."
                disabled={isSubmitting}
              />
              <p className="mt-2 text-xs text-slate-500">
                AI will automatically categorize and summarize your feedback.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 flex items-start gap-2">
                <Info className="w-4 h-4 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isSubmitting
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200'
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending to Server...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Your Feedback History</h2>
          </div>
          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {myFeedbacks.length} Entries
          </span>
        </div>

        <div className="space-y-4">
          {myFeedbacks.length === 0 ? (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-slate-400">You haven't submitted any feedback yet.</p>
            </div>
          ) : (
            myFeedbacks.map((fb) => (
              <div key={fb.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-300 transition-colors">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {new Date(fb.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-600 uppercase">
                        {fb.analysis?.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-slate-700 leading-relaxed mb-4 italic">"{fb.text}"</p>

                  {fb.analysis && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm font-semibold text-slate-900">AI Processing Result</span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2"><strong>Summary:</strong> {fb.analysis.summary}</p>
                      <div className="flex flex-wrap gap-1">
                        {fb.analysis.highlights.map((h, i) => (
                          <span key={i} className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded-md text-slate-500">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
