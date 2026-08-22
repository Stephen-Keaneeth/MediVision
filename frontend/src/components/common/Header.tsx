import React, { useState } from 'react';
import { Activity, Bell, Globe, ChevronDown, Check, User, Sparkles, X, ShieldAlert } from 'lucide-react';
import { ServiceType } from '../../types/medivision';

interface Props {
  activeTab: string;
  onNavigate: (tab: string, service?: ServiceType) => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<Props> = ({ activeTab, onNavigate, onOpenSettings }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const notifications = [
    {
      id: 'n1',
      title: 'Analysis Complete',
      desc: 'Your Chest X-Ray analysis summary is ready.',
      time: '10m ago',
      type: 'success'
    },
    {
      id: 'n2',
      title: 'Billing Tip',
      desc: '1 line item flagged for verification in your hospital bill.',
      time: '2h ago',
      type: 'info'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 via-teal-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform duration-200">
              <Activity className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">MediVision</span>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-1.5 py-0.5 rounded-md border border-teal-200">AI</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium tracking-wide uppercase">Patient Document Intelligence</p>
            </div>
          </div>

          {/* Desktop Main Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'home'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => onNavigate('upload', 'xray')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'xray'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              X-Ray Screening
            </button>

            <button
              onClick={() => onNavigate('upload', 'prescription')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'prescription'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Prescriptions
            </button>

            <button
              onClick={() => onNavigate('upload', 'bill')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'bill'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Medical Bills
            </button>

            <button
              onClick={() => onNavigate('history')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
                activeTab === 'history'
                  ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              History
            </button>
          </nav>

          {/* Right Header Utility Icons */}
          <div className="flex items-center space-x-3">

            {/* Language Pill (English Primary - Coming Soon Badge) */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 rounded-full border border-slate-200 transition-colors"
                title="Select interface language"
              >
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>English</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span>Language</span>
                    <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200 font-semibold">Primary</span>
                  </div>
                  <button
                    onClick={() => setShowLangMenu(false)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-teal-900 bg-teal-50 rounded-lg"
                  >
                    <span>English (US & UK)</span>
                    <Check className="w-3.5 h-3.5 text-teal-700" />
                  </button>
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 py-1.5 bg-slate-50 rounded-lg text-slate-600">
                    <p className="text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" /> Multilingual Support
                    </p>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Hindi, Telugu, Tamil, Kannada, Malayalam & Marathi translations coming in future updates!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Notification Bell Icon */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setUnreadCount(0);
                }}
                className="p-2 text-slate-600 hover:text-teal-800 hover:bg-slate-100 rounded-lg transition-colors relative"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-teal-600 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </button>

              {/* Notification Drawer */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-1">
                    <span className="font-bold text-sm text-slate-900">Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-2.5 bg-slate-50 hover:bg-teal-50/60 rounded-xl transition-colors text-xs border border-slate-100">
                        <div className="flex items-center justify-between font-bold text-slate-800 mb-0.5">
                          <span>{n.title}</span>
                          <span className="text-[10px] font-normal text-slate-400">{n.time}</span>
                        </div>
                        <p className="text-slate-600 leading-normal">{n.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Avatar */}
            <button
              onClick={onOpenSettings}
              className="flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors border border-slate-200"
              title="User Profile & Settings"
            >
              <div className="w-7 h-7 rounded-full bg-teal-700 text-white font-bold text-xs flex items-center justify-center">
                SJ
              </div>
              <span className="hidden sm:inline-block text-xs font-semibold text-slate-700">Sarah</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
