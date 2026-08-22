import React, { useState, useRef } from 'react';
import { 
  FileScan, FileText, Receipt, UploadCloud, File, Image as ImageIcon, 
  Trash2, ShieldCheck, AlertCircle, Sparkles, CheckCircle2, FileType
} from 'lucide-react';
import { ServiceType, UploadedFile } from '../../types/medivision';

interface Props {
  serviceType: ServiceType;
  onFileSelect: (file: UploadedFile) => void;
  onStartAnalysis: (file: UploadedFile) => void;
  onCancel?: () => void;
}

export const UploadMedicalFile: React.FC<Props> = ({
  serviceType,
  onStartAnalysis,
  onCancel
}) => {
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Module Specific Branding & Rules
  const moduleConfig = {
    xray: {
      title: 'X-Ray Image Screening',
      subtitle: 'Upload a clear thoracic or skeletal X-ray image for AI structural analysis.',
      icon: FileScan,
      allowedFormatsStr: 'JPG, JPEG, PNG, DICOM (.dcm)',
      allowedExts: ['jpg', 'jpeg', 'png', 'dcm', 'dicom'],
      sampleFileName: 'sample_chest_xray.png',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    prescription: {
      title: 'Prescription Understanding',
      subtitle: 'Upload a prescription photo or PDF to extract medicine names, dosages, and dosage timings.',
      icon: FileText,
      allowedFormatsStr: 'JPG, PNG, PDF',
      allowedExts: ['jpg', 'jpeg', 'png', 'pdf'],
      sampleFileName: 'dr_prescription_sample.jpg',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200'
    },
    bill: {
      title: 'Medical Bill & Invoice Summary',
      subtitle: 'Upload a hospital or pharmacy bill to break down individual line items, test charges, and totals.',
      icon: Receipt,
      allowedFormatsStr: 'JPG, PNG, PDF',
      allowedExts: ['jpg', 'jpeg', 'png', 'pdf'],
      sampleFileName: 'hospital_invoice_sample.pdf',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  }[serviceType];

  const ModuleIcon = moduleConfig.icon;

  const validateFile = (file: File): boolean => {
    setErrorMessage(null);
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!moduleConfig.allowedExts.includes(ext)) {
      setErrorMessage(`Invalid format. Please upload a file with format: ${moduleConfig.allowedFormatsStr}`);
      return false;
    }
    // Max size 15MB
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds 15MB. Please upload a smaller document.');
      return false;
    }
    return true;
  };

  const processSelectedFile = (file: File) => {
    if (!validateFile(file)) return;

    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    const sizeFormatted = file.size > 1024 * 1024 ? `${sizeInMB} MB` : `${(file.size / 1024).toFixed(0)} KB`;
    
    // Generate preview URL if image
    let previewUrl = '';
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }

    const uploadedObj: UploadedFile = {
      file,
      name: file.name,
      sizeFormatted,
      type: file.type || extToType(file.name),
      previewUrl
    };

    setSelectedFile(uploadedObj);
  };

  const extToType = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') return 'application/pdf';
    return 'image/png';
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
  };

  const handleLoadSample = () => {
    setErrorMessage(null);
    const sampleBlob = new Blob(['sample content'], { type: 'image/png' });
    const sampleFile = Object.assign(sampleBlob, { name: moduleConfig.sampleFileName }) as File;
    
    setSelectedFile({
      file: sampleFile,
      name: moduleConfig.sampleFileName,
      sizeFormatted: '1.4 MB',
      type: 'image/png',
      previewUrl: '' // Will show fallback illustration
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Selected Module Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-xl bg-teal-700 text-white flex items-center justify-center shadow-md shadow-teal-700/20 flex-shrink-0 mt-0.5">
            <ModuleIcon className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{moduleConfig.title}</h2>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${moduleConfig.badgeColor}`}>
                Ready
              </span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{moduleConfig.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Drag-and-Drop Area */}
      {!selectedFile ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all bg-white ${
            dragActive
              ? 'border-teal-600 bg-teal-50/50 scale-[1.01]'
              : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50/60'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInputChange}
            accept={serviceType === 'xray' ? '.jpg,.jpeg,.png,.dcm' : '.jpg,.jpeg,.png,.pdf'}
            className="hidden"
          />

          <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-700 mx-auto flex items-center justify-center mb-4 border border-teal-100 shadow-inner">
            <UploadCloud className="w-8 h-8" />
          </div>

          <h3 className="text-base font-bold text-slate-900 mb-1">
            Drag and drop your document here
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Supported Formats: <span className="font-semibold text-slate-700">{moduleConfig.allowedFormatsStr}</span> (Max 15MB)
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-teal-700/20 transition-all text-sm flex items-center justify-center gap-2"
            >
              <FileType className="w-4 h-4" />
              <span>Browse Files</span>
            </button>

            <button
              type="button"
              onClick={handleLoadSample}
              className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl transition-colors text-xs flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Use Demo Sample</span>
            </button>
          </div>

          {/* Format Chips */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-center space-x-3 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Encrypted Transmission
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" /> Auto OCR Extraction
            </span>
          </div>

        </div>
      ) : (
        /* Selected File Card Preview */
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                {selectedFile.type.includes('pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">{selectedFile.sizeFormatted} • Ready for analysis</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
              title="Remove file"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Visual Thumbnail or Document Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-center min-h-[160px]">
            {selectedFile.previewUrl ? (
              <img 
                src={selectedFile.previewUrl} 
                alt="Document preview" 
                className="max-h-48 rounded-lg object-contain border border-slate-300 shadow-xs" 
              />
            ) : (
              <div className="text-center p-4">
                <File className="w-12 h-12 text-teal-600 mx-auto mb-2 opacity-80" />
                <span className="text-xs font-semibold text-slate-700">{selectedFile.name}</span>
                <p className="text-[11px] text-slate-400 mt-0.5">Sample medical document loaded</p>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center justify-end space-x-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={() => onStartAnalysis(selectedFile)}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-700 to-teal-800 hover:from-teal-800 hover:to-teal-900 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-teal-700/25 transition-all text-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              <span>Analyze Document</span>
            </button>
          </div>
        </div>
      )}

      {/* Validation Error Banner */}
      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Security & Ownership Notices */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-800 block mb-0.5">Secure Document Handling</span>
            Uploaded files are processed locally and securely handled for patient privacy.
          </div>
        </div>

        <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start space-x-2.5 text-amber-950">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-950 block mb-0.5">Ownership Notice</span>
            Please avoid uploading health records or prescriptions that do not belong to you.
          </div>
        </div>
      </div>

    </div>
  );
};
