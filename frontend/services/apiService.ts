
import { Feedback, StaffInsight, User, UserRole } from "../types";
import { analyzeFeedback, generateStaffInsights } from "./geminiService";

const API_BASE_URL = 'http://localhost:5000/api';
const LOCAL_STORAGE_KEY = 'feedtrack_local_db';
const USERS_STORAGE_KEY = 'feedtrack_users_db';

// Helper to simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to manage local fallback data
const getLocalData = (): Feedback[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalData = (feedbacks: Feedback[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(feedbacks));
};

const getLocalUsers = (): any[] => {
  const data = localStorage.getItem(USERS_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

const saveLocalUsers = (users: any[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const apiService = {
  /**
   * Real Auth: Signup
   */
  async signup(name: string, email: string, role: UserRole, password?: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        role,
        password,
        rollNumber: role === 'STUDENT' ? `R-${Math.floor(Math.random() * 100000)}` : undefined
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Signup failed');
    }

    const data = await response.json();
    return { ...data, id: data._id };
  },

  /**
   * Real Auth: Signin
   */
  async signin(email: string, password?: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || 'Login failed');
    }

    const data = await response.json();
    return { ...data, id: data._id };
  },

  /**
   * Submits feedback. Tries the backend first; if it fails, 
   * falls back to browser-side Gemini analysis and local storage.
   */
  async submitFeedback(text: string, studentId: string, studentName: string): Promise<Feedback> {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, studentId, studentName }),
      });

      if (response.ok) {
        const item = await response.json();
        // Map Backend Schema to Frontend Interface
        return {
          id: item._id,
          studentId: item.studentId,
          studentName: item.studentName,
          text: item.feedbackText,
          timestamp: item.createdAt,
          analysis: {
            category: item.category,
            sentiment: item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1).toLowerCase(),
            confidence: 80, // Mocked as not stored
            highlights: [], // Mocked as not stored
            summary: item.summary
          }
        } as any; // Cast to avoid strict type checks on Enum match for now
      }
      throw new Error('Server returned error');
    } catch (err) {
      console.warn("Backend offline. Falling back to Local AI analysis...");

      // Local Fallback Logic
      await delay(800); // Simulate network roundtrip
      const analysis = await analyzeFeedback(text);
      const newFeedback: Feedback = {
        id: Math.random().toString(36).substr(2, 9),
        studentId,
        studentName,
        text,
        timestamp: new Date().toISOString(),
        analysis,
      };

      const existing = getLocalData();
      saveLocalData([newFeedback, ...existing]);
      return newFeedback;
    }
  },

  /**
   * Fetches all feedback. Tries backend, then localStorage.
   */
  async getAllFeedbacks(): Promise<Feedback[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/feedback/all`);
      if (response.ok) {
        const data = await response.json();
        return data.map((item: any) => ({
          id: item._id,
          studentId: item.studentId,
          studentName: item.studentName,
          text: item.feedbackText,
          timestamp: item.createdAt,
          analysis: {
            category: item.category,
            sentiment: item.sentiment ? (item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1).toLowerCase()) : 'Neutral',
            confidence: 80,
            highlights: [],
            summary: item.summary
          }
        }));
      }
      throw new Error('Server returned error');
    } catch (err) {
      console.warn("Backend offline. Loading from Local Storage.");
      return getLocalData();
    }
  },

  /**
   * Generates insights. Tries backend, then calls Gemini directly.
   */
  async getStaffInsights(): Promise<StaffInsight> {
    try {
      const response = await fetch(`${API_BASE_URL}/insights`, {
        method: 'POST',
      });
      if (response.ok) return await response.json();
      throw new Error('Server returned error');
    } catch (err) {
      console.warn("Backend offline. Generating insights using client-side AI.");
      const feedbacks = getLocalData();
      return await generateStaffInsights(feedbacks);
    }
  }
};
