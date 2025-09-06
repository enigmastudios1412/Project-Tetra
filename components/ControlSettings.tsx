import React from 'react';

interface ControlSettingsProps {
  theme: string;
  setTheme: (theme: string) => void;
  lighting: string;
  setLighting: (lighting: string) => void;
}

const themeOptions = [
  'Studio Professional',
  'Urban Street Style',
  'Outdoor Lifestyle',
  'Minimalist & Artsy',
  'Elegant & Luxury',
];

const lightingOptions = [
  'Natural Light',
  'Golden Hour',
  'Studio Lighting',
  'Dramatic / Moody',
];

export const ControlSettings: React.FC<ControlSettingsProps> = ({ theme, setTheme, lighting, setLighting }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label htmlFor="theme-select" className="block text-sm font-medium text-gray-600 mb-2">
          Photoshoot Theme
        </label>
        <div className="relative">
          <select
            id="theme-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full bg-white border-2 border-gray-900 text-gray-900 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition appearance-none pr-8"
          >
            {themeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
           <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-900">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
      <div>
        <label htmlFor="lighting-select" className="block text-sm font-medium text-gray-600 mb-2">
          Lighting Style
        </label>
         <div className="relative">
          <select
            id="lighting-select"
            value={lighting}
            onChange={(e) => setLighting(e.target.value)}
            className="w-full bg-white border-2 border-gray-900 text-gray-900 rounded-lg p-2.5 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition appearance-none pr-8"
          >
            {lightingOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-900">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
};
