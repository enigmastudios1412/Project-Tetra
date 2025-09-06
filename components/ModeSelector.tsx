import React from 'react';

type GenerationMode = 'lookbook' | 'b-roll' | 'pose';

interface ModeSelectorProps {
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ mode, setMode }) => {
  const baseButtonClasses = "w-full text-center font-semibold p-3 rounded-lg border-2 border-gray-900 transition-all duration-200";
  const activeButtonClasses = "bg-gray-900 text-white shadow-[2px_2px_0px_#111827]";
  const inactiveButtonClasses = "bg-white text-gray-900 hover:bg-gray-100";

  return (
    <div className="rounded-lg border-2 border-gray-900 overflow-hidden">
        <div className="bg-gray-900 text-white p-4">
            <h3 className="text-lg font-semibold">Select Generation Mode</h3>
            <p className="text-sm text-gray-300">Choose what you want to create.</p>
        </div>
        <div className="p-4 bg-white">
            <div className="grid grid-cols-3 gap-4">
                <button 
                    onClick={() => setMode('lookbook')}
                    className={`${baseButtonClasses} ${mode === 'lookbook' ? activeButtonClasses : inactiveButtonClasses}`}
                    aria-pressed={mode === 'lookbook'}
                >
                    Lookbook
                </button>
                <button 
                    onClick={() => setMode('b-roll')}
                    className={`${baseButtonClasses} ${mode === 'b-roll' ? activeButtonClasses : inactiveButtonClasses}`}
                    aria-pressed={mode === 'b-roll'}
                >
                    B-roll
                </button>
                <button 
                    onClick={() => setMode('pose')}
                    className={`${baseButtonClasses} ${mode === 'pose' ? activeButtonClasses : inactiveButtonClasses}`}
                    aria-pressed={mode === 'pose'}
                >
                    Pose
                </button>
            </div>
        </div>
    </div>
  );
};