import { ServiceType, AnyAnalysisResult } from '../types/medivision';

// Fallback to the live Render backend, but allow local override via .env or dynamic relative URL if hosted together
const getApiBaseUrl = (): string => {
  const envUrl = (import.meta as any).env.VITE_API_URL;
  if (envUrl) {
    return envUrl;
  }
  // If the frontend is served from the FastAPI backend on local testing, use relative URLs
  const port = window.location.port;
  if (port === '8000' || port === '8001') {
    return '';
  }
  // If running on Vercel (port is empty), or anywhere else, use the live Render backend
  return 'https://medivision-klek.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Sends a medical document or image to the FastAPI backend API for analysis.
 */
export const processDocument = async (
  file: File,
  serviceType: ServiceType,
  onProgressStep?: (step: number) => void
): Promise<AnyAnalysisResult> => {
  // Step 1: Upload received
  onProgressStep?.(1);
  await new Promise((res) => setTimeout(res, 500));

  // Step 2: Preparing document
  onProgressStep?.(2);
  await new Promise((res) => setTimeout(res, 500));

  // Step 3: Running AI Inference & Information Extraction
  onProgressStep?.(3);

  const formData = new FormData();
  formData.append('file', file);

  const endpoint = `${API_BASE_URL}/api/analyze/${serviceType}`;
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API analysis failed (${response.status}): ${errorText}`);
    }

    const result = await response.json();

    // Step 4: Generating patient summary
    onProgressStep?.(4);
    await new Promise((res) => setTimeout(res, 500));

    return result;
  } catch (error) {
    console.error('API Error during document processing:', error);
    throw error;
  }
};
