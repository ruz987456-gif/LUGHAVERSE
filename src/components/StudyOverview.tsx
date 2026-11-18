import React from 'react';
import { Volume2, BookText, MessagesSquare, Layers } from 'lucide-react';
import { TopicCategory } from '../types/curriculum';
import { VisualIllustration } from './VisualIllustration';

interface StudyOverviewProps {
  topic: TopicCategory;
  activeAudioId: string | null;
  onPlayAudio: (text: string, id: string) => void;
}

export const StudyOverview: React.FC<StudyOverviewProps> = ({
  topic,
  activeAudioId,
  onPlayAudio,
}) => {
  return (
    <div className="space-y-8">
      {/* Grammar Rules Section (if available) */}
      {topic.grammarRules && topic.grammarRules.length > 0 && (
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <Layers className="w-5 h-5 text-sky-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              Kaidah & Pola
            </h2>
          </div>

          <div className="space-y-6">
            {topic.grammarRules.map((rule, rIdx) => (
              <div
                key={rIdx}
                className={rIdx > 0 ? 'pt-6 border-t border-slate-200' : ''}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-semibold text-base sm:text-lg text-slate-900">
                    {rule.title}
                  </h3>
                  {rule.sourceBook && (
                    <span className="text-xs font-medium text-sky-700">
                      {rule.sourceBook}
                    </span>
                  )}
                </div>
                {rule.arabicFormula && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="mt-2 font-arabic text-xl sm:text-2xl font-bold text-sky-800 bg-sky-50 border border-sky-200 rounded-xl px-4 py-3 text-center"
                  >
                    {rule.arabicFormula}
                  </p>
                )}
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {rule.explanation}
                </p>

                <div className="mt-4 divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                  {rule.examples.map((ex, eIdx) => {
                    const audioId = `rule-${rIdx}-${eIdx}`;
                    const playing = activeAudioId === audioId;
                    return (
                      <div
                        key={eIdx}
                        className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <p
                            dir="rtl"
                            lang="ar"
                            className="font-arabic text-xl sm:text-2xl font-semibold text-slate-900 text-right sm:text-left"
                          >
                            {ex.arabic}
                          </p>
                          <p className="text-xs sm:text-sm text-sky-700 font-medium mt-0.5">
                            {ex.transliteration}
                          </p>
                          <p className="text-sm text-slate-700 mt-0.5">
                            {ex.indonesian}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onPlayAudio(ex.arabic, audioId)}
                          className={`inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold border transition-colors shrink-0 self-end sm:self-center ${
                            playing
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                          }`}
                        >
                          <Volume2 className="w-4 h-4" />
                          <span>{playing ? 'Memutar' : 'Dengar'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Dialogue Section (if available) */}
      {topic.dialogue && topic.dialogue.length > 0 && (
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-5">
            <MessagesSquare className="w-5 h-5 text-sky-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              Percakapan (الْحِوَارُ)
            </h2>
          </div>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {topic.dialogue.map((line, idx) => {
              const audioId = `dialogue-${topic.id}-${idx}`;
              const playing = activeAudioId === audioId;
              return (
                <div
                  key={idx}
                  className="p-4 sm:p-5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-sky-700 block mb-1">
                      {line.speaker}
                    </span>
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl sm:text-2xl font-semibold text-slate-900 text-right sm:text-left"
                    >
                      {line.arabic}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      {line.transliteration}
                    </p>
                    <p className="text-sm text-slate-700 mt-1">
                      {line.indonesian}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onPlayAudio(line.arabic, audioId)}
                    className={`inline-flex items-center gap-2 px-4 py-2 min-h-[44px] rounded-xl text-xs font-semibold border transition-colors shrink-0 self-end sm:self-center ${
                      playing
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{playing ? 'Memutar...' : 'Putar Dialog'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Reading Passage Section (if available) */}
      {topic.passage && (
        <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-4">
            <BookText className="w-5 h-5 text-sky-600" />
            <h2 className="font-display text-xl font-bold text-slate-900">
              Bacaan (الْقِرَاءَةُ)
            </h2>
          </div>

          <div className="pb-4 mb-5 border-b border-slate-200">
            <h3
              dir="rtl"
              lang="ar"
              className="font-arabic text-2xl sm:text-3xl font-bold text-sky-900 text-right"
            >
              {topic.passage.titleArabic}
            </h3>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {topic.passage.titleIndonesian}
            </p>
          </div>

          <div className="space-y-6">
            {topic.passage.paragraphs.map((para, pIdx) => {
              const audioId = `passage-${topic.id}-${pIdx}`;
              const playing = activeAudioId === audioId;
              return (
                <div key={pIdx} className="space-y-3">
                  <div className="flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => onPlayAudio(para.arabic, audioId)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold border transition-colors ${
                        playing
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{playing ? 'Memutar Paragraf...' : 'Dengarkan Teks'}</span>
                    </button>
                  </div>
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-2xl sm:text-[26px] text-slate-900 bg-sky-50/60 border border-sky-100 rounded-xl p-5"
                  >
                    {para.arabic}
                  </p>
                  {para.transliteration && (
                    <p className="text-xs sm:text-sm text-sky-700 italic">
                      {para.transliteration}
                    </p>
                  )}
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {para.indonesian}
                  </p>
                </div>
              );
            })}
          </div>

          {topic.passage.keyVocabulary.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-3">
                Kosakata Kunci dalam Teks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {topic.passage.keyVocabulary.map((kv, kIdx) => (
                  <div
                    key={kIdx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic-compact text-lg font-bold text-sky-900"
                    >
                      {kv.arabic}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-700 mt-1">
                      {kv.indonesian}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Complete Vocabulary & Concept Reference Grid */}
      <section className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold text-slate-900 mb-5 tabular-nums">
          Daftar Materi ({topic.items.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topic.items.map((item) => {
            const audioId = `overview-${item.id}`;
            const playing = activeAudioId === audioId;
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-4 rounded-2xl border border-sky-100 bg-sky-50/30"
              >
                <div className="flex items-center gap-4">
                  <VisualIllustration
                    visualKey={item.visualKey}
                    label={item.indonesian}
                    size="sm"
                  />
                  <div className="flex-1 min-w-0">
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic-compact text-xl sm:text-2xl font-bold text-slate-900 text-right sm:text-left"
                    >
                      {item.arabic}
                    </p>
                    <p className="text-xs font-medium text-sky-700 mt-0.5">
                      {item.transliteration}
                    </p>
                    <p className="text-sm font-semibold text-slate-800">
                      {item.indonesian}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onPlayAudio(item.arabic, audioId)}
                    aria-label={`Putar pelafalan ${item.indonesian}`}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors shrink-0 ${
                      playing
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white hover:bg-sky-50 text-sky-700 border-slate-200'
                    }`}
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                {(item.kaidahSummary || item.kaidahSource) && (
                  <div className="pt-2.5 border-t border-sky-100 text-xs text-slate-600 space-y-1">
                    {item.kaidahSource && (
                      <p className="font-semibold text-sky-800">
                        Kaidah · {item.kaidahSource}
                      </p>
                    )}
                    {item.kaidahSummary && (
                      <p className="leading-relaxed">{item.kaidahSummary}</p>
                    )}
                    {item.exampleArabic && (
                      <p
                        dir="rtl"
                        lang="ar"
                        className="font-arabic-compact text-base font-semibold text-slate-900 pt-1 text-right"
                      >
                        {item.exampleArabic}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
