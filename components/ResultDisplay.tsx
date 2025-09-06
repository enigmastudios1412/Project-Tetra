import React, { useState } from 'react';
import { Spinner } from './Spinner';
import { ImageZoomModal } from './ImageZoomModal';

interface ResultDisplayProps {
  images: string[] | null;
  isLoading: boolean;
  error: string | null;
}

const Placeholder: React.FC = () => (
  <div className="text-center text-gray-500">
    <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
    <p className="mt-4 text-xl font-semibold">Your generated images will appear here.</p>
    <p className="mt-2 text-md">Write a prompt, select your settings, and click "Generate Image" to start.</p>
  </div>
);

const LoadingState: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <Spinner />
    <p className="mt-4 text-lg text-gray-400">Generating your masterpiece...</p>
    <p className="text-sm text-gray-500">This can take a moment.</p>
  </div>
);

const ErrorState: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-red-400 bg-red-900/30 p-4 rounded-lg border border-red-500">
    <p className="font-semibold">An Error Occurred</p>
    <p className="text-sm mt-1">{message}</p>
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ images, isLoading, error }) => {
  const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);
  
  const handleZoomIn = (imageUrl: string) => setZoomedImageUrl(imageUrl);
  const handleZoomOut = () => setZoomedImageUrl(null);

  const renderContent = () => {
    if (isLoading) return <LoadingState />;
    if (error) return <ErrorState message={error} />;
    if (images && images.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
             <div key={index} className="relative group aspect-auto">
                <img src={image} alt={`Generated result ${index + 1}`} className="rounded-lg w-full h-full object-contain" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 rounded-lg">
                    <div className="flex items-center space-x-4">
                        <button 
                          onClick={() => handleZoomIn(image)}
                          className="bg-gray-100 hover:bg-white text-gray-900 font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105 flex items-center space-x-2"
                          aria-label="Zoom in on image"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                          <span>Zoom</span>
                        </button>
                        <a
                          href={image}
                          download={`generated-image-${index + 1}.png`}
                          className="bg-gray-100 hover:bg-white text-gray-900 font-bold py-2 px-4 rounded-lg transition-transform hover:scale-105 flex items-center space-x-2"
                          aria-label="Download image"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span>Download</span>
                        </a>
                    </div>
                </div>
              </div>
          ))}
        </div>
      );
    }
    return <Placeholder />;
  };

  return (
    <div className="w-full bg-gray-800/50 border border-gray-700 rounded-xl p-4 min-h-[500px] flex justify-center items-center sticky top-24">
      <div className="w-full text-center">
        {renderContent()}
      </div>
      <ImageZoomModal imageUrl={zoomedImageUrl} onClose={handleZoomOut} />
    </div>
  );
};