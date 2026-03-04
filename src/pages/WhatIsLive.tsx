import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const PAGES = ['Homepage', 'Product Details', 'Checkout', 'Search Results', 'Global Mobile', 'Cart Page'];
const MONTHS = ['Feb 1', 'Feb 5', 'Feb 10', 'Feb 15', 'Feb 20', 'Feb 25', 'Mar 1'];

const EXPERIMENTS = [
  { id: 1, page: 'Homepage', start: 0, duration: 15, status: 'Success', title: 'Hero Variant B' },
  { id: 2, page: 'Product Details', start: 5, duration: 20, status: 'Running', title: 'Sticky ATC' },
  { id: 3, page: 'Checkout', start: 10, duration: 10, status: 'Neutral', title: 'Field Reduction' },
  { id: 4, page: 'Search Results', start: 15, duration: 12, status: 'Running', title: 'Semantic Search' },
  { id: 5, page: 'Global Mobile', start: 2, duration: 25, status: 'Success', title: 'Bottom Nav' },
  { id: 6, page: 'Cart Page', start: 18, duration: 10, status: 'Running', title: 'Upsell Modal' },
];

export default function WhatIsLive() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">What Is Live</h1>
          <p className="text-text-secondary text-sm">Real-time visualization of all active and recently completed experiments across the platform.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-1 rounded-lg border border-black/5 shadow-sm">
          <button className="p-2 hover:bg-bg-main rounded-md transition-colors"><ChevronLeft size={18} /></button>
          <div className="flex items-center gap-2 px-2 text-sm font-bold">
            <Calendar size={16} className="text-primary" />
            <span>February 2024</span>
          </div>
          <button className="p-2 hover:bg-bg-main rounded-md transition-colors"><ChevronRight size={18} /></button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col flex-1">
        {/* Gantt Header */}
        <div className="flex border-b border-black/5">
          <div className="w-48 p-4 border-r border-black/5 bg-bg-main/10 flex items-center font-bold text-xs uppercase tracking-wider text-text-secondary">
            Page / Location
          </div>
          <div className="flex-1 flex">
            {MONTHS.map((month, i) => (
              <div key={i} className="flex-1 p-4 text-center text-xs font-bold text-text-secondary border-r border-black/5 last:border-r-0">
                {month}
              </div>
            ))}
          </div>
        </div>

        {/* Gantt Body */}
        <div className="flex-1 overflow-y-auto">
          {PAGES.map((page, i) => {
            const pageExps = EXPERIMENTS.filter(e => e.page === page);
            return (
              <div key={i} className="flex border-b border-black/5 last:border-b-0 group">
                <div className="w-48 p-4 border-r border-black/5 bg-bg-main/5 font-bold text-sm group-hover:bg-bg-main/10 transition-colors">
                  {page}
                </div>
                <div className="flex-1 relative h-16 bg-white flex">
                  {/* Grid Lines */}
                  {MONTHS.map((_, j) => (
                    <div key={j} className="flex-1 border-r border-black/5 last:border-r-0 h-full"></div>
                  ))}
                  
                  {/* Experiment Bars */}
                  {pageExps.map((exp) => (
                    <div 
                      key={exp.id}
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 h-8 rounded-lg border shadow-sm flex items-center px-3 cursor-pointer hover:scale-[1.02] transition-all z-10",
                        exp.status === 'Success' && "bg-success/10 border-success/20 text-success",
                        exp.status === 'Running' && "bg-status-running/10 border-status-running/20 text-status-running",
                        exp.status === 'Neutral' && "bg-text-secondary/10 border-text-secondary/20 text-text-secondary",
                      )}
                      style={{ 
                        left: `${(exp.start / 30) * 100}%`, 
                        width: `${(exp.duration / 30) * 100}%` 
                      }}
                    >
                      <span className="text-xs font-bold truncate">{exp.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Gantt Footer / Legend */}
        <div className="p-4 bg-bg-main/10 border-t border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-success/20 border border-success/30"></div>
              <span className="text-xs font-medium text-text-secondary">Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-status-running/20 border border-status-running/30"></div>
              <span className="text-xs font-medium text-text-secondary">Running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-text-secondary/20 border border-text-secondary/30"></div>
              <span className="text-xs font-medium text-text-secondary">Neutral / Loss</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-text-secondary italic">
            <Info size={14} />
            <span>Click any bar to view experiment details</span>
          </div>
        </div>
      </div>
    </div>
  );
}
