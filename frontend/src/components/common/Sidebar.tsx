import React from 'react';
import { LayoutDashboard, FileScan, FileText, Receipt, History, Settings, ShieldCheck, HeartPulse } from 'lucide-react';
import { ServiceType } from '../../types/medivision';

interface Props {
  activeTab: string;
  onNavigate: (tab: string, service?: ServiceType) => void;
}

export const Sidebar: React.FC<Props> = ({ activeTab, onNavigate }) => {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'xray', label: 'X-Ray Screening', icon: FileScan, service: 'xray' as ServiceType },
    { id: 'prescription', label: 'Prescriptions', icon: FileText, service: 'prescription' as ServiceType },
    { id: 'bill', label: 'Medical Bills', icon: Receipt, service: 'bill' as ServiceType },
    { id: 'history', label: 'Analysis History', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200/80 min-h-[calc(100vh-4rem)] p-4 justify-between">
      <div className="space-y-6">
        <div>
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Services & Features</p>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.service ? 'upload' : item.id, item.service)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-teal-700 text-white font-semibold shadow-sm shadow-teal-700/30'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Upload Action Box */}
        <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl">
          <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs mb-1">
            <HeartPulse className="w-4 h-4 text-teal-600" />
            <span>Fast AI Understanding</span>
          </div>
          <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
            Upload your health report or Rx to translate jargon into simple advice.
          </p>
          <button
            onClick={() => onNavigate('upload', 'xray')}
            className="w-full bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold py-2 px-3 rounded-lg shadow-xs transition-colors"
          >
            Start Analysis
          </button>
        </div>
      </div>

      {/* Safety & Compliance Badge */}
      <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-slate-500 text-[11px] flex items-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
        <span>Educational guidance only. Consult your doctor.</span>
      </div>
    </aside>
  );
};
