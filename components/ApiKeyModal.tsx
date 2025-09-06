
import React, { useEffect, useState } from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
  currentApiKey: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave, currentApiKey }) => {
  const [apiKey, setApiKey] = useState(currentApiKey);

  useEffect(() => {
    setApiKey(currentApiKey);
  }, [currentApiKey]);

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

  const handleSave = () => {
    if (apiKey.trim()) {
      onSave(apiKey.trim());
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl w-full max-w-lg p-6 m-4 relative text-gray-100 transition-transform duration-300 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors p-2 rounded-full"
          aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.75a1.75 1.75 0 01-1.75-1.75V11a5.25 5.25 0 015.25-5.25H10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.75a1.75 1.75 0 01-1.75-1.75V11a5.25 5.25 0 015.25-5.25H10" />
          </svg>
          <h2 className="text-2xl font-bold">Set Your API Key</h2>
        </div>
        
        <div className="space-y-4 text-gray-300">
          <p>
            Please enter your Google Gemini API key. Your key will be saved in your browser's local storage and will not be shared.
          </p>
          <div>
            <label htmlFor="api-key-input" className="block text-sm font-medium text-gray-200 mb-2">
              Gemini API Key
            </label>
            <input 
              id="api-key-input"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full bg-gray-900 border-2 border-gray-600 text-gray-100 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Enter your API key..."
            />
          </div>
          
          <div className="mt-4 p-4 bg-yellow-900/30 border-l-4 border-yellow-500 text-yellow-300 rounded-r-lg">
            <p className="font-bold">Catatan Penting</p>
            <p className="text-sm">
              Model yang digunakan di aplikasi ini memerlukan proyek Google Cloud dengan <strong>penagihan (billing) yang aktif</strong> agar dapat berfungsi di luar Google AI Studio. Anda mungkin masih berada dalam batas penggunaan gratis, tetapi aktivasi penagihan adalah sebuah keharusan.
            </p>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
             <h4 className="text-sm font-semibold text-gray-200 mb-2">How to get your API Key:</h4>
             <ol className="list-decimal list-inside space-y-2 text-sm text-gray-400">
                <li>
                    Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-400 underline hover:text-blue-300">Google AI Studio</a>.
                </li>
                <li>Click on the <strong>"Get API key"</strong> button.</li>
                <li>In the dialog that appears, click on <strong>"Create API key in new project"</strong>.</li>
                <li>Copy the newly generated API key and paste it into the field above.</li>
             </ol>
          </div>

        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-all"
          >
            Save Key
          </button>
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