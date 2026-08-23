import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, Sparkles, ShieldCheck } from 'lucide-react';
import { ServiceType } from '../../types/medivision';

interface Props {
  serviceType: ServiceType;
  currentStep: number; // 1 to 4
}

export const ProcessingStepper: React.FC<Props> = ({ serviceType, currentStep }) => {
  const [messageIndex, setMessageIndex] = useState(0);

  const rotatingMessages = [
    'Reading the document carefully…',
    'Organizing important medical information…',
    'Translating clinical terms into plain language…',
    'Preparing your patient-friendly summary…'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { num: 1, label: 'Upload Received' },
    { num: 2, label: 'Preparing Document' },
    { num: 3, label: 'Extracting Information' },
    { num: 4, label: 'Generating Patient Summary' }
  ];

  const getModuleTitle = () => {
    switch (serviceType) {
      case 'xray': return 'Analyzing X-Ray Image';
      case 'prescription': return 'Parsing Prescription Details';
      case 'bill': return 'Summarizing Medical Charges';
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 py-4">
      
      {/* Header Banner */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-spin" />
          <span>AI Vision & OCR Engine</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{getModuleTitle()}</h2>
        <p className="text-sm text-slate-500 font-medium transition-all duration-300 min-h-[20px]">
          {rotatingMessages[messageIndex]}
        </p>
      </div>

      {/* Progress Stepper Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="relative flex items-center justify-between">
          {/* Connector Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 w-full z-0" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-teal-600 transition-all duration-500 z-0" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step) => {
            const isCompleted = step.num < currentStep;
            const isCurrent = step.num === currentStep;

            return (
              <div key={step.num} className="relative z-10 flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    isCompleted
                      ? 'bg-teal-700 text-white shadow-md'
                      : isCurrent
                      ? 'bg-teal-600 text-white ring-4 ring-teal-100 scale-110 shadow-lg'
                      : 'bg-slate-100 text-slate-400 border border-slate-200'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    step.num
                  )}
                </div>
                <span 
                  className={`text-[11px] font-semibold mt-2 text-center max-w-[90px] hidden sm:block ${
                    isCurrent ? 'text-teal-800 font-bold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated Skeleton Cards */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-200 animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
            <div className="h-3 bg-slate-100 rounded w-1/2 animate-pulse" />
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="h-3 bg-slate-100 rounded w-full animate-pulse" />
          <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse" />
          <div className="h-3 bg-slate-100 rounded w-4/6 animate-pulse" />
        </div>
      </div>

      {/* Reassurance Footer Notice */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center space-x-2">
        <ShieldCheck className="w-4 h-4 text-teal-700" />
        <span>This may take a moment. We are preparing a calm, patient-friendly explanation.</span>
      </div>

    </div>
  );
};
