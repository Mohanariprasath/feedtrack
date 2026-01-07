
import React, { useState, useEffect } from 'react';
import { Feedback, FeedbackCategory, Sentiment, StaffInsight } from '../types';
import { apiService } from '../services/apiService';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie
} from 'recharts';
import {
  BarChart3, Users, MessageSquare, AlertCircle,
  Lightbulb, CheckCircle2, RefreshCw, Send,
  Filter, Loader2, Download
} from 'lucide-react';

interface StaffDashboardProps {
  feedbacks: Feedback[];
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({ feedbacks }) => {
  const [insights, setInsights] = useState<StaffInsight | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeCategory, setActiveCategory] = useState<FeedbackCategory | 'All'>('All');

  const filteredFeedbacks = activeCategory === 'All'
    ? feedbacks
    : feedbacks.filter(f => f.analysis?.category === activeCategory);

  const totalCount = feedbacks.length;
  const sentimentStats = {
    Positive: feedbacks.filter(f => f.analysis?.sentiment === Sentiment.POSITIVE).length,
    Neutral: feedbacks.filter(f => f.analysis?.sentiment === Sentiment.NEUTRAL).length,
    Negative: feedbacks.filter(f => f.analysis?.sentiment === Sentiment.NEGATIVE).length,
  };

  const categoryStats = Object.values(FeedbackCategory).map(cat => ({
    name: cat,
    count: feedbacks.filter(f => f.analysis?.category === cat).length
  }));

  const pieData = [
    { name: 'Positive', value: sentimentStats.Positive, color: '#10b981' },
    { name: 'Neutral', value: sentimentStats.Neutral, color: '#f59e0b' },
    { name: 'Negative', value: sentimentStats.Negative, color: '#f43f5e' },
  ];

  const handleGenerateInsights = async () => {
    if (feedbacks.length === 0) return;
    setIsAnalyzing(true);
    try {
      const data = await apiService.getStaffInsights();
      setInsights(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (feedbacks.length > 0 && !insights) {
      handleGenerateInsights();
    }
  }, [feedbacks.length]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<MessageSquare className="w-5 h-5" />} label="Total Feedback" value={totalCount.toString()} color="bg-indigo-600" />
        <StatCard icon={<Users className="w-5 h-5" />} label="Unique Students" value={new Set(feedbacks.map(f => f.studentId)).size.toString()} color="bg-emerald-600" />
        <StatCard icon={<AlertCircle className="w-5 h-5" />} label="Critical Issues" value={sentimentStats.Negative.toString()} color="bg-rose-600" />
        <StatCard icon={<CheckCircle2 className="w-5 h-5" />} label="Positive Score" value={totalCount ? `${Math.round((sentimentStats.Positive / totalCount) * 100)}%` : '0%'} color="bg-amber-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Category Distribution
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryStats}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                  <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900">Recent Feedbacks</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => apiService.downloadFeedbacks()}
                  className="flex items-center gap-2 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors"
                  title="Download Feedback Data"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value as any)}
                  className="text-sm bg-slate-50 border-none rounded-lg py-1 px-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="All">All Categories</option>
                  {Object.values(FeedbackCategory).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[600px]">
              {filteredFeedbacks.length === 0 ? (
                <p className="text-center py-12 text-slate-400">No feedbacks found.</p>
              ) : (
                filteredFeedbacks.map(fb => (
                  <div key={fb.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{fb.studentName}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${fb.analysis?.sentiment === Sentiment.POSITIVE ? 'bg-emerald-100 text-emerald-700' :
                          fb.analysis?.sentiment === Sentiment.NEGATIVE ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                        }`}>
                        {fb.analysis?.sentiment}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 mb-3 italic">"{fb.text}"</p>
                    <div className="flex gap-2 text-[10px]">
                      <span className="text-indigo-600 font-semibold bg-indigo-50 px-2 py-0.5 rounded-md">#{fb.analysis?.category}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-indigo-900 text-white p-6 rounded-2xl shadow-xl shadow-indigo-100 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">AI-Driven Insights</h3>
                <button onClick={handleGenerateInsights} disabled={isAnalyzing || feedbacks.length === 0}>
                  <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {isAnalyzing ? (
                <div className="space-y-4 py-8 text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-indigo-300" />
                  <p className="text-indigo-200 text-sm">Analyzing data on server...</p>
                </div>
              ) : insights ? (
                <div className="space-y-6 text-sm">
                  <section>
                    <h4 className="text-xs font-bold uppercase text-indigo-300 mb-2">Trends</h4>
                    <p>{insights.trends}</p>
                  </section>
                  <section>
                    <h4 className="text-xs font-bold uppercase text-indigo-300 mb-2">Issues</h4>
                    <ul className="space-y-1">
                      {insights.commonIssues.map((issue, i) => (
                        <li key={i} className="flex gap-2">• {issue}</li>
                      ))}
                    </ul>
                  </section>
                </div>
              ) : <div className="text-center py-12 text-indigo-300 text-sm">No insights generated.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string, color: string }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
    <div className={`${color} p-3 rounded-xl text-white`}>{icon}</div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </div>
);
