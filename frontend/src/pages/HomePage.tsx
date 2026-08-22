import React from 'react';
import { 
  FileScan, FileText, Receipt, ArrowRight, ShieldCheck, Sparkles, CheckCircle2, Lock, Stethoscope, HeartPulse
} from 'lucide-react';
import { ServiceType } from '../types/medivision';

interface Props {
  onSelectService: (service: ServiceType) => void;
  onScrollToHowItWorks: () => void;
}

export const HomePage: React.FC<Props> = ({ onSelectService, onScrollToHowItWorks }) => {
  const serviceCards = [
    {
      id: 'xray' as ServiceType,
      title: 'X-Ray Screening',
      icon: FileScan,
      description: 'Upload thoracic or skeletal X-rays to receive preliminary structural observations in plain language.',
      badge: 'Computer Vision',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200'
    },
    {
      id: 'prescription' as ServiceType,
      title: 'Prescription Understanding',
      icon: FileText,
      description: 'Extract medicines, dosages, frequencies, timing schedules, and Latin Rx abbreviations instantly.',
      badge: 'OCR & Rx Parsing',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200'
    },
    {
      id: 'bill' as ServiceType,
      title: 'Medical Bill Summary',
      icon: Receipt,
      description: 'Summarize hospital invoices, categorise test charges, and highlight items to verify with billing.',
      badge: 'Financial Breakdown',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    }
  ];

  const fourSteps = [
    {
      step: '01',
      title: 'Upload Document',
      desc: 'Drag & drop your X-ray image, prescription photo, or hospital bill securely.'
    },
    {
      step: '02',
      title: 'AI Processing',
      desc: 'Computer Vision & OCR extract clinical text, values, and structural patterns.'
    },
    {
      step: '03',
      title: 'Simple Explanation',
      desc: 'Complex medical jargon is translated into patient-friendly, easy language.'
    },
    {
      step: '04',
      title: 'Patient Guidance',
      desc: 'Receive tailored questions for your doctor and recommended next steps.'
    }
  ];

  return (
    <div className="space-y-16 py-4">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white p-8 sm:p-12 md:p-16 shadow-xl border border-teal-800/50">
        
        {/* Subtle Background Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-cyan-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>AI-Powered Medical Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Understand your medical documents <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">with clarity.</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
            MediVision AI translates complex X-ray observations, handwritten prescriptions, and hospital bills into clear, patient-friendly explanations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectService('xray')}
              className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-cyan-500/25 transition-all text-sm flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Analyze a document</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToHowItWorks}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-md transition-colors text-sm"
            >
              How it works
            </button>
          </div>

          {/* Key Feature Trust Metrics */}
          <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              <span>Educational Guidance</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="w-4 h-4 text-teal-300 flex-shrink-0" />
              <span>Secure Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <Stethoscope className="w-4 h-4 text-cyan-300 flex-shrink-0" />
              <span>Doctor-Ready Summaries</span>
            </div>
          </div>

        </div>
      </section>

      {/* Three Service Cards Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Select a Service to Begin</h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Choose your document type below for immediate, patient-friendly AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {card.description}
                  </p>

                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => onSelectService(card.id)}
                    className="w-full bg-slate-900 group-hover:bg-teal-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Start Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* How MediVision AI Works - 4 Step Visual Workflow */}
      <section id="how-it-works" className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-sm space-y-8">
        
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold">
            <HeartPulse className="w-3.5 h-3.5 text-teal-600" />
            <span>Simple Linear Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">How MediVision AI Works</h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            Four clear, transparent steps from document upload to actionable patient understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {fourSteps.map((s, idx) => (
            <div key={idx} className="p-5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-3 relative">
              <span className="text-2xl font-black text-teal-700/30 font-mono block">{s.step}</span>
              <h3 className="font-bold text-sm text-slate-900">{s.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* Trust & Safety Section */}
      <section className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-3xl p-8 space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
            <span>Patient Privacy & Healthcare Safety</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">Built for educational empowerment with high privacy standards.</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your uploaded documents are processed securely and discarded after your session. MediVision AI never replaces your physician — it equips you with clear information so you can have more informed, meaningful discussions with your doctor.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-200 text-xs font-semibold text-teal-900 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Encrypted Session Storage
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-200 text-xs font-semibold text-teal-900 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Doctor Question Generator
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-teal-200 text-xs font-semibold text-teal-900 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Non-Diagnostic Disclaimer
          </span>
        </div>
      </section>

    </div>
  );
};
