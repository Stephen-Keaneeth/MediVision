import { XRayAnalysis, PrescriptionAnalysis, BillAnalysis, HistoryItem } from '../types/medivision';

export const sampleXRayResult: XRayAnalysis = {
  id: 'xray-doc-101',
  documentType: 'xray',
  scanType: 'Chest X-Ray (Frontal View)',
  qualityScore: 'Optimal',
  clarityPercentage: 94,
  observations: [
    {
      id: 'obs-1',
      finding: 'Lung fields are clear bilaterally with no focal consolidation or pleural effusion.',
      plainLanguage: 'Both lungs look clear with no signs of fluid buildup or lung infections like pneumonia.',
      location: 'Left & Right Lungs',
      status: 'normal',
    },
    {
      id: 'obs-2',
      finding: 'Cardiomediastinal silhouette is within normal limits for size and contour.',
      plainLanguage: 'The size and shape of your heart and main blood vessels appear healthy and normal.',
      location: 'Heart & Chest Center',
      status: 'normal',
    },
    {
      id: 'obs-3',
      finding: 'Bony thorax is intact with normal alignment and no acute fractures.',
      plainLanguage: 'Ribs and collarbones appear intact without any signs of cracks or fractures.',
      location: 'Ribcage & Bones',
      status: 'normal',
    },
    {
      id: 'obs-4',
      finding: 'Mild bilateral apical bronchial thickening noted, non-specific.',
      plainLanguage: 'Minor irritation or slight thickness in the upper airways. This can often happen after a mild seasonal cold or dry air exposure.',
      location: 'Upper Airway Branches',
      status: 'info',
    }
  ],
  overallSummary: 'The chest scan displays clear lung structures and normal heart dimensions. Minor upper airway mucosal thickening is noted which can be discussed during your routine doctor check-up.',
  doctorQuestions: [
    'Are my lung fields completely clear of infection?',
    'Does the mild bronchial thickening require any inhaler or medication?',
    'Should I schedule a follow-up scan in the next 6 to 12 months?'
  ],
  emergencyNotice: 'If you experience sudden severe shortness of breath, sharp chest pain, or high fever, seek immediate medical attention.',
  timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
};

export const samplePrescriptionResult: PrescriptionAnalysis = {
  id: 'rx-doc-202',
  documentType: 'prescription',
  patientName: 'Sarah Jenkins',
  doctorName: 'Dr. Aris Thorne, MD (General Medicine)',
  clinicName: 'Metro Health Care Clinic',
  date: 'Aug 22, 2026',
  medicines: [
    {
      id: 'med-1',
      name: 'Paracetamol',
      purpose: 'Pain relief & fever reduction',
      dosage: '500 mg',
      frequency: 'Twice daily (b.i.d.)',
      duration: '3 days',
      timing: ['Morning', 'Night', 'After Food'],
      instructions: 'Take 1 tablet after meals with plenty of water. Do not exceed recommended dosage.'
    },
    {
      id: 'med-2',
      name: 'Amoxicillin',
      purpose: 'Antibiotic for bacterial infection',
      dosage: '500 mg',
      frequency: 'Three times daily (t.i.d.)',
      duration: '5 days',
      timing: ['Morning', 'Afternoon', 'Night', 'After Food'],
      instructions: 'Complete full 5-day course even if symptoms feel better earlier.'
    },
    {
      id: 'med-3',
      name: 'Pantoprazole',
      purpose: 'Stomach acid reducer',
      dosage: '40 mg',
      frequency: 'Once daily (q.d.)',
      duration: '5 days',
      timing: ['Morning', 'Before Food'],
      instructions: 'Take 30 minutes before morning breakfast with a full glass of water.'
    }
  ],
  abbreviations: [
    {
      abbreviation: 'b.i.d.',
      meaning: 'Bis in die (Latin)',
      plainExplanation: 'Take twice a day (approx. 12 hours apart).'
    },
    {
      abbreviation: 't.i.d.',
      meaning: 'Ter in die (Latin)',
      plainExplanation: 'Take three times a day (approx. 8 hours apart).'
    },
    {
      abbreviation: 'q.d.',
      meaning: 'Quaque die (Latin)',
      plainExplanation: 'Take once every day.'
    },
    {
      abbreviation: 'p.c.',
      meaning: 'Post cibum (Latin)',
      plainExplanation: 'Take after meals.'
    },
    {
      abbreviation: 'a.c.',
      meaning: 'Ante cibum (Latin)',
      plainExplanation: 'Take before meals.'
    }
  ],
  scheduleHighlights: [
    {
      timeOfDay: 'Morning (8:00 AM)',
      medicinesToTake: ['Pantoprazole 40mg (Before Food)', 'Paracetamol 500mg (After Breakfast)', 'Amoxicillin 500mg (After Breakfast)'],
      note: 'Take Pantoprazole 30 mins before food. Take Paracetamol & Amoxicillin after food.'
    },
    {
      timeOfDay: 'Afternoon (2:00 PM)',
      medicinesToTake: ['Amoxicillin 500mg (After Lunch)'],
      note: 'Drink plenty of water with antibiotic dose.'
    },
    {
      timeOfDay: 'Night (8:00 PM)',
      medicinesToTake: ['Paracetamol 500mg (After Dinner)', 'Amoxicillin 500mg (After Dinner)'],
      note: 'Ensure last dose is taken before rest.'
    }
  ],
  doctorQuestions: [
    'Can I take Paracetamol along with my regular daily vitamins?',
    'What should I do if I miss an Amoxicillin dose?',
    'Are there any dietary restrictions while taking these medications?'
  ],
  safetyWarning: 'Never alter your medicine dosage, skip antibiotic days, or stop prescribed treatments without consulting your prescribing doctor or pharmacist.',
  timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
};

