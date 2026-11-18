import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { LevelId } from '../types/curriculum';

interface NavbarProps {
  currentView: 'home' | 'level' | 'topic';
  selectedLevelId: LevelId | null;
  onGoHome: () => void;
  onSelectLevel: (levelId: LevelId) => void;
}

const navLevels: { id: LevelId; label: string }[] = [
  { id: 'sd', label: 'SD' },
  { id: 'smp', label: 'SMP' },
  { id: 'sma', label: 'SMA' },
  { id: 'pt', label: 'Perguruan Tinggi' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  selectedLevelId,
  onGoHome,
  onSelectLevel,
}) => {
  return (
    <header className="sticky top-0 z-40 h-14 bg-white/85 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={onGoHome}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 rounded-lg py-1 shrink-0"
        >
          <img
            src="/assets/aistudio/file_000000001eb48211b201594bed1ca3e5_b3a4c42c.png"
            alt="Logo LUGHAVERSE"
            className="w-9 h-9 rounded-xl object-contain bg-white border border-sky-100 p-0.5 shrink-0"
          />
          <span className="font-display font-bold text-lg tracking-tight text-sky-900 whitespace-nowrap shrink-0">
            LUGHAVERSE
          </span>
        </button>

        {/* Zone 2: Level Navigation (shown when inside a level/topic so Home stays pure) */}
        {currentView !== 'home' && (
          <nav
            aria-label="Navigasi jenjang"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {navLevels.map((lvl) => {
              const isActive = selectedLevelId === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => onSelectLevel(lvl.id)}
                  className={`py-1 transition-colors whitespace-nowrap shrink-0 border-b-2 ${
                    isActive
                      ? 'border-sky-600 text-sky-700 font-semibold'
                      : 'border-transparent hover:text-sky-700'
                  }`}
                >
                  {lvl.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Zone 3: Back Action */}
        <div className="flex items-center shrink-0">
          {currentView !== 'home' && (
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Beranda</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
