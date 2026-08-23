import React, { useState } from 'react';
import { 
  Settings, User, Globe, Shield, Code, Check, Save, ToggleLeft, ToggleRight, Sparkles, HardDrive
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [developerMode, setDeveloperMode] = useState(true);
  const [mockLatency, setMockLatency] = useState('2.5');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-2">
      
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal-700" />
            <span>Platform & User Settings</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your patient profile, privacy preferences, and developer API options.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>

      {/* User Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <User className="w-4 h-4 text-teal-700" />
          <span>Patient Profile</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-500 font-medium mb-1">Full Name</label>
            <input
              type="text"
              defaultValue="Sarah Jenkins"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          <div>
            <label className="block text-slate-500 font-medium mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="sarah.jenkins@example.com"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            />
          </div>
        </div>
      </div>

      {/* Language & Regional Settings */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Globe className="w-4 h-4 text-teal-700" />
          <span>Language & Regional Scope</span>
        </h3>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">Primary UI Language: English</span>
            <span className="text-[10px] font-bold bg-teal-100 text-teal-800 px-2 py-0.5 rounded border border-teal-200">Active</span>
          </div>
          <p className="text-slate-500 text-[11px] leading-relaxed">
            Multi-language support for Hindi, Telugu, Tamil, Kannada, Malayalam, and Marathi is marked as future project scope.
          </p>
        </div>
      </div>

      {/* Developer API & Mock Configuration */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Code className="w-4 h-4 text-teal-700" />
            <span>Developer & Contributor Mode</span>
          </h3>
          <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Easy API Integration
          </span>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="font-bold text-slate-800 block">Simulate Async Backend Processing</span>
              <span className="text-slate-500 text-[11px]">Enables realistic 4-step loading animations in mock service layer.</span>
            </div>
            <button
              onClick={() => setDeveloperMode(!developerMode)}
              className="text-teal-700 transition-colors"
            >
              {developerMode ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8 text-slate-400" />}
            </button>
          </div>

          <div className="p-4 bg-teal-50/60 border border-teal-100 rounded-xl space-y-2">
            <div className="flex items-center space-x-1.5 font-bold text-teal-900">
              <HardDrive className="w-4 h-4 text-teal-700" />
              <span>Future API Endpoint Ready</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Contributors can connect real backend models by updating functions inside <code className="bg-white px-1.5 py-0.5 rounded border border-teal-200 font-mono text-teal-900">src/services/apiMock.ts</code>.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