export const sampleBillResult: BillAnalysis = {
  id: 'bill-doc-303',
  documentType: 'bill',
  patientName: 'Sarah Jenkins',
  hospitalName: 'Apollo Care Hospital & Research Institute',
  billNumber: 'INV-2026-8842',
  date: 'Aug 20, 2026',
  totalAmount: 14850.00,
  medicinesTotal: 1850.00,
  testsTotal: 4300.00,
  proceduresTotal: 7500.00,
  lineItems: [
    {
      id: 'item-1',
      item: 'Outpatient Senior Specialist Physician Consultation',
      category: 'Consultation',
      quantity: 1,
      unitPrice: 1200.00,
      amount: 1200.00
    },
    {
      id: 'item-2',
      item: 'Complete Blood Count (CBC) with Differential',
      category: 'Laboratory',
      quantity: 1,
      unitPrice: 850.00,
      amount: 850.00
    },
    {
      id: 'item-3',
      item: 'Comprehensive Metabolic Panel (CMP)',
      category: 'Laboratory',
      quantity: 1,
      unitPrice: 1450.00,
      amount: 1450.00
    },
    {
      id: 'item-4',
      item: 'Chest Radiography (Digital X-Ray 2 Views)',
      category: 'Radiology',
      quantity: 1,
      unitPrice: 2500.00,
      amount: 2500.00
    },
    {
      id: 'item-5',
      item: 'Day Care Observation & Monitor Facility Charge',
      category: 'Procedure',
      quantity: 1,
      unitPrice: 5000.00,
      amount: 5000.00
    },
    {
      id: 'item-6',
      item: 'Oral Antibiotic & Acid Reflux Medication Package',
      category: 'Pharmacy',
      quantity: 1,
      unitPrice: 1850.00,
      amount: 1850.00
    },
    {
      id: 'item-7',
      item: 'Routine Lab Administration & Venipuncture Fee',
      category: 'Laboratory',
      quantity: 2,
      unitPrice: 1000.00,
      amount: 2000.00,
      needsVerification: true,
      verificationReason: 'Two blood draw (venipuncture) administration charges recorded on the same date (₹1,000 x 2). Please confirm with billing.'
    }
  ],
  categoryBreakdown: [
    { category: 'Hospital Day Care & Facilities', amount: 5000.00, percentage: 34, color: '#0f766e' },
    { category: 'Laboratory Tests', amount: 4300.00, percentage: 29, color: '#06b6d4' },
    { category: 'Radiology / X-Ray', amount: 2500.00, percentage: 17, color: '#0d9488' },
    { category: 'Pharmacy', amount: 1850.00, percentage: 12, color: '#10b981' },
    { category: 'Consultation', amount: 1200.00, percentage: 8, color: '#6366f1' }
  ],
  easySummary: 'The total bill of ₹14,850.00 is primarily comprised of day care facility charges (34%) and diagnostic laboratory/X-ray tests (46%), alongside physician consultation (₹1,200) and prescribed medicines (₹1,850).',
  verificationFlagsCount: 1,
  billingQuestions: [
    'Can you clarify why there are two venipuncture blood draw fees listed on the same day?',
    'Is the chest X-ray fee eligible for coverage under my cashless insurance policy?',
    'Can I receive an itemized GST tax invoice for the pharmacy medication package?'
  ],
  timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
};

export const sampleHistory: HistoryItem[] = [
  {
    id: 'hist-1',
    serviceType: 'xray',
    title: 'Chest X-Ray Examination',
    fileName: 'chest_xray_aug2026.png',
    date: 'Aug 22, 2026',
    status: 'Completed',
    summarySnippet: 'Clear lung fields, normal heart size. Mild apical bronchial mucosal thickening.',
    resultData: sampleXRayResult
  },
  {
    id: 'hist-2',
    serviceType: 'prescription',
    title: 'Dr. Thorne Rx - Paracetamol & Antibiotic',
    fileName: 'prescription_dr_thorne.jpg',
    date: 'Aug 22, 2026',
    status: 'Completed',
    summarySnippet: '3 medications extracted (Paracetamol 500mg, Amoxicillin 500mg, Pantoprazole 40mg).',
    resultData: samplePrescriptionResult
  },
  {
    id: 'hist-3',
    serviceType: 'bill',
    title: 'Apollo Hospital Outpatient Invoice',
    fileName: 'hospital_invoice_8842.pdf',
    date: 'Aug 20, 2026',
    status: 'Completed',
    summarySnippet: 'Total ₹14,850.00. 1 line item recommended for verification (blood draw fee).',
    resultData: sampleBillResult
  }
];
