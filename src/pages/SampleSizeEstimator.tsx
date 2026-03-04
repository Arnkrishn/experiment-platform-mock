import React, { useState } from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const data = [
  { day: 1, sample: 1000 },
  { day: 5, sample: 5000 },
  { day: 10, sample: 10000 },
  { day: 14, sample: 14000 },
  { day: 20, sample: 20000 },
  { day: 25, sample: 25000 },
  { day: 30, sample: 30000 },
];

export default function SampleSizeEstimator() {
  const [baseline, setBaseline] = useState(2.5);
  const [traffic, setTraffic] = useState(100000);
  const [lift, setLift] = useState(5);
  const [confidence, setConfidence] = useState(95);
  const [power, setPower] = useState(80);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold tracking-tight">Sample Size Estimator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Inputs Panel */}
        <div className="lg:col-span-4 bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-black/5 bg-bg-main/10">
            <h2 className="font-bold text-sm uppercase tracking-wider text-text-secondary">Inputs</h2>
          </div>
          <div className="p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text-secondary uppercase">Baseline Metric</label>
              <select className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                <option>Conversion Rate (CVR)</option>
                <option>Click-Through Rate (CTR)</option>
                <option>Add to Cart Rate</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Baseline Value (%)</label>
                <input 
                  type="number" 
                  value={baseline} 
                  onChange={(e) => setBaseline(Number(e.target.value))}
                  className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase">30-Day Traffic</label>
                <input 
                  type="number" 
                  value={traffic} 
                  onChange={(e) => setTraffic(Number(e.target.value))}
                  className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Estimated Lift (%)</label>
                <input 
                  type="number" 
                  value={lift} 
                  onChange={(e) => setLift(Number(e.target.value))}
                  className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-text-secondary uppercase">Variations</label>
                <input 
                  type="number" 
                  defaultValue={2}
                  className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-text-secondary uppercase">Confidence Level: {confidence}%</label>
              </div>
              <input 
                type="range" 
                min="80" 
                max="99" 
                value={confidence} 
                onChange={(e) => setConfidence(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-text-secondary uppercase">Statistical Power: {power}%</label>
              </div>
              <input 
                type="range" 
                min="70" 
                max="95" 
                value={power} 
                onChange={(e) => setPower(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>

            <div className="flex items-center gap-2 p-3 bg-link/5 rounded-lg border border-link/10 text-xs text-link">
              <Info size={14} />
              <span>Higher confidence requires larger sample sizes.</span>
            </div>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-white p-8 rounded-xl border border-black/5 shadow-sm flex flex-col items-center justify-center text-center gap-2">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Required Sample Size</span>
            <span className="text-5xl font-bold text-primary">14,280</span>
            <span className="text-sm text-text-secondary font-medium">Unique visitors per variation</span>
          </div>

          <div className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden flex flex-col flex-1">
            <div className="p-5 border-b border-black/5 flex items-center justify-between">
              <h2 className="font-bold text-lg">Estimated Runtime</h2>
              <div className="flex items-center gap-2 text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">
                <span>14 Days Required</span>
              </div>
            </div>
            <div className="p-6 flex-1 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    label={{ value: 'Days', position: 'insideBottom', offset: -5, fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <ReferenceLine x={14} stroke="#d11947" strokeDasharray="3 3" label={{ value: 'Target', position: 'top', fill: '#d11947', fontSize: 10 }} />
                  <Line 
                    type="monotone" 
                    dataKey="sample" 
                    stroke="#135cb0" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#135cb0' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
