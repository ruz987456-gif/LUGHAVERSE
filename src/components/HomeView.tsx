import React from 'react';
import { ArrowRight } from 'lucide-react';
import { EducationLevel, LevelId } from '../types/curriculum';

interface HomeViewProps {
  levels: EducationLevel[];
  onSelectLevel: (levelId: LevelId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ levels, onSelectLevel }) => {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-12 min-h-[calc(100dvh-56px)] flex flex-col justify-center">
      {/* Clean Minimal Heading */}
      <div className="text-center max-w-xl mx-auto mb-4 sm:mb-10">
        <h1 className="font-display text-2xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 tracking-tight [text-wrap:balance]">
          Pilih Jenjang
        </h1>
      </div>

      {/* 4 Clean Education Level Buttons (2x2 on mobile so all 4 fit without scrolling) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {levels.map((level) => (
          <button
            key={level.id}
            type="button"
            onClick={() => onSelectLevel(level.id)}
            className="group text-left bg-white rounded-2xl sm:rounded-3xl border border-sky-100 hover:border-sky-400 shadow-sm hover:shadow-xl hover:shadow-sky-900/5 hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
          >
            {/* Illustration */}
            <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full bg-sky-50 overflow-hidden">
              <img
                src={level.heroImage}
                alt={level.fullTitle}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>

            {/* Minimal Button Label */}
            <div className="p-3 sm:p-5 flex items-center justify-between gap-2 sm:gap-3 flex-1">
              <div className="min-w-0">
                <h2 className="font-display text-base sm:text-xl lg:text-2xl font-bold text-slate-900 group-hover:text-sky-700 transition-colors leading-tight">
                  {level.shortTitle}
                </h2>
                {level.fullTitle !== level.shortTitle && (
                  <p className="hidden sm:block text-xs sm:text-sm text-slate-500 mt-0.5">
                    {level.fullTitle}
                  </p>
                )}
              </div>

              <span className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-sky-50 group-hover:bg-sky-600 text-sky-700 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </main>
  );
};
