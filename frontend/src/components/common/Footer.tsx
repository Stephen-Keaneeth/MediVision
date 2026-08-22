import React from 'react';
import { Activity, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 pt-12 pb-24 md:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">MediVision AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering patients with clear, jargon-free understanding of complex healthcare documents.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[11px] text-teal-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
              Hackathon Demo Platform
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Services</h4>
            <ul className="space-y-2">
              <li><a href="#xray" className="hover:text-teal-400 transition-colors">X-Ray Screening</a></li>
              <li><a href="#rx" className="hover:text-teal-400 transition-colors">Prescription Understanding</a></li>
              <li><a href="#bill" className="hover:text-teal-400 transition-colors">Medical Bill Summary</a></li>
              <li><a href="#history" className="hover:text-teal-400 transition-colors">Document Archive</a></li>
            </ul>
          </div>

          {/* Col 3: Platform & Security */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Platform & Trust</h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-teal-400 transition-colors">Terms of Service</a></li>
              <li><a href="#help" className="hover:text-teal-400 transition-colors">Help Center & FAQ</a></li>
              <li><a href="#disclaimer" className="hover:text-teal-400 transition-colors">Medical Disclaimer</a></li>
            </ul>
          </div>

          {/* Col 4: Safety & Disclaimer Notice */}
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-2">
            <div className="flex items-center space-x-1.5 text-teal-400 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Educational Boundary</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              MediVision AI is built strictly for patient education and document clarity. Information does not substitute professional diagnostic advice.
            </p>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500">
            © {new Date().getFullYear()} MediVision AI. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 text-slate-500">
            <span className="flex items-center gap-1 hover:text-slate-300 transition-colors cursor-pointer">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> Patient-First Healthcare
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
