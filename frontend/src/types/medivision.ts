export type ServiceType = 'xray' | 'prescription' | 'bill';

export interface FileValidationResult {
  isValid: boolean;
  errorMessage?: string;
}

export interface UploadedFile {
  file: File;
  previewUrl: string;
  name: string;
  sizeFormatted: string;
  type: string;
}

// X-Ray Screening Interfaces
export interface XRayObservation {
  id: string;
  finding: string;
  plainLanguage: string;
  location: string;
  status: 'normal' | 'attention' | 'info';
}

export interface XRayAnalysis {
  id: string;
  documentType: 'xray';
  scanType: string; // e.g. "Chest X-Ray (AP/Lateral)"
  qualityScore: 'Optimal' | 'Acceptable' | 'Suboptimal';
  clarityPercentage: number;
  observations: XRayObservation[];
  overallSummary: string;
  doctorQuestions: string[];
  emergencyNotice: string;
  timestamp: string;
}

// Prescription Interfaces
export interface Medicine {
  id: string;
  name: string;
  purpose: string;
  dosage: string;
  frequency: string;
  duration: string;
  timing: ('Morning' | 'Afternoon' | 'Night' | 'Before Food' | 'After Food')[];
  instructions: string;
}

export interface PrescriptionAbbreviation {
  abbreviation: string;
  meaning: string;
  plainExplanation: string;
}

export interface PrescriptionAnalysis {
  id: string;
  documentType: 'prescription';
  patientName: string;
  doctorName: string;
  clinicName: string;
  date: string;
  medicines: Medicine[];
  abbreviations: PrescriptionAbbreviation[];
  scheduleHighlights: {
    timeOfDay: string;
    medicinesToTake: string[];
    note: string;
  }[];
  doctorQuestions: string[];
  safetyWarning: string;
  timestamp: string;
}

// Medical Bill Interfaces
export interface BillLineItem {
  id: string;
  item: string;
  category: 'Consultation' | 'Laboratory' | 'Radiology' | 'Pharmacy' | 'Procedure' | 'Room & Care';
  quantity: number;
  unitPrice: number;
  amount: number;
  needsVerification?: boolean;
  verificationReason?: string;
}

export interface BillCategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface BillAnalysis {
  id: string;
  documentType: 'bill';
  patientName: string;
  hospitalName: string;
  billNumber: string;
  date: string;
  totalAmount: number;
  medicinesTotal: number;
  testsTotal: number;
  proceduresTotal: number;
  lineItems: BillLineItem[];
  categoryBreakdown: BillCategoryBreakdown[];
  easySummary: string;
  verificationFlagsCount: number;
  billingQuestions: string[];
  timestamp: string;
}

export type AnyAnalysisResult = XRayAnalysis | PrescriptionAnalysis | BillAnalysis;

export interface HistoryItem {
  id: string;
  serviceType: ServiceType;
  title: string;
  fileName: string;
  date: string;
  status: 'Completed' | 'Processing' | 'Requires Sharper Image';
  summarySnippet: string;
  resultData: AnyAnalysisResult;
}
