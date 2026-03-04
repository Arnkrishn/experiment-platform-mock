import React, { useState } from 'react';
import { Lightbulb, CheckCircle2, AlertCircle, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

export default function HypothesisCoach() {
  const [hypothesis, setHypothesis] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hypothesis.trim()) {
      setShowResult(true);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Hypothesis Coach</h1>
        <p className="text-text-secondary text-sm">Draft your experiment hypothesis and get instant feedback based on research best practices.</p>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <label className="text-xs font-bold text-text-secondary uppercase tracking-wider">Draft Hypothesis</label>
          <textarea 
            className="w-full h-32 bg-bg-main/50 border border-black/5 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            placeholder="e.g., If we change the button color to red, then more people will click it because it stands out more."
            value={hypothesis}
            onChange={(e) => setHypothesis(e.target.value)}
          />
          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            >
              Analyze Hypothesis
            </button>
          </div>
        </form>
      </div>

      {showResult && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Classification Card */}
            <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col items-center justify-center text-center gap-3">
              <div className="w-12 h-12 bg-success/10 text-success rounded-full flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Classification</span>
                <span className="text-2xl font-bold text-success">Strong</span>
              </div>
              <p className="text-xs text-text-secondary">Your hypothesis follows the standard "If [action], then [outcome], because [reason]" format.</p>
            </div>

            {/* Scorecard */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-black/5 bg-bg-main/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Rubric Scorecard</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-bg-main/30 text-text-secondary text-left">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Criteria</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                    <th className="px-4 py-2 font-semibold">Feedback</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  <tr>
                    <td className="px-4 py-3 font-medium">Testable</td>
                    <td className="px-4 py-3"><span className="text-success font-bold">Pass</span></td>
                    <td className="px-4 py-3 text-text-secondary">The outcome is measurable via CVR.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Specific</td>
                    <td className="px-4 py-3"><span className="text-success font-bold">Pass</span></td>
                    <td className="px-4 py-3 text-text-secondary">Clearly defines the change and target.</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium">Evidence-based</td>
                    <td className="px-4 py-3"><span className="text-status-running font-bold">Partial</span></td>
                    <td className="px-4 py-3 text-text-secondary">Consider citing previous research.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Rewrite Section */}
          <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-black/5 flex items-center justify-between">
              <h3 className="font-bold text-lg">Recommended Rewrite</h3>
              <button className="text-xs font-bold text-primary hover:underline">Copy to Clipboard</button>
            </div>
            <div className="p-6 bg-primary/5">
              <p className="text-lg font-medium text-text-primary italic leading-relaxed">
                "Based on previous heatmapping data showing low visibility of the primary CTA, if we change the button color to <span className="text-primary font-bold">#d11947</span>, then <span className="text-primary font-bold">Checkout Conversion Rate</span> will increase by <span className="text-primary font-bold">5%</span> because the increased visual contrast will reduce cognitive load during decision making."
              </p>
            </div>
          </div>

          {/* Detailed Feedback */}
          <div className="flex flex-col gap-4">
            <h3 className="font-bold text-lg">Detailed Feedback</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-black/5 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle2 size={18} />
                  <span className="font-bold text-sm">What's working</span>
                </div>
                <p className="text-sm text-text-secondary">Your "because" statement provides a clear psychological rationale for the expected behavior change.</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-black/5 shadow-sm flex flex-col gap-2">
                <div className="flex items-center gap-2 text-status-running">
                  <AlertCircle size={18} />
                  <span className="font-bold text-sm">Room for improvement</span>
                </div>
                <p className="text-sm text-text-secondary">Try to be more specific about the "outcome". Instead of "more people will click", use "CTR will increase by X%".</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
