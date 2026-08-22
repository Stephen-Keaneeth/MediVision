import React, { useState } from 'react';
import { 
  ChevronRight, Download, Share2, PlusCircle, Bookmark, Check, ShieldCheck, FileText
} from 'lucide-react';
import { ServiceType } from '../../types/medivision';
import { MedicalDisclaimerBanner } from '../common/MedicalDisclaimerBanner';
import { GuidancePanel } from './GuidancePanel';
import { Modal } from '../common/Modal';

interface Props {
  serviceType: ServiceType;
  title: string;
  timestamp: string;
  onNewAnalysis: () => void;
  doctorQuestions: string[];
  children: React.ReactNode;
}

export const ResultsLayout: React.FC<Props> = ({
  serviceType,
  title,
  timestamp,
  onNewAnalysis,
  doctorQuestions,
  children
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const getModuleLabel = () => {
    switch (serviceType) {
      case 'xray': return 'X-Ray Screening';
      case 'prescription': return 'Prescription';
      case 'bill': return 'Medical Bill';
    }
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
        <span className="hover:text-slate-800 cursor-pointer">Dashboard</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="hover:text-slate-800 cursor-pointer">{getModuleLabel()}</span>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-teal-800 font-bold">Analysis Results</span>
      </nav>

      {/* Action Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <span className="bg-teal-50 text-teal-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-teal-200">
              Verified Analysis
            </span>
          </div>
          <p className="text-xs text-slate-500">Generated on {timestamp} • Reference ID: #{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              isSaved
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-teal-700 text-teal-700' : ''}`} />
            <span>{isSaved ? 'Saved to History' : 'Save for Later'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Summary Downloaded</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Summary</span>
              </>
            )}
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Share with Doctor</span>
          </button>

          <button
            onClick={onNewAnalysis}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700 hover:bg-teal-800 text-white shadow-md shadow-teal-700/20 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Start New Analysis</span>
          </button>
        </div>
      </div>

      {/* Persistent Medical Disclaimer Banner */}
      <MedicalDisclaimerBanner />

      {/* Main Grid Content Area & Right Guidance Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content View */}
        <div className="lg:col-span-2 space-y-6">
          {children}
        </div>

        {/* Right Sidebar: Safety & Patient Guidance */}
        <div className="space-y-6">
          <GuidancePanel serviceType={serviceType} doctorQuestions={doctorQuestions} />
        </div>

      </div>

      {/* Share With Doctor Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Summary with Healthcare Professional"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Generate a secure, private link to share this document summary directly with your doctor or pharmacist prior to your appointment.
          </p>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <span className="text-xs font-mono text-slate-700 truncate pr-2">
              https://medivision.ai/share/doc-8842-sec-pass
            </span>
            <button
              onClick={handleCopyLink}
              className="bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
            >
              {copiedLink ? 'Copied!' : 'Copy Link'}
            </button>
          </div>

          <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-[11px] text-teal-800 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
            <span>Shared link automatically expires in 7 days for security.</span>
          </div>
        </div>
      </Modal>

    </div>
  );
};
