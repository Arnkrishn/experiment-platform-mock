import React, { useState } from 'react';
import { Filter, ChevronDown, TrendingUp, Users, Clock, CheckCircle2, Trello } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const velocityData = [
  { week: 'W1', completed: 12, planned: 15 },
  { week: 'W2', completed: 18, planned: 15 },
  { week: 'W3', completed: 14, planned: 15 },
  { week: 'W4', completed: 22, planned: 20 },
  { week: 'W5', completed: 19, planned: 20 },
  { week: 'W6', completed: 25, planned: 20 },
];

const throughputData = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 8 },
  { day: 'Fri', count: 6 },
];

export default function JiraReporting() {
  const [activeTab, setActiveTab] = useState('velocity');

  const tabs = [
    { id: 'velocity', label: 'Velocity' },
    { id: 'throughput', label: 'Throughput' },
    { id: 'dependencies', label: 'Dependencies' },
    { id: 'work-plate', label: 'Work Plate' },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Jira Reporting</h1>
        <p className="text-text-secondary text-sm">Track team productivity, delivery speed, and project health across all active boards.</p>
      </div>

      {/* Global Filters */}
      <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 bg-bg-main/50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
          <Filter size={14} />
          <span>Board: Experimentation Team</span>
          <ChevronDown size={14} />
        </div>
        <div className="flex items-center gap-2 bg-bg-main/50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
          <span>Sprint: Current (S24)</span>
          <ChevronDown size={14} />
        </div>
        <div className="flex items-center gap-2 bg-bg-main/50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors ml-auto">
          <span>Last 30 Days</span>
          <ChevronDown size={14} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-black/5 gap-8 px-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "pb-3 text-sm font-bold transition-all relative",
              activeTab === tab.id ? "text-primary" : "text-text-secondary hover:text-text-primary"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" 
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex flex-col gap-6">
        {activeTab === 'velocity' && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Avg. Velocity</span>
                <span className="text-2xl font-bold">18.5</span>
                <span className="text-xs text-success font-medium flex items-center gap-1">
                  <TrendingUp size={12} /> +2.4 from last sprint
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Predictability</span>
                <span className="text-2xl font-bold">92%</span>
                <span className="text-xs text-text-secondary font-medium">Target: 85%</span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Cycle Time</span>
                <span className="text-2xl font-bold">4.2d</span>
                <span className="text-xs text-error font-medium flex items-center gap-1">
                  <Clock size={12} /> +0.5d delay
                </span>
              </div>
              <div className="bg-white p-5 rounded-xl border border-black/5 shadow-sm flex flex-col gap-1">
                <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Rollover Rate</span>
                <span className="text-2xl font-bold">8%</span>
                <span className="text-xs text-success font-medium flex items-center gap-1">
                  <CheckCircle2 size={12} /> -5% improvement
                </span>
              </div>
            </div>

            {/* Velocity Chart */}
            <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-black/5 flex items-center justify-between">
                <h2 className="font-bold text-lg">Velocity Trend</h2>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-link"></div>
                    <span>Completed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded bg-bg-main border border-black/10"></div>
                    <span>Planned</span>
                  </div>
                </div>
              </div>
              <div className="p-6 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={velocityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="completed" fill="#135cb0" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="planned" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-black/5 bg-bg-main/10">
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Sprint Breakdown</h3>
              </div>
              <table className="w-full text-sm">
                <thead className="bg-bg-main/30 text-text-secondary text-left">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Sprint</th>
                    <th className="px-6 py-3 font-semibold">Status</th>
                    <th className="px-6 py-3 font-semibold">Planned</th>
                    <th className="px-6 py-3 font-semibold">Completed</th>
                    <th className="px-6 py-3 font-semibold">Rollover</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {[1, 2, 3].map((_, i) => (
                    <tr key={i} className="hover:bg-bg-main/20 transition-colors">
                      <td className="px-6 py-4 font-bold">Sprint {24 - i}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                          i === 0 ? "bg-status-running/10 text-status-running" : "bg-success/10 text-success"
                        )}>
                          {i === 0 ? 'Active' : 'Closed'}
                        </span>
                      </td>
                      <td className="px-6 py-4">20 pts</td>
                      <td className="px-6 py-4">{20 - (i * 2)} pts</td>
                      <td className="px-6 py-4 text-text-secondary">{i * 2} pts</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'velocity' && (
          <div className="bg-white p-20 rounded-xl border border-black/5 shadow-sm flex flex-col items-center justify-center text-center gap-3 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-bg-main rounded-full flex items-center justify-center text-text-secondary">
              <Trello size={32} />
            </div>
            <h3 className="font-bold text-lg">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h3>
            <p className="text-sm text-text-secondary max-w-xs">This reporting module is currently being populated with live Jira data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
