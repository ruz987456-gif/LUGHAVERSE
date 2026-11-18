import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, BookOpen } from 'lucide-react';
import { EducationLevel, TopicCategory } from '../types/curriculum';
import { VisualIllustration } from './VisualIllustration';

interface LevelViewProps {
  level: EducationLevel;
  onBackHome: () => void;
  onSelectTopic: (topic: TopicCategory) => void;
}

export const LevelView: React.FC<LevelViewProps> = ({
  level,
  onBackHome,
  onSelectTopic,
}) => {
  const [query, setQuery] = useState('');

  const filteredTopics = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return level.topics;
    return level.topics.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.focusTag.toLowerCase().includes(q)
    );
  }, [level.topics, query]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Compact Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-900 min-h-[40px] mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            {level.shortTitle} — {level.fullTitle}
          </h1>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari materi..."
            aria-label="Cari materi"
            className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-2xl bg-white border border-sky-100 shadow-xs text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      </div>

      {/* Topic Grid */}
      {filteredTopics.length === 0 ? (
        <div className="bg-white rounded-3xl border border-sky-100 p-10 text-center">
          <BookOpen className="w-8 h-8 text-sky-400 mx-auto mb-3" />
          <p className="text-base font-semibold text-slate-800">
            Materi tidak ditemukan
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-4 px-4 py-2 min-h-[44px] rounded-xl bg-sky-50 text-sky-700 text-sm font-semibold hover:bg-sky-100 transition-colors"
          >
            Tampilkan Semua
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredTopics.map((topic) => {
            const previewVisual = topic.items[0]?.visualKey || 'default';
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => onSelectTopic(topic)}
                className="group text-left bg-white rounded-2xl border border-sky-100 hover:border-sky-400 p-4 sm:p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600"
              >
                <VisualIllustration
                  visualKey={previewVisual}
                  label={topic.title}
                  size="sm"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-semibold text-sky-600 tabular-nums">
                    {topic.number}
                  </span>
                  <h2 className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors truncate">
                    {topic.title}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5 tabular-nums">
                    {topic.items.length} Kartu · {topic.exercises.length} Latihan
                  </p>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            );
          })}
        </div>
      )}
    </main>
  );
};
