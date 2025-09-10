import React, { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { ApiKeyModal } from './components/ApiKeyModal';
import { generateImage } from './services/geminiService';
import type { AspectRatio } from './types';
import { PromptGenerator } from './components/PromptGenerator';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'prompt-enhancer' | 'video-generator'>('generator');
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [model, setModel] = useState<string>('imagen-4.0-generate-001');
  const [generatedImages, setGeneratedImages] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);

  useEffect(() => {
    // In a real environment, prefer environment variables.
    // For this self-contained app, we use localStorage.
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    } else {
      setIsApiKeyModalOpen(true); // Prompt for key if not found
    }
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('gemini_api_key', newKey);
    setIsApiKeyModalOpen(false);
    setError(null); // Clear previous errors
  };

  const handleGenerate = useCallback(async () => {
    if (!apiKey) {
      setError("Please set your Gemini API key before generating images.");
      setIsApiKeyModalOpen(true);
      return;
    }
    if (!prompt.trim()) {
      setError("Please enter a prompt to generate an image.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
      const imageUrls = await generateImage(prompt, aspectRatio, model, apiKey);
      setGeneratedImages(imageUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred during image generation.");
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio, model, apiKey]);

  const handleUsePrompt = (newPrompt: string) => {
    setPrompt(newPrompt);
    setActiveTab('generator');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header onApiKeyClick={() => setIsApiKeyModalOpen(true)} />
      <main className="flex-grow container max-w-screen-xl mx-auto px-4 py-8">
        
        <div className="mb-8 border-b border-gray-700">
          <nav className="-mb-px flex space-x-6" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('generator')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 focus:outline-none ${
                activeTab === 'generator'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500'
              }`}
              aria-current={activeTab === 'generator' ? 'page' : undefined}
            >
              Image Generator
            </button>
            <button
              onClick={() => setActiveTab('prompt-enhancer')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 focus:outline-none ${
                activeTab === 'prompt-enhancer'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500'
              }`}
              aria-current={activeTab === 'prompt-enhancer' ? 'page' : undefined}
            >
              Prompt Enhancer
            </button>
             <button
              onClick={() => setActiveTab('video-generator')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-200 focus:outline-none ${
                activeTab === 'video-generator'
                  ? 'border-purple-500 text-purple-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-500'
              }`}
              aria-current={activeTab === 'video-generator' ? 'page' : undefined}
            >
              Video Generator
            </button>
          </nav>
        </div>

        {activeTab === 'generator' && (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white">AI Image Generator</h2>
              <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                Describe your vision and let AI bring it to life. Choose your model and aspect ratio for the perfect shot.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <ControlPanel
                prompt={prompt}
                setPrompt={setPrompt}
                aspectRatio={aspectRatio}
                setAspectRatio={setAspectRatio}
                model={model}
                setModel={setModel}
                onGenerate={handleGenerate}
                isLoading={isLoading}
              />
              <ResultDisplay 
                images={generatedImages}
                isLoading={isLoading}
                error={error}
              />
            </div>
          </>
        )}
        
        {activeTab === 'prompt-enhancer' && (
          <PromptGenerator apiKey={apiKey} onUsePrompt={handleUsePrompt} />
        )}
        
        {activeTab === 'video-generator' && (
           <div className="text-center py-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Video Generator</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Coming soon.
            </p>
          </div>
        )}

      </main>
      <Footer />
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentApiKey={apiKey}
      />
    </div>
  );
};

export default App;
