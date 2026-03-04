import React from 'react';
import { 
  Plus, 
  Search, 
  Wrench, 
  TrendingUp, 
  FlaskConical, 
  Target, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { ViewType } from '../types';
import { cn } from '../lib/utils';

const KPI_CARDS = [
  { label: 'Ideas Submitted', value: '124', change: '+12%', trend: 'up' },
  { label: 'Experiments (Q1)', value: '42', change: '+5%', trend: 'up' },
  { label: 'Win Rate %', value: '38%', change: '-2%', trend: 'down' },
  { label: 'Goal Alignment', value: '92%', change: '+8%', trend: 'up' },
  { label: 'Avg. Runtime', value: '14d', change: '0', trend: 'neutral' },
];

const RECENT_EXPERIMENTS = [
  { id: 'EXP-102', title: 'Checkout Flow Redesign', status: 'Success', date: '2h ago' },
  { id: 'EXP-101', title: 'Home Page Hero Variant B', status: 'Running', date: '5h ago' },
  { id: 'EXP-100', title: 'Search Algorithm v2', status: 'Loss', date: '1d ago' },
  { id: 'EXP-099', title: 'Mobile Navigation Update', status: 'Neutral', date: '2d ago' },
  { id: 'EXP-098', title: 'Email Subject Line Optimization', status: 'Success', date: '3d ago' },
];

export default function HomeDashboard({ setView }: { setView: (v: ViewType) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex gap-3">
          <button 
            onClick={() => setView('tools-request')}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus size={18} />
            Submit Request
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {KPI_CARDS.map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-black/5 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">{kpi.label}</span>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{kpi.value}</span>
              {kpi.trend !== 'neutral' && (
                <div className={cn(
                  "flex items-center text-xs font-bold px-1.5 py-0.5 rounded",
                  kpi.trend === 'up' ? "text-success bg-success/10" : "text-error bg-error/10"
                )}>
                  {kpi.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {kpi.change}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* What Is Live Snapshot */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-black/5 flex items-center justify-between">
            <h2 className="font-bold text-lg">What Is Live</h2>
            <button 
              onClick={() => setView('reporting-live')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View Full Gantt
            </button>
          </div>
          <div className="p-5 flex flex-col gap-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Product Page Optimization</span>
                  <span className="text-xs text-text-secondary">Day 8 of 14</span>
                </div>
                <div className="h-2 w-full bg-bg-main rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000" 
                    style={{ width: `${(i + 1) * 25}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="mt-2 p-4 bg-bg-main/50 rounded-lg border border-dashed border-black/10 flex items-center justify-center text-sm text-text-secondary italic">
              +4 more active experiments
            </div>
          </div>
        </div>

        {/* Recent Experiments */}
        <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-black/5 flex items-center justify-between">
            <h2 className="font-bold text-lg">Recent Experiments</h2>
            <button 
              onClick={() => setView('repository')}
              className="text-xs font-bold text-primary hover:underline"
            >
              View Repository
            </button>
          </div>
          <div className="divide-y divide-black/5">
            {RECENT_EXPERIMENTS.map((exp) => (
              <div key={exp.id} className="p-4 flex items-center justify-between hover:bg-bg-main/30 transition-colors cursor-pointer group">
                <div className="flex flex-col">
                  <span className="text-sm font-bold group-hover:text-primary transition-colors">{exp.title}</span>
                  <span className="text-xs text-text-secondary">{exp.id} • {exp.date}</span>
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                  exp.status === 'Success' && "bg-success/10 text-success",
                  exp.status === 'Running' && "bg-status-running/10 text-status-running",
                  exp.status === 'Loss' && "bg-error/10 text-error",
                  exp.status === 'Neutral' && "bg-text-secondary/10 text-text-secondary",
                )}>
                  {exp.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4">
        <h2 className="font-bold text-lg">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setView('tools-request')}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-black/5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Plus size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Submit Request</span>
              <span className="text-sm text-text-secondary">Start a new experiment or research project</span>
            </div>
          </button>

          <button 
            onClick={() => setView('repository')}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-black/5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Search size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Search Repository</span>
              <span className="text-sm text-text-secondary">Explore past learnings and insights</span>
            </div>
          </button>

          <button 
            onClick={() => setView('tools-sample-size')}
            className="flex items-center gap-4 p-6 bg-white rounded-xl border border-black/5 shadow-sm hover:border-primary/30 hover:shadow-md transition-all group text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Wrench size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Open Tools</span>
              <span className="text-sm text-text-secondary">Access calculators and coaching tools</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
