import React, { useState } from 'react';
import { 
  FileScan, ZoomIn, Eye, Sparkles, AlertCircle, CheckCircle2, Info, ShieldAlert, Sliders, Layers
} from 'lucide-react';
import { XRayAnalysis } from '../../types/medivision';

interface Props {
  data: XRayAnalysis;
}

export const XRayResultView: React.FC<Props> = ({ data }) => {
  const [highContrast, setHighContrast] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* Sample AI Observation Notice */}
      <div className="bg-teal-50 border border-teal-200 p-3 rounded-xl flex items-center justify-between text-xs text-teal-900">
        <span className="font-bold flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-teal-700" />
          Sample AI-Generated Preliminary Observation
        </span>
        <span className="text-[11px] font-semibold text-teal-700 bg-white px-2 py-0.5 rounded border border-teal-200">
          Non-Diagnostic
        </span>
      </div>

      {/* Image Preview & Interactive Controls Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center space-x-2">
            <FileScan className="w-5 h-5 text-teal-700" />
            <span className="font-bold text-sm text-slate-900">{data.scanType}</span>
          </div>

          {/* Quality Status Chip */}
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {data.qualityScore} Image Quality
            </span>
          </div>
        </div>

        {/* X-Ray Image View Area */}
        <div className="p-6 bg-slate-950 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
          
          {/* Mock X-Ray Graphic */}
          <div className={`relative transition-all duration-300 max-w-sm w-full h-64 rounded-xl border border-slate-800 flex items-center justify-center p-4 ${
            highContrast ? 'contrast-200 brightness-110' : ''
          } ${zoomed ? 'scale-125' : 'scale-100'}`}>
            {/* SVG Visual Thorax Simulation */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-slate-400 opacity-85">
              {/* Spine */}
              <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" strokeWidth="6" strokeDasharray="8 4" opacity="0.6" />
              {/* Ribcage left */}
              <path d="M 100,40 Q 50,50 30,70 Q 50,90 100,80" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              <path d="M 100,70 Q 40,85 25,105 Q 45,125 100,115" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              <path d="M 100,100 Q 40,115 25,135 Q 45,155 100,145" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              {/* Ribcage right */}
              <path d="M 100,40 Q 150,50 170,70 Q 150,90 100,80" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              <path d="M 100,70 Q 160,85 175,105 Q 155,125 100,115" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              <path d="M 100,100 Q 160,115 175,135 Q 155,155 100,145" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.7" />
              {/* Heart contour */}
              <path d="M 85,95 Q 115,95 125,125 Q 115,145 85,135 Z" fill="#ffffff" fillOpacity="0.15" stroke="currentColor" strokeWidth="2" />
              {/* Lungs shading */}
              <ellipse cx="65" cy="100" rx="25" ry="40" fill="#ffffff" fillOpacity="0.08" />
              <ellipse cx="135" cy="100" rx="25" ry="40" fill="#ffffff" fillOpacity="0.08" />
            </svg>

            <span className="absolute bottom-2 left-2 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded">
              LUNG FIELDS CLEAR
            </span>
          </div>

          {/* Viewer Controls */}
          <div className="absolute bottom-3 right-3 flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                highContrast ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle High Contrast"
            >
              <Sliders className="w-4 h-4" />
            </button>

            <button
              onClick={() => setZoomed(!zoomed)}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                zoomed ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Toggle Zoom"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scan Quality & AI Image Clarity Score Indicator */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-700 font-semibold">
            <Layers className="w-4 h-4 text-teal-700" />
            <span>Image Readability Metric:</span>
          </div>

          <div className="w-full sm:w-64 flex items-center space-x-3">
            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-teal-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${data.clarityPercentage}%` }} 
              />
            </div>
            <span className="font-bold text-teal-900">{data.clarityPercentage}% Readability</span>
          </div>
        </div>
      </div>

      {/* Observations & Plain Language Breakdown Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h3 className="font-bold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Eye className="w-5 h-5 text-teal-700" />
          <span>Preliminary Observations & Simple Explanations</span>
        </h3>

        <div className="space-y-4">
          {data.observations.map((obs) => (
            <div key={obs.id} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                  {obs.location}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  obs.status === 'normal'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {obs.status === 'normal' ? 'Normal Appearance' : 'Minor Observation'}
                </span>
              </div>

              <div className="text-xs text-slate-600 font-mono bg-white p-2.5 rounded-lg border border-slate-200/70">
                <span className="font-bold text-slate-500 uppercase tracking-wide text-[10px] block mb-0.5">Clinical Terminology:</span>
                "{obs.finding}"
              </div>

              <div className="text-xs text-slate-800 font-medium bg-teal-50/80 p-3 rounded-lg border border-teal-100">
                <span className="font-bold text-teal-900 text-[11px] block mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-700" /> Plain-Language Meaning:
                </span>
                {obs.plainLanguage}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Neutral Emergency Safety Warning */}
      <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-start space-x-3 shadow-md">
        <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-rose-300 block mb-0.5">Emergency Safety Notice</span>
          {data.emergencyNotice}
        </div>
      </div>

    </div>
  );
};
