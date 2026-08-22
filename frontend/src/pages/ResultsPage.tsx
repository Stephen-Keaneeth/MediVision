import React from 'react';
import { AnyAnalysisResult, ServiceType } from '../types/medivision';
import { ResultsLayout } from '../components/results/ResultsLayout';
import { XRayResultView } from '../components/results/XRayResultView';
import { PrescriptionResultView } from '../components/results/PrescriptionResultView';
import { BillResultView } from '../components/results/BillResultView';

interface Props {
  serviceType: ServiceType;
  resultData: AnyAnalysisResult;
  onNewAnalysis: () => void;
}

export const ResultsPage: React.FC<Props> = ({ serviceType, resultData, onNewAnalysis }) => {
  
  const getPageTitle = () => {
    switch (serviceType) {
      case 'xray': return 'X-Ray Image Observations';
      case 'prescription': return 'Prescription Medicine Breakdown';
      case 'bill': return 'Hospital Bill Financial Summary';
    }
  };

  const getDoctorQuestions = () => {
    if ('doctorQuestions' in resultData && Array.isArray(resultData.doctorQuestions)) {
      return resultData.doctorQuestions;
    }
    if ('billingQuestions' in resultData && Array.isArray(resultData.billingQuestions)) {
      return resultData.billingQuestions;
    }
    return [
      'What are the next recommended steps for my health?',
      'Should I schedule a follow-up consultation?'
    ];
  };

  return (
    <ResultsLayout
      serviceType={serviceType}
      title={getPageTitle()}
      timestamp={resultData.timestamp}
      onNewAnalysis={onNewAnalysis}
      doctorQuestions={getDoctorQuestions()}
    >
      {serviceType === 'xray' && (
        <XRayResultView data={resultData as any} />
      )}
      {serviceType === 'prescription' && (
        <PrescriptionResultView data={resultData as any} />
      )}
      {serviceType === 'bill' && (
        <BillResultView data={resultData as any} />
      )}
    </ResultsLayout>
  );
};
