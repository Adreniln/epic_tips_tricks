import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info, MousePointer, X, ArrowRight, HelpCircle } from 'lucide-react';

const GuideIntroduction = () => {
  const [showGuide, setShowGuide] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenGuide, setHasSeenGuide] = useState(false);

  // Check if user has seen guide before
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem('hasSeenEpicGuide');
    setHasSeenGuide(!!hasSeenBefore);
    if (!hasSeenBefore) {
      setShowGuide(true);
      localStorage.setItem('hasSeenEpicGuide', 'true');
    }
  }, []);

  const steps = [
    {
      title: "Welcome to Epic Quick Tips!",
      description: "This tool helps pharmacy staff discover helpful Epic features and shortcuts to make your daily workflow easier.",
      icon: <Info className="w-6 h-6 text-blue-500" />
    },
    {
      title: "How to Use This Guide",
      description: "Click on any category card to explore specific features. Look for the 'Nov 2024' badges to find the newest updates.",
      icon: <MousePointer className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Watch and Learn",
      description: "Many features include step-by-step instructions and video tutorials to help you master new workflows.",
      icon: <ArrowRight className="w-6 h-6 text-blue-500" />
    }
  ];

  const handleClose = () => {
    setShowGuide(false);
    setCurrentStep(0); // Reset to first step when closing
  };

  // Help button that floats in the corner
  const HelpButton = () => (
    <button
      onClick={() => setShowGuide(true)}
      className="fixed bottom-6 right-6 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 group"
      aria-label="Show Guide"
    >
      <HelpCircle className="w-6 h-6 text-blue-600" />
      <span className="absolute right-full mr-2 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Show Guide
      </span>
    </button>
  );

  // Modal Guide Content
  const GuideModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-lg w-full bg-white shadow-xl">
        <CardContent className="pt-6">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              {steps[currentStep].icon}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-700">
                  {steps[currentStep].title}
                </h3>
                <p className="mt-2 text-gray-600">
                  {steps[currentStep].description}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex space-x-2">
                {steps.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-2 rounded-full ${
                      idx === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <div className="flex space-x-3">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    Back
                  </button>
                )}

                {currentStep < steps.length - 1 ? (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleClose}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Get Started
                  </button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <>
      {showGuide && <GuideModal />}
      <HelpButton />
    </>
  );
};

export default GuideIntroduction;