import { ServiceType, AnyAnalysisResult, HistoryItem } from '../types/medivision';
import { sampleXRayResult, samplePrescriptionResult, sampleBillResult, sampleHistory } from '../data/mockData';

/**
 * MediVision AI Mock API Service
 * 
 * DESIGNED FOR EASY BACKEND INTEGRATION:
 * To connect to a real backend:
 * 1. Replace the simulated setTimeout delays with real fetch() or axios calls.
 * 2. Return backend JSON matching the TypeScript interfaces in types/medivision.ts.
 */

export const processDocumentMock = async (
  file: File,
  serviceType: ServiceType,
  onProgressStep?: (step: number) => void
): Promise<AnyAnalysisResult> => {
  // Step 1: Upload received (0 - 500ms)
  onProgressStep?.(1);
  await new Promise((res) => setTimeout(res, 600));

  // Step 2: Preparing document (500 - 1200ms)
  onProgressStep?.(2);
  await new Promise((res) => setTimeout(res, 800));

  // Step 3: Extracting information (1200 - 2000ms)
  onProgressStep?.(3);
  await new Promise((res) => setTimeout(res, 1000));

  // Step 4: Generating patient summary (2000 - 2500ms)
  onProgressStep?.(4);
  await new Promise((res) => setTimeout(res, 600));

  // Return realistic mock response based on service type
  switch (serviceType) {
    case 'xray':
      return {
        ...sampleXRayResult,
        id: `xray-${Date.now()}`,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      };
    case 'prescription':
      return {
        ...samplePrescriptionResult,
        id: `rx-${Date.now()}`,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      };
    case 'bill':
      return {
        ...sampleBillResult,
        id: `bill-${Date.now()}`,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
        })
      };
    default:
      throw new Error(`Unsupported service type: ${serviceType}`);
  }
};

export const fetchHistoryMock = async (): Promise<HistoryItem[]> => {
  await new Promise((res) => setTimeout(res, 400));
  return sampleHistory;
};
