import React, { useState } from 'react';
import { 
  History, Search, Filter, FileScan, FileText, Receipt, ArrowRight, Calendar, Sparkles, Trash2, FolderOpen
} from 'lucide-react';
import { HistoryItem, ServiceType, AnyAnalysisResult } from '../types/medivision';

interface Props {
  historyItems: HistoryItem[];
  onSelectHistoryItem: (item: HistoryItem) => void;
  onNavigateToUpload: (service?: ServiceType) => void;
}

export const HistoryPage: React.FC<Props> = ({
  historyItems,
  onSelectHistoryItem,
  onNavigateToUpload
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [items, setItems] = useState<HistoryItem[]>(historyItems);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summarySnippet.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || item.serviceType === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getServiceBadge = (type: ServiceType) => {
    switch (type) {
      case 'xray':
        return { label: 'X-Ray', icon: FileScan, color: 'bg-teal-100 text-teal-800 border-teal-200' };
      case 'prescription':
        return { label: 'Prescription', icon: FileText, color: 'bg-cyan-100 text-cyan-800 border-cyan-200' };
      case 'bill':
        return { label: 'Medical Bill', icon: Receipt, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
    }
  };

  const handleClearHistory = () => {
    setItems([]);
  };

  return (
    <div className="space-y-6 py-2">
      
      {/* Header & Controls */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <History className="w-6 h-6 text-teal-700" />
            <span>Document Analysis History</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Access your previously processed X-Rays, prescriptions, and medical bills.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 border border-slate-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by file name or key findings..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto">
          {['all', 'xray', 'prescription', 'bill'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl capitalize transition-colors ${
                selectedFilter === f
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

      </div>

      {/* History List or Empty State */}
      {filteredItems.length > 0 ? (
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const badge = getServiceBadge(item.serviceType);
            const Icon = badge.icon;

            return (
              <div
                key={item.id}
                onClick={() => onSelectHistoryItem(item)}
                className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:border-teal-300 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold flex-shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 stroke-[2.5]" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-800 transition-colors">
                        {item.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-1">
                      {item.summarySnippet}
                    </p>

                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" /> {item.date}
                      </span>
                      <span>•</span>
                      <span>{item.fileName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs group-hover:translate-x-1 transition-transform self-end sm:self-center">
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No Document History Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You have not analyzed any medical documents yet or your search filter returned no matches.
            </p>
          </div>

          <button
            onClick={() => onNavigateToUpload('xray')}
            className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-teal-700/20 transition-all inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Upload Your First Document</span>
          </button>
        </div>
      )}

    </div>
  );
};
