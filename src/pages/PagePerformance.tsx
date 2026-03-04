import React from 'react';
import { Filter, ChevronDown, Info } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

const histogramData = [
  { range: '0-100ms', count: 120 },
  { range: '100-200ms', count: 450 },
  { range: '200-300ms', count: 890 },
  { range: '300-400ms', count: 1200 },
  { range: '400-500ms', count: 950 },
  { range: '500-600ms', count: 600 },
  { range: '600-700ms', count: 300 },
  { range: '700-800ms', count: 150 },
  { range: '800ms+', count: 80 },
];

export default function PagePerformance() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Page Performance Review</h1>
        <p className="text-text-secondary text-sm">Analyze page load times and core web vitals to identify optimization opportunities.</p>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex flex-wrap gap-4">
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Page</label>
          <div className="flex items-center justify-between bg-bg-main/50 px-3 py-2 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
            <span>Homepage (/)</span>
            <ChevronDown size={14} />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Metric</label>
          <div className="flex items-center justify-between bg-bg-main/50 px-3 py-2 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
            <span>Largest Contentful Paint (LCP)</span>
            <ChevronDown size={14} />
          </div>
        </div>
        <div className="flex flex-col gap-1.5 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Month-Year</label>
          <div className="flex items-center justify-between bg-bg-main/50 px-3 py-2 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
            <span>February 2024</span>
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Histogram Plot */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-black/5 flex items-center justify-between">
            <h2 className="font-bold text-lg">Distribution of LCP</h2>
            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>Good (&lt;2.5s)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Poor (&gt;4.0s)</span>
              </div>
            </div>
          </div>
          <div className="p-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={histogramData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="range" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {histogramData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index < 4 ? '#008a1c' : index < 7 ? '#135cb0' : '#d11947'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recommended Value Card */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col gap-4">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Recommended Metric Value</span>
            <div className="flex flex-col">
              <span className="text-4xl font-bold text-success">320ms</span>
              <span className="text-xs text-text-secondary font-medium">Target for 75th percentile</span>
            </div>
            <div className="h-1.5 w-full bg-bg-main rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Based on current traffic patterns, achieving a 320ms LCP would place this page in the top 10% of industry benchmarks.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-black/5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary">
              <Info size={18} />
              <span className="font-bold text-sm uppercase tracking-wider">Summary Insight</span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed italic">
              "LCP has improved by 12% compared to last month, largely due to the image optimization experiment (EXP-092). However, CLS remains high on mobile devices."
            </p>
            <button className="text-xs font-bold text-link hover:underline text-left">View Detailed Mobile Report</button>
          </div>
        </div>
      </div>
    </div>
  );
}
