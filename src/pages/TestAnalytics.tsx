import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FlaskConical, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../lib/utils';

const ACTIVE_TESTS = [
  {
    id: 'EXP-101',
    name: 'Home Page Hero Variant B',
    status: 'Running',
    confidence: '82%',
    runtime: '5 days',
    metrics: [
      { name: 'Conversion Rate', control: '2.4%', variant: '2.8%', lift: '+16.6%', sig: '82%', status: 'positive' },
      { name: 'Add to Cart', control: '8.1%', variant: '8.4%', lift: '+3.7%', sig: '65%', status: 'neutral' },
      { name: 'Bounce Rate', control: '42.1%', variant: '40.2%', lift: '-4.5%', sig: '78%', status: 'positive' },
    ]
  },
  {
    id: 'EXP-102',
    name: 'Sticky Add to Cart Button',
    status: 'Running',
    confidence: '94%',
    runtime: '12 days',
    metrics: [
      { name: 'Conversion Rate', control: '3.1%', variant: '3.5%', lift: '+12.9%', sig: '94%', status: 'positive' },
      { name: 'AOV', control: '$124', variant: '$126', lift: '+1.6%', sig: '45%', status: 'neutral' },
    ]
  },
  {
    id: 'EXP-104',
    name: 'Search Result Grid v List',
    status: 'Running',
    confidence: '45%',
    runtime: '2 days',
    metrics: [
      { name: 'Click-Through Rate', control: '12.4%', variant: '11.2%', lift: '-9.6%', sig: '52%', status: 'negative' },
    ]
  }
];

export default function TestAnalytics() {
  const [expandedId, setExpandedId] = useState<string | null>('EXP-101');

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Test Analytics</h1>
        <p className="text-text-secondary text-sm">Real-time performance tracking for all currently running experiments.</p>
      </div>

      <div className="flex flex-col gap-4">
        {ACTIVE_TESTS.map((test) => (
          <div 
            key={test.id} 
            className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden transition-all"
          >
            <div 
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-bg-main/20 transition-colors"
              onClick={() => setExpandedId(expandedId === test.id ? null : test.id)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-status-running/10 text-status-running rounded-lg flex items-center justify-center">
                  <FlaskConical size={20} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold text-lg">{test.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="font-medium">{test.id}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-status-running animate-pulse"></span>
                      {test.status}
                    </span>
                    <span>•</span>
                    <span>{test.runtime} elapsed</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Confidence</span>
                  <span className={cn(
                    "text-lg font-bold",
                    parseInt(test.confidence) > 90 ? "text-success" : "text-text-primary"
                  )}>
                    {test.confidence}
                  </span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={cn("text-text-secondary transition-transform", expandedId === test.id && "rotate-180")} 
                />
              </div>
            </div>

            {expandedId === test.id && (
              <div className="px-5 pb-5 pt-0 border-t border-black/5 animate-in slide-in-from-top-2 duration-300">
                <div className="mt-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Metric Comparison</h4>
                    <button className="text-xs font-bold text-link hover:underline">View Full Stats Engine</button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="text-text-secondary text-left border-b border-black/5">
                        <tr>
                          <th className="px-4 py-3 font-semibold">Metric</th>
                          <th className="px-4 py-3 font-semibold">Control</th>
                          <th className="px-4 py-3 font-semibold">Variant</th>
                          <th className="px-4 py-3 font-semibold">Lift</th>
                          <th className="px-4 py-3 font-semibold">Significance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5">
                        {test.metrics.map((metric, i) => (
                          <tr key={i} className="hover:bg-bg-main/10 transition-colors">
                            <td className="px-4 py-4 font-medium">{metric.name}</td>
                            <td className="px-4 py-4 text-text-secondary">{metric.control}</td>
                            <td className="px-4 py-4 font-bold">{metric.variant}</td>
                            <td className="px-4 py-4">
                              <div className={cn(
                                "flex items-center gap-1 font-bold",
                                metric.status === 'positive' && "text-success",
                                metric.status === 'negative' && "text-error",
                                metric.status === 'neutral' && "text-text-secondary"
                              )}>
                                {metric.status === 'positive' && <TrendingUp size={14} />}
                                {metric.status === 'negative' && <TrendingDown size={14} />}
                                {metric.status === 'neutral' && <Minus size={14} />}
                                {metric.lift}
                              </div>
                            </td>
                            <td className="px-4 py-4">
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-bg-main rounded-full overflow-hidden max-w-[60px]">
                                  <div 
                                    className={cn(
                                      "h-full rounded-full",
                                      parseInt(metric.sig) > 90 ? "bg-success" : "bg-text-secondary/30"
                                    )} 
                                    style={{ width: metric.sig }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium">{metric.sig}</span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-4 p-4 bg-bg-main/30 rounded-lg border border-black/5 flex items-start gap-3">
                    <div className="w-6 h-6 bg-white rounded-md border border-black/5 flex items-center justify-center text-primary flex-shrink-0">
                      <TrendingUp size={14} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold uppercase tracking-wider">Automated Insight</span>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        Variant B is showing strong positive signals for Conversion Rate. If current trends continue, we expect to reach 95% significance in approximately 3 days.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
