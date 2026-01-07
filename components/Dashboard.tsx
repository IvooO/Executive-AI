
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';
import { UserMetric, Insight } from '../types';
import { Activity, Users, ArrowRight, Menu, Anchor, Brain, Watch, ChevronUp, ChevronDown, Zap } from 'lucide-react';

// Mock Data - HRV Trend (Bio-Optimization)
const HRV_DATA = [
  { day: 'Mon', current: 42, baseline: 45 },
  { day: 'Tue', current: 40, baseline: 45 },
  { day: 'Wed', current: 38, baseline: 45 }, // Dip
  { day: 'Thu', current: 48, baseline: 45 }, // Recovery
  { day: 'Fri', current: 52, baseline: 45 }, // Super-comp
  { day: 'Sat', current: 50, baseline: 45 },
  { day: 'Sun', current: 55, baseline: 45 },
];

const METRICS: UserMetric[] = [
  { label: 'Visceral Fat Gap', value: '2%', unit: 'Target: 0.5%', status: 'warning', trend: 'down', description: 'Cortisol Interference' },
  { label: 'Recovery (HRV)', value: '52ms', unit: 'Baseline: 45ms', status: 'optimal', trend: 'up', description: 'Bio-Stacking Effective' },
  { label: 'Social Audit', value: '1/3', unit: 'Touchpoints', status: 'critical', trend: 'stable', description: 'Phase 1 Blind Spot' },
  { label: 'Flow State (90m)', value: '8/10', unit: 'Sprints', status: 'optimal', trend: 'up', description: 'Execution Cycle' },
];

const INSIGHTS: Insight[] = [
  {
    id: '1',
    type: 'intervention',
    title: 'Discipline Cycle Alert',
    message: 'You set 5 Sprint blocks but only executed 3. "Tight but Loose" rule violation. Adjust calendar for tomorrow.',
    timestamp: new Date()
  },
  {
    id: '2',
    type: 'warning',
    title: 'Bio-Opt Deviation',
    message: 'HRV dipped mid-week. Likely cortisol spike from missed micro-recoveries.',
    timestamp: new Date()
  }
];

interface DashboardProps {
  onMenuClick?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onMenuClick }) => {
  return (
    <div className="flex-1 h-full overflow-y-auto bg-meta-bg text-zinc-900 relative">
        <div className="absolute top-0 left-0 right-0 h-64 bg-subtle-glow opacity-60 pointer-events-none" />

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-meta-border bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
           <span className="font-bold text-zinc-900 tracking-tight">Bio-Optimization</span>
        </div>
        <button onClick={onMenuClick} className="text-zinc-500">
          <Menu size={24} />
        </button>
      </div>

      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        <header className="flex justify-between items-end relative z-10">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 mb-2">Phase 4: Monitoring</h2>
            <div className="flex items-center gap-2 text-zinc-500">
                <span className="text-xs font-mono uppercase tracking-widest border border-zinc-300 px-2 py-0.5 rounded text-zinc-600">Phase 4</span>
                <span className="text-sm">Feedback Loops Active</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-medium text-zinc-600 bg-white px-4 py-2 rounded-full border border-zinc-200 shadow-sm">
            <Watch size={14} className="text-emerald-500" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Biometrics
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {METRICS.map((metric, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl relative overflow-hidden group hover:border-zinc-300 transition-all duration-300 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">{metric.label}</span>
                {metric.trend === 'up' ? <ChevronUp size={16} className="text-zinc-400" /> : 
                 metric.trend === 'down' ? <ChevronDown size={16} className="text-zinc-400" /> : 
                 <div className="w-4 h-1 bg-zinc-300 rounded-full" />}
              </div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-3xl font-light text-zinc-900 tracking-tight">{metric.value}</span>
              </div>
              <div className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${
                      metric.status === 'optimal' ? 'bg-emerald-500' : 
                      metric.status === 'warning' ? 'bg-amber-500' : 
                      'bg-rose-500'
                  }`} />
                  <span className="text-xs text-zinc-500 truncate">{metric.unit}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart - HRV */}
          <div className="lg:col-span-2 glass-card rounded-2xl p-6 md:p-8 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-medium text-zinc-900 flex items-center gap-2">
                <Activity className="text-blue-600" size={18} />
                Recovery Profile (HRV)
              </h3>
              <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-600 px-2 py-1 rounded border border-blue-100">Baseline: 45ms</span>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={HRV_DATA}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
                  <XAxis dataKey="day" stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} axisLine={false} domain={[30, 60]} dx={-10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', borderColor: '#e4e4e7', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    itemStyle={{ color: '#18181b', fontSize: '12px' }}
                    cursor={{ stroke: 'rgba(0,0,0,0.1)' }}
                  />
                  <ReferenceLine y={45} label={{ value: 'Baseline', fill: '#10b981', fontSize: 10, position: 'right' }} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.5} />
                  <Area type="monotone" name="HRV" dataKey="current" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Protocol Deviations */}
          <div className="glass-card rounded-2xl p-6 flex flex-col bg-white shadow-sm">
            <h3 className="font-medium text-zinc-900 flex items-center gap-2 mb-6">
                <Brain className="text-purple-600" size={18} />
                Protocol Deviations
            </h3>
            
            <div className="flex-1 space-y-4">
              {INSIGHTS.map((insight) => (
                <div key={insight.id} className="bg-zinc-50 border border-zinc-100 p-4 rounded-xl hover:bg-zinc-100 transition-colors cursor-default">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase ${
                      insight.type === 'intervention' ? 'bg-rose-100 text-rose-600 border border-rose-200' : 'bg-amber-100 text-amber-600 border border-amber-200'
                    }`}>
                      {insight.type === 'intervention' ? 'Correction' : 'Warning'}
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">Today</span>
                  </div>
                  <h4 className="font-medium text-zinc-900 text-sm mb-1">{insight.title}</h4>
                  <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full py-3 bg-white hover:bg-zinc-50 border border-zinc-200 text-sm font-medium text-zinc-700 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
              Run Diagnostic Audit <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Isolation Guardrail Section */}
        <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-sm">
           <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-50" />
           <div className="relative p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h3 className="font-semibold flex items-center gap-2 text-zinc-900 text-lg">
                <Users className="text-pink-500" size={20} />
                Phase 1 Blind Spot Detected
              </h3>
              <p className="text-zinc-500 mt-2 max-w-xl text-sm leading-relaxed font-normal">
                <span className="text-pink-600 font-medium">Missing Link:</span> You have high career output but low social environment variation. 
                Protocol Recommendation: Secure the Class A Catamaran to force environment change.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-zinc-900 text-white hover:bg-zinc-800 px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-zinc-200">
                <Anchor size={16} />
                Execute Asset Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
