export type ViewType = 
  | 'home' 
  | 'repository' 
  | 'tools-generator'
  | 'tools-sample-size' 
  | 'tools-hypothesis' 
  | 'tools-request' 
  | 'tools-performance' 
  | 'reporting-jira' 
  | 'reporting-live' 
  | 'reporting-analytics';

export interface Experiment {
  id: string;
  title: string;
  hypothesis: string;
  location: string;
  requestor: string;
  status: 'Success' | 'Running' | 'Neutral' | 'Loss';
  date: string;
}

export interface KPIData {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down';
}
