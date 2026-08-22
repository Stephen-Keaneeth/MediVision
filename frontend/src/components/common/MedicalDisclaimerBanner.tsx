import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const MedicalDisclaimerBanner: React.FC<Props> = ({ compact = false }) => {
  return (
    <div className={`w-full bg-amber-500/10 border border-amber-500/30 text-amber-900 rounded-xl ${compact ? 'p-3 text-xs' : 'p-4 text-sm'} flex items-start space-x-3 shadow-sm`}>
      <AlertTriangle className={`text-amber-600 flex-shrink-0 ${compact ? 'w-4 h-4 mt-0.5' : 'w-5 h-5 mt-0.5'}`} />
      <div className="flex-1 leading-relaxed font-medium">
        <span className="font-semibold tracking-wide text-amber-950 uppercase text-[11px] block mb-0.5 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 inline text-amber-700" /> Educational Guidance Disclaimer
        </span>
        AI-generated information is for educational guidance only and is not a medical diagnosis, prescription, or treatment recommendation. Always consult a qualified healthcare professional for medical advice.
      </div>
    </div>
  );
};
