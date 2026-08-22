import React from 'react';
import { ServiceType } from '../types/medivision';
import { ProcessingStepper } from '../components/processing/ProcessingStepper';

interface Props {
  serviceType: ServiceType;
  currentStep: number;
}

export const ProcessingPage: React.FC<Props> = ({ serviceType, currentStep }) => {
  return (
    <div className="py-12">
      <ProcessingStepper serviceType={serviceType} currentStep={currentStep} />
    </div>
  );
};
