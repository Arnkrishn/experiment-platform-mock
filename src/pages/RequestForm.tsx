import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Calendar as CalendarIcon, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export default function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessCase: '',
    hypothesis: '',
    name: '',
    email: '',
    location: '',
    dueDate: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic would go here
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-success/10 text-success rounded-full flex items-center justify-center">
          <CheckCircle2 size={48} />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight">Request Submitted!</h2>
          <p className="text-text-secondary max-w-md">Your experiment request has been received. The research team will review it and get back to you within 48 hours.</p>
        </div>
        <button 
          onClick={() => setSubmitted(false)}
          className="mt-4 text-primary font-bold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Submit Experiment Request</h1>
        <p className="text-text-secondary text-sm">Provide the details for your proposed experiment. Our team will review the technical feasibility and strategic alignment.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Business Case</label>
            <textarea 
              required
              className="w-full h-32 bg-bg-main/50 border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              placeholder="What problem are we trying to solve? What is the potential business impact?"
              value={formData.businessCase}
              onChange={(e) => setFormData({...formData, businessCase: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Hypothesis</label>
            <textarea 
              required
              className="w-full h-24 bg-bg-main/50 border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              placeholder="If [action], then [outcome], because [reason]."
              value={formData.hypothesis}
              onChange={(e) => setFormData({...formData, hypothesis: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Requester Name</label>
              <input 
                required
                type="text" 
                className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Requester Email</label>
              <input 
                required
                type="email" 
                className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="email@company.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Location</label>
              <select 
                required
                className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
              >
                <option value="">Select URL / Page</option>
                <option value="homepage">Homepage (/)</option>
                <option value="product">Product Details (/p/*)</option>
                <option value="checkout">Checkout (/checkout)</option>
                <option value="search">Search Results (/search)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Due Date</label>
              <div className="relative">
                <input 
                  required
                  type="date" 
                  className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-black/5">
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <AlertCircle size={14} />
              <span>All fields are required for submission.</span>
            </div>
            <button 
              type="submit"
              className="bg-primary text-white px-8 py-3 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              <Send size={18} />
              Submit Request
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
