import React, { useState } from 'react';
import { 
  Home, 
  Database, 
  Wrench, 
  BarChart3, 
  Search, 
  ChevronRight, 
  Plus, 
  LayoutDashboard,
  Calculator,
  Lightbulb,
  FileText,
  Activity,
  Trello,
  Calendar,
  FlaskConical,
  Bell,
  User,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { ViewType } from './types';

// Page Components
import HomeDashboard from './pages/HomeDashboard';
import Repository from './pages/Repository';
import HypothesisGenerator from './pages/HypothesisGenerator';
import SampleSizeEstimator from './pages/SampleSizeEstimator';
import HypothesisCoach from './pages/HypothesisCoach';
import RequestForm from './pages/RequestForm';
import PagePerformance from './pages/PagePerformance';
import JiraReporting from './pages/JiraReporting';
import WhatIsLive from './pages/WhatIsLive';
import TestAnalytics from './pages/TestAnalytics';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [isToolsOpen, setIsToolsOpen] = useState(true);
  const [isReportingOpen, setIsReportingOpen] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeDashboard setView={setCurrentView} />;
      case 'repository': return <Repository />;
      case 'tools-generator': return <HypothesisGenerator />;
      case 'tools-sample-size': return <SampleSizeEstimator />;
      case 'tools-hypothesis': return <HypothesisCoach />;
      case 'tools-request': return <RequestForm />;
      case 'tools-performance': return <PagePerformance />;
      case 'reporting-jira': return <JiraReporting />;
      case 'reporting-live': return <WhatIsLive />;
      case 'reporting-analytics': return <TestAnalytics />;
      default: return <HomeDashboard setView={setCurrentView} />;
    }
  };

  const getBreadcrumbs = () => {
    const parts = currentView.split('-');
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' / ');
  };

  const NavItem = ({ 
    id, 
    icon: Icon, 
    label, 
    active 
  }: { 
    id: ViewType, 
    icon: any, 
    label: string, 
    active: boolean 
  }) => (
    <button
      onClick={() => setCurrentView(id)}
      className={cn(
        "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
        active 
          ? "bg-white text-primary shadow-sm" 
          : "text-text-secondary hover:text-text-primary hover:bg-white/50"
      )}
    >
      <Icon size={18} className={active ? "text-primary" : "text-text-secondary"} />
      {label}
    </button>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-main">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-black/5 bg-bg-main flex flex-col p-4 gap-8">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">L</div>
          <span className="font-bold text-xl tracking-tight">LabPulse</span>
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto">
          <NavItem 
            id="home" 
            icon={Home} 
            label="Home" 
            active={currentView === 'home'} 
          />
          <NavItem 
            id="repository" 
            icon={Database} 
            label="Repository" 
            active={currentView === 'repository'} 
          />

          <div className="mt-4">
            <button 
              onClick={() => setIsToolsOpen(!isToolsOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary"
            >
              Tools
              <ChevronRight size={14} className={cn("transition-transform", isToolsOpen && "rotate-90")} />
            </button>
            {isToolsOpen && (
              <div className="flex flex-col gap-1 mt-1 ml-2">
                <NavItem id="tools-generator" icon={Sparkles} label="Hypothesis Gen" active={currentView === 'tools-generator'} />
                <NavItem id="tools-hypothesis" icon={Lightbulb} label="Hypothesis Coach" active={currentView === 'tools-hypothesis'} />
                <NavItem id="tools-sample-size" icon={Calculator} label="Sample Size" active={currentView === 'tools-sample-size'} />
                <NavItem id="tools-request" icon={Plus} label="Submit Request" active={currentView === 'tools-request'} />
                <NavItem id="tools-performance" icon={Activity} label="Performance" active={currentView === 'tools-performance'} />
              </div>
            )}
          </div>

          <div className="mt-4">
            <button 
              onClick={() => setIsReportingOpen(!isReportingOpen)}
              className="flex items-center justify-between w-full px-3 py-2 text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-text-primary"
            >
              Reporting
              <ChevronRight size={14} className={cn("transition-transform", isReportingOpen && "rotate-90")} />
            </button>
            {isReportingOpen && (
              <div className="flex flex-col gap-1 mt-1 ml-2">
                <NavItem id="reporting-jira" icon={Trello} label="Jira Reports" active={currentView === 'reporting-jira'} />
                <NavItem id="reporting-live" icon={Calendar} label="What Is Live" active={currentView === 'reporting-live'} />
                <NavItem id="reporting-analytics" icon={FlaskConical} label="Test Analytics" active={currentView === 'reporting-analytics'} />
              </div>
            )}
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-black/5 flex flex-col gap-4">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-white border border-black/5 flex items-center justify-center text-text-secondary">
              <User size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Research Team</span>
              <span className="text-xs text-text-secondary">Internal Platform</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-bottom border-black/5 bg-white/50 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-text-secondary font-medium">
              <span>LabPulse</span>
              <ChevronRight size={12} />
              <span className="text-text-primary">{getBreadcrumbs()}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search experiments, tools, or reports..." 
                className="bg-white border border-black/5 rounded-full py-2 pl-10 pr-4 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
            <button className="text-text-secondary hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-[1280px] mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentView}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {renderView()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
