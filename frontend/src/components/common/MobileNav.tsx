import React from 'react';
import { LayoutDashboard, FileScan, FileText, Receipt, History } from 'lucide-react';
import { ServiceType } from '../../types/medivision';

interface Props {
  activeTab: string;
  onNavigate: (tab: string, service?: ServiceType) => void;
}

export const MobileNav: React.FC<Props> = ({ activeTab, onNavigate }) => {
  const items = [
    { id: 'home', label: 'Home', icon: LayoutDashboard },
    { id: 'xray', label: 'X-Ray', icon: FileScan, service: 'xray' as ServiceType },
    { id: 'prescription', label: 'Rx', icon: FileText, service: 'prescription' as ServiceType },
    { id: 'bill', label: 'Bills', icon: Receipt, service: 'bill' as ServiceType },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.service ? 'upload' : item.id, item.service)}
              className={`flex flex-col items-center py-1.5 px-3 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-teal-700 bg-teal-50' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
