import React from 'react';
import type { AspectRatio } from '../types';
import { Spinner } from './Spinner';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
  model: string;
  setModel: (model: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const aspectRatios: { label: string; value: AspectRatio }[] = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Landscape (16:9)', value: '16:9' },
  { label: 'Portrait (9:16)', value: '9:16' },
  { label: 'Standard (4:3)', value: '4:3' },
  { label: 'Tall (3:4)', value: '3:4' },
];

const models = [
  { label: 'Imagen 4', value: 'imagen-4.0-generate-001' },
  // Note: Other models are shown for illustrative purposes but disabled as they are not available via this API.
  { label: 'Imagen 4 Fast', value: 'imagen-4-fast', disabled: true },
  { label: 'Imagen 4 Ultra', value: 'imagen-4-ultra', disabled: true },
  { label: 'Imagen 3', value: 'imagen-3', disabled: true },
];

export const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  setPrompt,
  aspectRatio,
  setAspectRatio,
  model,
  setModel,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 space-y-6 sticky top-24">
      
      <div>
        <label htmlFor="prompt-input" className="block text-lg font-semibold text-gray-200 mb-2">
          1. Write Your Prompt
        </label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., A cinematic shot of a raccoon astronaut in a retro space suit, gazing at Earth from the moon."
          className="w-full bg-gray-900 border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px] resize-y"
          rows={5}
        />
      </div>

      <div>
        <label className="block text-lg font-semibold text-gray-200 mb-3">
          2. Select Aspect Ratio
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {aspectRatios.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setAspectRatio(value)}
              className={`p-3 rounded-lg border-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
                aspectRatio === value
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
              }`}
              aria-pressed={aspectRatio === value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      
      <div>
        <label htmlFor="model-select" className="block text-lg font-semibold text-gray-200 mb-2">
          3. Choose Engine
        </label>
        <select
          id="model-select"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full bg-gray-900 border border-gray-600 text-gray-100 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition disabled:opacity-50"
        >
          {models.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="pt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed text-white font-bold py-3 px-10 rounded-lg text-lg transition-all duration-200 ease-in-out w-full flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <Spinner />
              <span>Generating...</span>
            </>
          ) : (
            'Generate Image'
          )}
        </button>
      </div>
    </div>
  );
};