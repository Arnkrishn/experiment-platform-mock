import React, { useState } from 'react';
import { Sparkles, Copy, Send, Lightbulb, Loader2, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function HypothesisGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowOutput(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Hypothesis Generator</h1>
        <p className="text-text-secondary text-sm">Transform your ideas or problem statements into structured, testable experiment hypotheses.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-black/5 bg-bg-main/10">
              <h2 className="font-bold text-xs uppercase tracking-wider text-text-secondary">Structured Inputs</h2>
            </div>
            <div className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Page / Location</label>
                  <select className="bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Homepage</option>
                    <option>Product Page</option>
                    <option>Checkout</option>
                    <option>Search Results</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">User Segment</label>
                  <select className="bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>All Users</option>
                    <option>New Users</option>
                    <option>Returning Users</option>
                    <option>Mobile Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Goal Metric</label>
                  <select className="bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Conversion Rate</option>
                    <option>Add to Cart</option>
                    <option>AOV</option>
                    <option>Retention</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Change Type</label>
                  <select className="bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Messaging</option>
                    <option>Layout</option>
                    <option>CTA</option>
                    <option>Pricing</option>
                    <option>Visual Design</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Element to Change</label>
                  <select className="bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>CTA Button</option>
                    <option>Banner</option>
                    <option>Headline</option>
                    <option>Form</option>
                    <option>Pricing Table</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Nature of Change</label>
                  <select className="bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option>Add</option>
                    <option>Remove</option>
                    <option>Simplify</option>
                    <option>Highlight</option>
                    <option>Reposition</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Idea / Problem Statement</label>
                <textarea 
                  className="w-full h-24 bg-bg-main/50 border border-black/5 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
                  placeholder="Describe the insight or problem you've observed..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Supporting Evidence</label>
                <div className="flex flex-wrap gap-2">
                  {['User Research', 'Heatmap Insights', 'Analytics Drop-off', 'Customer Feedback'].map(tag => (
                    <button key={tag} className="px-2 py-1 bg-bg-main border border-black/5 rounded text-[10px] font-medium hover:bg-white transition-colors">
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="mt-2 bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                Generate Hypotheses
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {!showOutput && !isGenerating && (
            <div className="h-full bg-white rounded-xl border border-black/5 border-dashed flex flex-col items-center justify-center text-center p-12 gap-4">
              <div className="w-16 h-16 bg-bg-main rounded-full flex items-center justify-center text-text-secondary">
                <Sparkles size={32} />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg">Ready to generate</h3>
                <p className="text-sm text-text-secondary max-w-xs">Fill out the inputs on the left to generate structured hypotheses for your next experiment.</p>
              </div>
            </div>
          )}

          {isGenerating && (
            <div className="h-full bg-white rounded-xl border border-black/5 flex flex-col items-center justify-center p-12 gap-4">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-sm font-medium text-text-secondary animate-pulse">Synthesizing research and generating hypotheses...</p>
            </div>
          )}

          {showOutput && !isGenerating && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-primary/5 px-2 py-0.5 rounded">Hypothesis Option {i}</span>
                      <div className="flex gap-2">
                        <button className="p-1.5 text-text-secondary hover:text-primary transition-colors"><Copy size={16} /></button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <p className="text-base font-medium leading-relaxed">
                        <span className="text-primary font-bold italic">If</span> we simplify the checkout form by removing optional fields, 
                        <span className="text-primary font-bold italic"> then</span> Conversion Rate will increase by 4% 
                        <span className="text-primary font-bold italic"> because</span> reducing cognitive load decreases abandonment during the final step.
                      </p>
                    </div>

                    <div className="p-4 bg-bg-main/30 rounded-lg border border-black/5 flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Lightbulb size={14} />
                        <span className="text-xs font-bold uppercase tracking-wider">Causal Mechanism</span>
                      </div>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        The "Hick's Law" principle suggests that the time it takes to make a decision increases with the number and complexity of choices. By removing optional fields, we reduce the total number of decisions a user must make.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Suggested Variants</span>
                      <div className="flex gap-3">
                        <div className="flex-1 p-2 bg-white border border-black/5 rounded text-xs font-medium text-center">Control (Current)</div>
                        <div className="flex-1 p-2 bg-primary/5 border border-primary/20 rounded text-xs font-bold text-center text-primary">Variant A: 6 Fields</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-2 pt-4 border-t border-black/5">
                      <button className="flex-1 bg-bg-main hover:bg-bg-main/80 text-text-primary py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                        Send to Coach
                      </button>
                      <button className="flex-1 bg-primary text-white py-2 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2">
                        <Send size={14} />
                        Submit Request
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
