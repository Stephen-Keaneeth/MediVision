import React, { useState } from 'react';
import { ServiceType, UploadedFile, AnyAnalysisResult, HistoryItem } from './types/medivision';
import { sampleHistory } from './data/mockData';
import { processDocumentMock } from './services/apiMock';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { UploadPage } from './pages/UploadPage';
import { ProcessingPage } from './pages/ProcessingPage';
import { ResultsPage } from './pages/ResultsPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  // Navigation & Workflow state
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'processing' | 'results' | 'history' | 'settings'>('home');
  
  // Selected Service & Upload state
  const [selectedService, setSelectedService] = useState<ServiceType>('xray');
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  
  // Processing step (1 to 4)
  const [processingStep, setProcessingStep] = useState<number>(1);
  
  // Current analysis result data
  const [activeResultData, setActiveResultData] = useState<AnyAnalysisResult | null>(null);
  
  // Patient History state
  const [historyLog, setHistoryLog] = useState<HistoryItem[]>(sampleHistory);

  // Navigation handler
  const handleNavigate = (tab: string, service?: ServiceType) => {
    setActiveTab(tab);

    if (tab === 'home') {
      setCurrentView('home');
    } else if (tab === 'history') {
      setCurrentView('history');
    } else if (tab === 'settings') {
      setCurrentView('settings');
    } else if (service) {
      setSelectedService(service);
      setSelectedFile(null);
      setCurrentView('upload');
    }
  };

  // Start analysis trigger from Upload Component
  const handleStartAnalysis = async (fileObj: UploadedFile) => {
    setSelectedFile(fileObj);
    setCurrentView('processing');
    setProcessingStep(1);

    try {
      const result = await processDocumentMock(fileObj.file, selectedService, (step) => {
        setProcessingStep(step);
      });

      setActiveResultData(result);
      setCurrentView('results');

      // Add to history log
      const newHistoryItem: HistoryItem = {
        id: result.id,
        serviceType: selectedService,
        title: selectedService === 'xray' ? 'Chest X-Ray Observation' :
               selectedService === 'prescription' ? 'Prescription Analysis' : 'Medical Bill Summary',
        fileName: fileObj.name,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Completed',
        summarySnippet: selectedService === 'xray' ? 'Clear lungs, normal heart contour.' :
                        selectedService === 'prescription' ? `${(result as any).medicines?.length || 3} medicines extracted.` :
                        `Total ₹${((result as any).totalAmount || 14850.00).toLocaleString('en-IN')}.`,
        resultData: result
      };

      setHistoryLog(prev => [newHistoryItem, ...prev]);

    } catch (err) {
      console.error('Analysis failed', err);
      setCurrentView('upload');
    }
  };

  // View history item details
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSelectedService(item.serviceType);
    setActiveResultData(item.resultData);
    setActiveTab(item.serviceType);
    setCurrentView('results');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* Sticky Header Navigation */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenSettings={() => handleNavigate('settings')}
      />

      {/* Main Body Layout with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Desktop Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigate}
        />

        {/* Dynamic Main Content Container */}
        <main className="flex-1 lg:pl-8">
          
          {currentView === 'home' && (
            <HomePage
              onSelectService={(service) => handleNavigate(service, service)}
              onScrollToHowItWorks={() => {
                document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}

          {currentView === 'upload' && (
            <UploadPage
              serviceType={selectedService}
              onFileSelect={(file) => setSelectedFile(file)}
              onStartAnalysis={handleStartAnalysis}
              onCancel={() => setCurrentView('home')}
            />
          )}

          {currentView === 'processing' && (
            <ProcessingPage
              serviceType={selectedService}
              currentStep={processingStep}
            />
          )}

          {currentView === 'results' && activeResultData && (
            <ResultsPage
              serviceType={selectedService}
              resultData={activeResultData}
              onNewAnalysis={() => handleNavigate(selectedService, selectedService)}
            />
          )}

          {currentView === 'history' && (
            <HistoryPage
              historyItems={historyLog}
              onSelectHistoryItem={handleSelectHistoryItem}
              onNavigateToUpload={(service) => handleNavigate(service || 'xray', service || 'xray')}
            />
          )}

          {currentView === 'settings' && (
            <SettingsPage />
          )}

        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

    </div>
  );
};
