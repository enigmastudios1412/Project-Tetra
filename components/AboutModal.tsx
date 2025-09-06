import React, { useEffect } from 'react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-xl border-2 border-gray-900 shadow-[8px_8px_0px_#111827] w-full max-w-lg p-6 m-4 relative text-gray-900 transition-transform duration-300 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-3 mb-4">
            <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <h2 className="text-2xl font-bold">About Stylook</h2>
        </div>
        
        <div className="space-y-4 text-gray-600">
          <p>
            This application is a powerful visual content generator designed for affiliate marketers, e-commerce owners, and content creators.
          </p>
          <p>
            It leverages the cutting-edge capabilities of <strong className="text-gray-900">Google's Gemini AI</strong> to help you create stunning product imagery in seconds.
          </p>
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong className="font-semibold">Lookbook Mode:</strong> Upload a model and a product to generate a full fashion lookbook with 6 unique poses and settings.
              </li>
              <li>
                <strong className="font-semibold">B-roll Mode:</strong> Upload a single product to generate 6 professional, high-quality B-roll shots, perfect for any product category.
              </li>
               <li>
                <strong className="font-semibold">Video Prompts:</strong> Instantly generate creative motion prompts for your images, ready to be used in AI video generation platforms.
              </li>
            </ul>
          </div>
          <p>
            Customize your output with various photoshoot themes and lighting styles to perfectly match your brand's aesthetic.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};