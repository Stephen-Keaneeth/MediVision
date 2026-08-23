import React from 'react';
import { ServiceType, UploadedFile } from '../types/medivision';
import { UploadMedicalFile } from '../components/upload/UploadMedicalFile';

interface Props {
  serviceType: ServiceType;
  onFileSelect: (file: UploadedFile) => void;
  onStartAnalysis: (file: UploadedFile) => void;
  onCancel: () => void;
}

export const UploadPage: React.FC<Props> = ({
  serviceType,
  onFileSelect,
  onStartAnalysis,
  onCancel
}) => {
  return (
    <div className="py-6">
      <UploadMedicalFile
        serviceType={serviceType}
        onFileSelect={onFileSelect}
        onStartAnalysis={onStartAnalysis}
        onCancel={onCancel}
      />
    </div>
  );
};
