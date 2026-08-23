import React, { useState } from 'react';
import { 
  CheckSquare, Square, Volume2, Sparkles, Stethoscope, ArrowRight, ShieldAlert, HeartHandshake, Globe
} from 'lucide-react';
import { ServiceType } from '../../types/medivision';

interface Props {
  serviceType: ServiceType;
  doctorQuestions: string[];
}

export const GuidancePanel: React.FC<Props> = ({ serviceType, doctorQuestions }) => {
  const [checkedQuestions, setCheckedQuestions] = useState<Record<number, boolean>>({});
  const [showAudioDemoNotice, setShowAudioDemoNotice] = useState(false);

  const toggleQuestion = (index: number) => {
    setCheckedQuestions(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const getNextSteps = () => {
    switch (serviceType) {
      case 'xray':
        return [
          'Bring the original DICOM/X-ray film or digital disc to your appointment.',
          'Note down any chest tightness, cough, or symptoms you experience.',
          'Review the preliminary findings with your pulmonologist or general physician.'
        ];
      case 'prescription':
        return [
          'Set daily phone alarms for your dosage timings (Morning, Afternoon, Night).',
          'Verify with your pharmacist if any medicine should be taken with milk or water.',
          'Store antibiotic medications away from heat and direct sunlight.'
        ];
      case 'bill':
        return [
          'Check with hospital billing desk regarding the highlighted verification item.',
          'Request an official itemized pharmacy receipt for insurance reimbursement.',
          'Store bill copy safely in your MediVision digital archive.'
        ];
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Audio Summary Feature Card */}
      <div className="bg-gradient-to-br from-teal-800 to-teal-900 text-white p-5 rounded-2xl shadow-md space-y-3 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-cyan-300" />
            <span className="font-bold text-sm">Listen to Audio Summary</span>
          </div>
          <span className="bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
            Coming Soon
          </span>
        </div>
        <p className="text-xs text-teal-100 leading-relaxed">
          Listen to an accessible spoken voice overview of your medical document findings in simple terms.
        </p>
        <button
          onClick={() => setShowAudioDemoNotice(!showAudioDemoNotice)}
          className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold py-2 px-3 rounded-xl transition-colors flex items-center justify-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Preview Voice Assistant</span>
        </button>

        {showAudioDemoNotice && (
          <div className="p-2.5 bg-teal-950/80 rounded-xl text-[11px] text-cyan-200 border border-cyan-500/30 animate-in fade-in">
            🔊 Text-to-speech audio reader feature is scheduled for the next release update!
          </div>
        )}
      </div>

      {/* Questions to Ask Doctor */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <Stethoscope className="w-4 h-4 text-teal-700" />
          <h3 className="font-bold text-sm text-slate-900">Questions for your Doctor</h3>
        </div>
        <p className="text-xs text-slate-500">
          Tap items to bookmark questions you want to ask during your consultation:
        </p>

        <div className="space-y-2.5">
          {doctorQuestions.map((q, idx) => {
            const isChecked = checkedQuestions[idx];
            return (
              <div
                key={idx}
                onClick={() => toggleQuestion(idx)}
                className={`p-3 rounded-xl border text-xs font-medium cursor-pointer transition-all flex items-start space-x-2.5 ${
                  isChecked
                    ? 'bg-teal-50 border-teal-300 text-teal-900'
                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {isChecked ? (
                  <CheckSquare className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
                ) : (
                  <Square className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                )}
                <span className="leading-snug">{q}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Next Best Steps */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
          <HeartHandshake className="w-4 h-4 text-teal-700" />
          <h3 className="font-bold text-sm text-slate-900">Next Best Steps</h3>
        </div>

        <ul className="space-y-3 text-xs text-slate-700">
          {getNextSteps().map((step, idx) => (
            <li key={idx} className="flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-teal-50 text-teal-800 font-bold text-[11px] flex items-center justify-center flex-shrink-0 mt-0.5 border border-teal-200">
                {idx + 1}
              </span>
              <span className="leading-relaxed">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Multilingual Notice */}
      <div className="p-4 bg-slate-100/80 border border-slate-200 rounded-2xl text-xs text-slate-600 space-y-1">
        <div className="flex items-center space-x-1.5 font-bold text-slate-800">
          <Globe className="w-4 h-4 text-teal-700" />
          <span>Language Preference</span>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-500">
          Currently displaying in English (Primary). Hindi, Telugu, Tamil, and other regional language explanations coming soon.
        </p>
      </div>

    </div>
  );
};
