import React, { useState } from 'react';
import { enhancePrompt } from '../services/geminiService';
import { Spinner } from './Spinner';

interface PromptGeneratorProps {
  apiKey: string;
  onUsePrompt: (prompt: string) => void;
}

const QUICK_ELEMENTS = [
  {
    id: 'lighting',
    title: 'LIGHTING',
    keywords: ['Soft studio light', 'Golden hour sunlight', 'Dramatic rim lighting', 'Neon glow', 'Chiaroscuro lighting', 'Moonlight'],
  },
  {
    id: 'lens',
    title: 'LENS & CAMERA EFFECTS',
    keywords: ['85mm f/1.4 lens', '35mm lens', 'Cinematic bokeh', 'Shallow depth of field', 'Motion blur', 'Fisheye lens effect'],
  },
  {
    id: 'style',
    title: 'STYLE & AESTHETICS',
    keywords: ['Vintage film look', 'Sci-fi aesthetic', 'Minimalist composition', 'Hyperrealistic detail', 'Impressionistic style', 'Gothic fashion'],
  },
  {
    id: 'mood',
    title: 'MOOD & EMOTION',
    keywords: ['Serene and contemplative', 'Energetic and joyful', 'Mysterious and enigmatic', 'Powerful and confident', 'Dreamy and ethereal', 'Playful and whimsical'],
  },
];

const Accordion: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void }> = ({ title, children, isOpen, onToggle }) => (
  <div className="border border-gray-700 bg-gray-900/50 rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-200 hover:bg-gray-800/60 transition-colors"
      aria-expanded={isOpen}
    >
      <span>{title}</span>
      <svg
        className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
      <div className="overflow-hidden">
        <div className="p-4 border-t border-gray-700">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({ apiKey, onUsePrompt }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<string[]>(['lighting']);
  const [copied, setCopied] = useState(false);

  const handleKeywordClick = (keyword: string) => {
    setPrompt(prev => (prev ? `${prev}, ${keyword}` : keyword));
  };

  const handleAccordionToggle = (id: string) => {
    setOpenAccordions(prev =>
      prev.includes(id) ? prev.filter(accId => accId !== id) : [...prev, id]
    );
  };

  const handleAutoEnhance = async () => {
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt(null);
    try {
      const enhanced = await enhancePrompt(prompt, apiKey);
      setGeneratedPrompt(enhanced);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
        console.error("Failed to copy text: ", err);
        setError("Failed to copy prompt to clipboard.");
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <label htmlFor="prompt-idea" className="block text-lg font-semibold text-gray-200 mb-2">
          Your Initial Idea or Prompt
        </label>
        <textarea
          id="prompt-idea"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A model in a red dress, mystical forest setting..."
          className="w-full bg-gray-800 border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition min-h-[120px] resize-y"
          rows={4}
        />
        <p className="text-sm text-gray-400 mt-2">
          This prompt will be used as a base for the features below.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-200 mb-3">Quick Elements (Click to Add Keywords)</h3>
        <div className="space-y-3">
          {QUICK_ELEMENTS.map(section => (
            <Accordion
              key={section.id}
              title={section.title}
              isOpen={openAccordions.includes(section.id)}
              onToggle={() => handleAccordionToggle(section.id)}
            >
              <div className="flex flex-wrap gap-2">
                {section.keywords.map(keyword => (
                  <button
                    key={keyword}
                    onClick={() => handleKeywordClick(keyword)}
                    className="bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-1.5 px-3 rounded-full text-sm transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </Accordion>
          ))}
        </div>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-2">Auto-Enhance Your Prompt</h3>
        <p className="text-gray-400 mb-4">
          Let AI automatically enrich your initial prompt with professional photography details like lighting, lens effects, wardrobe, emotion, and background. If you leave the initial prompt empty, the AI will generate a creative model photography concept from scratch.
        </p>
        <button
          onClick={handleAutoEnhance}
          disabled={isLoading}
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg text-lg transition-all w-full sm:w-auto flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Spinner />
              <span>Enhancing...</span>
            </>
          ) : (
            'Auto-Enhance Prompt'
          )}
        </button>
      </div>

      <div className="mt-8">
        {isLoading && (
            <div className="flex items-center justify-center p-6 bg-gray-800/50 border border-gray-700 rounded-xl">
                <Spinner />
                <p className="ml-3 text-gray-400">Generating enhanced prompt...</p>
            </div>
        )}
        {error && !isLoading && (
            <div className="mt-4 text-red-400 bg-red-900/30 p-4 rounded-lg border border-red-500/50">
                <p><span className="font-bold">Error:</span> {error}</p>
            </div>
        )}
        {generatedPrompt && !isLoading && (
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Generated Prompts</h3>
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <p className="text-gray-300 flex-grow pr-4">
                            <span className="text-purple-400 font-semibold mr-2">1.</span>
                            {generatedPrompt}
                        </p>
                        <button 
                            onClick={() => handleCopy(generatedPrompt)}
                            className="text-gray-300 hover:text-white transition-colors text-sm font-semibold flex-shrink-0 py-1 px-4 bg-gray-700 hover:bg-gray-600 rounded-md"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                    <div className="pt-2">
                        <button
                            onClick={() => onUsePrompt(generatedPrompt)}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
                        >
                            Use for Image Generation
                        </button>
                    </div>
                </div>
            </div>
        )}
      </div>

    </div>
  );
};