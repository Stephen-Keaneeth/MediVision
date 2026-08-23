import React, { useState } from 'react';
import { 
  FileText, Pill, Clock, Calendar, AlertTriangle, CheckCircle2, User, Building, BookOpen, Sun, Moon, Sunrise
} from 'lucide-react';
import { PrescriptionAnalysis } from '../../types/medivision';

interface Props {
  data: PrescriptionAnalysis;
}

export const PrescriptionResultView: React.FC<Props> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'table' | 'schedule' | 'abbreviations'>('table');

  return (
    <div className="space-y-6">
      
      {/* Patient & Clinic Details Header Panel */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
            <User className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Patient</span>
            <span className="font-bold text-slate-900 text-sm">{data.patientName}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Prescriber</span>
            <span className="font-bold text-slate-900">{data.doctorName}</span>
            <p className="text-slate-500 text-[11px] truncate">{data.clinicName}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Prescription Date</span>
            <span className="font-bold text-slate-900">{data.date}</span>
          </div>
        </div>
      </div>

      {/* Structured Medicines & Schedule Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        <div className="flex border-b border-slate-200 bg-slate-50/70 p-1.5 gap-1">
          <button
            onClick={() => setActiveTab('table')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'table'
                ? 'bg-white text-teal-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Pill className="w-4 h-4 text-teal-700" />
            <span>Extracted Medicines ({data.medicines.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'schedule'
                ? 'bg-white text-teal-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-4 h-4 text-teal-700" />
            <span>Simple Daily Schedule</span>
          </button>

          <button
            onClick={() => setActiveTab('abbreviations')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'abbreviations'
                ? 'bg-white text-teal-800 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-teal-700" />
            <span>Terms & Rx Abbreviations</span>
          </button>
        </div>

        {/* Tab 1: Structured Medicine Table */}
        {activeTab === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Medicine & Purpose</th>
                  <th className="py-3 px-4">Dosage</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Timing & Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.medicines.map((med) => (
                  <tr key={med.id} className="hover:bg-teal-50/30 transition-colors">
                    
                    {/* Medicine */}
                    <td className="py-4 px-4 align-top">
                      <div className="font-bold text-slate-900 text-sm">{med.name}</div>
                      <span className="text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-100 font-medium inline-block mt-1">
                        {med.purpose}
                      </span>
                    </td>

                    {/* Dosage */}
                    <td className="py-4 px-4 align-top font-bold text-slate-800">
                      {med.dosage}
                    </td>

                    {/* Frequency */}
                    <td className="py-4 px-4 align-top text-slate-700">
                      {med.frequency}
                    </td>

                    {/* Duration */}
                    <td className="py-4 px-4 align-top font-semibold text-slate-800">
                      {med.duration}
                    </td>

                    {/* Timing Badges & Instructions */}
                    <td className="py-4 px-4 align-top space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {med.timing.map((t, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              t === 'Morning' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                              t === 'Afternoon' ? 'bg-orange-50 text-orange-800 border-orange-200' :
                              t === 'Night' ? 'bg-indigo-50 text-indigo-800 border-indigo-200' :
                              t === 'Before Food' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                              'bg-emerald-50 text-emerald-800 border-emerald-200'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">{med.instructions}</p>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Simple Daily Schedule */}
        {activeTab === 'schedule' && (
          <div className="p-6 space-y-4">
            <p className="text-xs text-slate-500 font-medium">
              Simplified visual schedule organized by time of day:
            </p>

            <div className="space-y-4">
              {data.scheduleHighlights.map((sched, idx) => (
                <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                  <div className="flex items-center space-x-2 text-teal-800 font-bold text-xs border-b border-slate-200 pb-2">
                    {idx === 0 ? <Sunrise className="w-4 h-4 text-amber-500" /> :
                     idx === 1 ? <Sun className="w-4 h-4 text-orange-500" /> :
                     <Moon className="w-4 h-4 text-indigo-500" />}
                    <span>{sched.timeOfDay}</span>
                  </div>

                  <ul className="space-y-1 text-xs font-semibold text-slate-800">
                    {sched.medicinesToTake.map((m, mIdx) => (
                      <li key={mIdx} className="flex items-center space-x-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="text-[11px] text-slate-500 italic pt-1">{sched.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Terms & Rx Abbreviations */}
        {activeTab === 'abbreviations' && (
          <div className="p-6 space-y-4">
            <h4 className="font-bold text-sm text-slate-900">Medical Abbreviations Translated</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.abbreviations.map((abbr, idx) => (
                <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold font-mono text-teal-800 text-sm bg-white px-2 py-0.5 rounded border border-slate-200">
                      {abbr.abbreviation}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{abbr.meaning}</span>
                  </div>
                  <p className="text-slate-700 font-medium text-[11px]">{abbr.plainExplanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Medication Change Warning Banner */}
      <div className="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-950 rounded-2xl flex items-start space-x-3 text-xs shadow-xs">
        <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold block mb-0.5 text-rose-950">Important Medication Safety Notice</span>
          {data.safetyWarning}
        </div>
      </div>

    </div>
  );
};
