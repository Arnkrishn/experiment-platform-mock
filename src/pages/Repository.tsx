import React, { useState } from 'react';
import { Search, Filter, ChevronDown, ExternalLink, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

const EXPERIMENTS = [
  {
    id: 'EXP-102',
    title: 'Checkout Flow Redesign',
    hypothesis: 'By reducing the number of fields in the checkout form from 12 to 6, we will decrease friction and increase conversion rate by 5%.',
    location: 'Checkout Page',
    requestor: 'Sarah Jenkins',
    status: 'Success',
    date: 'Feb 24, 2024'
  },
  {
    id: 'EXP-101',
    title: 'Home Page Hero Variant B',
    hypothesis: 'Using a lifestyle image instead of a product-only image will increase engagement with the primary CTA by 10%.',
    location: 'Homepage',
    requestor: 'Mark Thompson',
    status: 'Running',
    date: 'Feb 22, 2024'
  },
  {
    id: 'EXP-100',
    title: 'Search Algorithm v2',
    hypothesis: 'Implementing semantic search will improve search result relevance and increase add-to-cart from search by 3%.',
    location: 'Search Results',
    requestor: 'David Chen',
    status: 'Loss',
    date: 'Feb 15, 2024'
  },
  {
    id: 'EXP-099',
    title: 'Mobile Navigation Update',
    hypothesis: 'Moving the search bar to the bottom of the screen on mobile will improve reachability and increase search usage.',
    location: 'Global Mobile',
    requestor: 'Elena Rodriguez',
    status: 'Neutral',
    date: 'Feb 10, 2024'
  }
];

export default function Repository() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold tracking-tight">Experiment Repository</h1>
        
        {/* Search and Filters */}
        <div className="bg-white p-4 rounded-xl border border-black/5 shadow-sm flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search by keyword, hypothesis, or experiment ID..." 
              className="w-full bg-bg-main/50 border border-black/5 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-bg-main/50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
              <Filter size={14} />
              <span>Date Range: Last Quarter</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-2 bg-bg-main/50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
              <span>Location: All</span>
              <ChevronDown size={14} />
            </div>
            <div className="flex items-center gap-2 bg-bg-main/50 px-3 py-1.5 rounded-lg border border-black/5 text-sm font-medium cursor-pointer hover:bg-bg-main transition-colors">
              <span>Status: All</span>
              <ChevronDown size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="flex flex-col gap-4">
        {EXPERIMENTS.length > 0 ? (
          EXPERIMENTS.map((exp) => (
            <div 
              key={exp.id} 
              className="bg-white rounded-xl border border-black/5 shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              <div 
                className="p-5 flex items-start justify-between cursor-pointer"
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
              >
                <div className="flex flex-col gap-2 flex-1 pr-8">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg text-link hover:underline">{exp.title}</h3>
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
                  <p className="text-sm text-text-secondary line-clamp-2 italic">
                    "{exp.hypothesis}"
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                      <span className="bg-bg-main px-2 py-0.5 rounded border border-black/5">{exp.location}</span>
                    </div>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary font-medium">Requested by {exp.requestor}</span>
                    <span className="text-xs text-text-secondary">•</span>
                    <span className="text-xs text-text-secondary">{exp.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-text-secondary hover:text-primary transition-colors p-2 rounded-lg hover:bg-bg-main">
                    <ExternalLink size={18} />
                  </button>
                  <ChevronRight 
                    size={20} 
                    className={cn("text-text-secondary transition-transform", expandedId === exp.id && "rotate-90")} 
                  />
                </div>
              </div>

              {expandedId === exp.id && (
                <div className="px-5 pb-5 pt-0 border-t border-black/5 bg-bg-main/20">
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Mockup Preview</h4>
                      <div className="aspect-video bg-white rounded-lg border border-black/5 flex items-center justify-center text-text-secondary text-sm italic">
                        Visual mockup preview loading...
                      </div>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-text-secondary">Key Insights</h4>
                      <ul className="text-sm text-text-primary space-y-2">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                          <span>Statistical significance reached after 11 days.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                          <span>Primary metric (CVR) saw a 4.2% lift with 98% confidence.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5"></div>
                          <span>No negative impact on secondary metrics (AOV, Bounce Rate).</span>
                        </li>
                      </ul>
                      <button className="mt-2 text-sm font-bold text-link hover:underline flex items-center gap-1">
                        View Full Test Plan & Results
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-xl border border-black/5 shadow-sm flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 bg-bg-main rounded-full flex items-center justify-center text-text-secondary">
              <Search size={32} />
            </div>
            <h3 className="font-bold text-lg">No experiments found</h3>
            <p className="text-sm text-text-secondary max-w-xs">Try adjusting your filters or search query to find what you're looking for.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-text-secondary">Showing 1-4 of 102 experiments</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white border border-black/5 rounded-lg text-sm font-medium disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 bg-white border border-black/5 rounded-lg text-sm font-medium hover:bg-bg-main">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
