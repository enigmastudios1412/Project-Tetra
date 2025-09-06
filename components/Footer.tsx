import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-12">
      <div className="container max-w-screen-xl mx-auto px-4 py-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} AI Image Generator. Powered by Google Gemini.</p>
        <p className="text-sm mt-2">Version 2.0</p>
      </div>
    </footer>
  );
};
