import React from 'react';

interface HeaderProps {
  onApiKeyClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApiKeyClick }) => {
  return (
    <header className="bg-gray-950 border-b border-gray-700 sticky top-0 z-50">
      <div className="container max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
          <h1 className="text-xl font-bold text-white">
            AI Image Generator
          </h1>
        </div>
        <button
          onClick={onApiKeyClick}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-blue-500"
          aria-label="Set API Key"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.75a1.75 1.75 0 01-1.75-1.75V11a5.25 5.25 0 015.25-5.25H10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.75a1.75 1.75 0 01-1.75-1.75V11a5.25 5.25 0 015.25-5.25H10" />
          </svg>
        </button>
      </div>
    </header>
  );
};