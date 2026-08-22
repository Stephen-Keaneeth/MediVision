import React, { useState } from 'react';
import { 
  Receipt, DollarSign, AlertCircle, PieChart, ShieldAlert, Sparkles, CheckCircle2, FileSpreadsheet, Building2
} from 'lucide-react';
import { BillAnalysis } from '../../types/medivision';

interface Props {
  data: BillAnalysis;
}

export const BillResultView: React.FC<Props> = ({ data }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(data.lineItems.map(i => i.category)))];

  const filteredItems = filterCategory === 'All' 
    ? data.lineItems 
    : data.lineItems.filter(i => i.category === filterCategory);

  return (
    <div className="space-y-6">
      
      {/* Financial Overview Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
        
        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Amount</span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-teal-900 tracking-tight leading-none whitespace-nowrap">
            ₹{data.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <div>
            <span className="text-[10px] text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded font-semibold inline-block border border-teal-100">
              Final Invoice
            </span>
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Lab Tests Total</span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight leading-none whitespace-nowrap">
            ₹{data.testsTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 font-medium block">Diagnostic Panels</span>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Medicines Total</span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight leading-none whitespace-nowrap">
            ₹{data.medicinesTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 font-medium block">Pharmacy Items</span>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-sm space-y-1.5 flex flex-col justify-between">
          <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Procedures & Care</span>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-extrabold text-slate-900 tracking-tight leading-none whitespace-nowrap">
            ₹{data.proceduresTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-[10px] text-slate-500 font-medium block">Facility & Services</span>
        </div>

      </div>

      {/* Easy Plain-Language Financial Summary Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-teal-700" />
          <span>Easy Executive Summary</span>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed font-medium bg-teal-50/70 p-3.5 rounded-xl border border-teal-100">
          "{data.easySummary}"
        </p>
      </div>

      {/* Category Breakdown & Interactive Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <PieChart className="w-5 h-5 text-teal-700" />
            <h3 className="font-bold text-sm text-slate-900">Spending Breakdown by Category</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">{data.hospitalName}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Custom SVG Doughnut Visual Chart */}
          <div className="flex justify-center relative">
            <svg viewBox="0 0 100 100" className="w-44 h-44 transform -rotate-90">
              {/* Ring segments */}
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0f766e" strokeWidth="14" strokeDasharray="34 100" strokeDashoffset="0" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#06b6d4" strokeWidth="14" strokeDasharray="29 100" strokeDashoffset="-34" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0d9488" strokeWidth="14" strokeDasharray="17 100" strokeDashoffset="-63" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="12 100" strokeDashoffset="-80" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#6366f1" strokeWidth="14" strokeDasharray="8 100" strokeDashoffset="-92" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total</span>
              <span className="font-extrabold text-sm text-slate-900">₹{data.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Category Legend List */}
          <div className="space-y-2.5">
            {data.categoryBreakdown.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center space-x-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="font-semibold text-slate-700">{cat.category}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-bold text-slate-900">₹{cat.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  <span className="text-[11px] text-slate-400 font-mono w-10 text-right">{cat.percentage}%</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Itemized Line Items Table & Verification Flags */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-teal-700" />
              <span>Itemized Line Items</span>
            </h3>
            <p className="text-xs text-slate-500">Review individual charges and verification suggestions.</p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilterCategory(c)}
                className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                  filterCategory === c
                    ? 'bg-teal-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-3">Item Description</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Qty</th>
                <th className="py-3 px-3">Unit Price</th>
                <th className="py-3 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => (
                <React.Fragment key={item.id}>
                  <tr className={`hover:bg-slate-50 transition-colors ${item.needsVerification ? 'bg-amber-50/40' : ''}`}>
                    
                    <td className="py-3.5 px-3 font-semibold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <span>{item.item}</span>
                        {item.needsVerification && (
                          <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 text-amber-700" />
                            Please Verify
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-slate-700 font-medium">
                      {item.quantity}
                    </td>

                    <td className="py-3.5 px-3 text-slate-700">
                      ₹{item.unitPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                    <td className="py-3.5 px-3 text-right font-bold text-slate-900">
                      ₹{item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>

                  </tr>

                  {/* Verification Suggestion Sub-row */}
                  {item.needsVerification && (
                    <tr className="bg-amber-50/60">
                      <td colSpan={5} className="py-2.5 px-3 text-[11px] text-amber-950 font-medium border-b border-amber-200">
                        💡 <span className="font-bold">Billing Verification Suggestion:</span> {item.verificationReason}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
