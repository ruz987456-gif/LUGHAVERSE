import React, { useEffect, useState } from 'react';
import {
  Volume2,
  Repeat,
  Square,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  ArrowRight,
  BookMarked,
} from 'lucide-react';
import { LearningItem, TopicCategory } from '../types/curriculum';
import { SpeechSpeed } from '../utils/audio';
import { VisualIllustration } from './VisualIllustration';

interface FlashcardDeckProps {
  topic: TopicCategory;
  activeAudioId: string | null;
  isRepeating: boolean;
  speed: SpeechSpeed;
  onChangeSpeed: (s: SpeechSpeed) => void;
  onPlayAudio: (text: string, id: string) => void;
  onRepeatAudio: (text: string, id: string) => void;
  onStopAudio: () => void;
  onGoToExercises: () => void;
  onNextTopic?: () => void;
  nextTopicTitle?: string;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({
  topic,
  activeAudioId,
  isRepeating,
  speed,
  onChangeSpeed,
  onPlayAudio,
  onRepeatAudio,
  onStopAudio,
  onGoToExercises,
  onNextTopic,
  nextTopicTitle,
}) => {
  const [index, setIndex] = useState(0);
  const [hideMeaning, setHideMeaning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const items: LearningItem[] = topic.items;
  const current = items[index] || items[0];

  useEffect(() => {
    setIndex(0);
    setRevealed(false);
  }, [topic.id]);

  useEffect(() => {
    setRevealed(false);
  }, [index]);

  if (!current) return null;

  const mainAudioId = `card-main-${current.id}`;
  const exampleAudioId = `card-ex-${current.id}`;
  const isPlayingMain = activeAudioId === mainAudioId;
  const isPlayingExample = activeAudioId === exampleAudioId;
  const showAnswer = !hideMeaning || revealed;

  const handlePrev = () => {
    onStopAudio();
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    onStopAudio();
    setIndex((prev) => Math.min(items.length - 1, prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Compact Audio Speed & Self-Test Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1 p-1 bg-white border border-sky-100 rounded-xl shadow-xs">
          {([0.75, 1.0, 1.2] as SpeechSpeed[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onChangeSpeed(s)}
              className={`px-3 py-1.5 min-h-[34px] text-xs font-semibold rounded-lg transition-colors tabular-nums ${
                speed === s
                  ? 'bg-sky-600 text-white'
                  : 'text-slate-600 hover:text-sky-700'
              }`}
            >
              {s === 0.75 ? '0.75x' : s === 1.0 ? '1.0x' : '1.2x'}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setHideMeaning((v) => !v)}
          className={`inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded-xl text-xs font-semibold border transition-colors ${
            hideMeaning
              ? 'bg-sky-600 text-white border-sky-600'
              : 'bg-white text-slate-700 border-sky-100 hover:border-sky-300 shadow-xs'
          }`}
        >
          {hideMeaning ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          <span>{hideMeaning ? 'Tampilkan Arti' : 'Sembunyikan Arti'}</span>
        </button>
      </div>

      {/* Main Modern Visual Flashcard */}
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center gap-7 sm:gap-10">
            {/* Prominent Visual Illustration for the Word/Mufradat */}
            <div className="shrink-0 p-3 rounded-3xl bg-gradient-to-br from-sky-50 to-blue-50/60 border border-sky-100">
              <VisualIllustration
                visualKey={current.visualKey}
                label={current.indonesian}
                size="lg"
              />
            </div>

            {/* Arabic Word + Meaning + Audio */}
            <div className="flex-1 w-full text-center md:text-left">
              <div
                dir="rtl"
                lang="ar"
                className="font-arabic text-5xl sm:text-6xl font-bold text-slate-900 py-1 break-words"
              >
                {current.arabic}
              </div>

              {showAnswer ? (
                <div className="mt-2 space-y-1">
                  <p className="font-display text-2xl sm:text-3xl font-bold text-sky-800">
                    {current.indonesian}
                  </p>
                  <p className="text-sm font-medium text-slate-500">
                    {current.transliteration}
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => setRevealed(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-sm font-semibold transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Arti</span>
                  </button>
                </div>
              )}

              <p className="mt-3 text-sm text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                {current.explanation}
              </p>

              {/* Primary Audio Actions */}
              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    isPlayingMain && !isRepeating
                      ? onStopAudio()
                      : onPlayAudio(current.arabic, mainAudioId)
                  }
                  className={`inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    isPlayingMain && !isRepeating
                      ? 'bg-sky-800 text-white'
                      : 'bg-sky-600 hover:bg-sky-700 text-white'
                  }`}
                >
                  {isPlayingMain && !isRepeating ? (
                    <>
                      <Square className="w-4 h-4 fill-current" />
                      <span>Berhenti</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4" />
                      <span>Putar Suara</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    isPlayingMain && isRepeating
                      ? onStopAudio()
                      : onRepeatAudio(current.arabic, mainAudioId)
                  }
                  className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                    isPlayingMain && isRepeating
                      ? 'bg-sky-100 text-sky-900 border-sky-400'
                      : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                  <span>{isPlayingMain && isRepeating ? 'Mengulang...' : 'Ulangi 3x'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Kaidah Nahwu / Sharaf (before example) + Example Sentence / Example Word */}
          {(current.kaidahSummary || current.kaidahSource || current.exampleArabic) && (
            <div className="mt-7 pt-5 border-t border-sky-100 space-y-4">
              {(current.kaidahSummary || current.kaidahSource) && (
                <div className="rounded-2xl bg-sky-50/80 border border-sky-100 px-4 py-3.5">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-semibold text-sky-800">
                    <BookMarked className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                    <span>
                      {topic.discipline === 'sharaf'
                        ? 'Kaidah Sharaf'
                        : topic.discipline === 'nahwu_sharaf'
                          ? 'Kaidah Nahwu & Sharaf'
                          : 'Kaidah Nahwu'}
                    </span>
                    {current.kaidahSource && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="text-sky-700 font-medium">
                          {current.kaidahSource}
                        </span>
                      </>
                    )}
                  </div>
                  {current.kaidahSummary && (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {current.kaidahSummary}
                    </p>
                  )}
                </div>
              )}

              {current.exampleArabic && (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {current.exampleVisualKey && (
                      <VisualIllustration
                        visualKey={current.exampleVisualKey}
                        label={current.exampleIndonesian}
                        size="sm"
                      />
                    )}
                    <div className="min-w-0 flex-1">
                      <p
                        dir="rtl"
                        lang="ar"
                        className="font-arabic text-2xl sm:text-3xl font-semibold text-slate-900 text-right sm:text-left"
                      >
                        {current.exampleArabic}
                      </p>
                      {showAnswer && current.exampleIndonesian && (
                        <p className="text-sm text-slate-600 mt-0.5">
                          {current.exampleIndonesian}
                          {current.exampleTransliteration && (
                            <span className="text-sky-700 ml-2 text-xs">
                              ({current.exampleTransliteration})
                            </span>
                          )}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      isPlayingExample
                        ? onStopAudio()
                        : onPlayAudio(current.exampleArabic || '', exampleAudioId)
                    }
                    className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-semibold border transition-colors whitespace-nowrap shrink-0 self-end sm:self-center ${
                      isPlayingExample
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-sky-50 hover:bg-sky-100 text-sky-800 border-sky-200'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>{isPlayingExample ? 'Memutar...' : 'Dengar Contoh'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Clean Bottom Card Stepper */}
        <div className="bg-sky-50/50 border-t border-sky-100 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handlePrev}
            disabled={index === 0}
            className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-white border border-sky-100 text-sm font-semibold text-slate-700 hover:border-sky-300 disabled:opacity-40 disabled:pointer-events-none transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          <span className="text-xs sm:text-sm font-semibold text-slate-600 tabular-nums">
            {index + 1} / {items.length}
          </span>

          {index === items.length - 1 ? (
            <button
              type="button"
              onClick={onGoToExercises}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors"
            >
              <span>Latihan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Optional Next Topic Shortcut at Deck End */}
      {index === items.length - 1 && onNextTopic && nextTopicTitle && (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onNextTopic}
            className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 text-sm font-semibold transition-colors"
          >
            <span>Lanjut: {nextTopicTitle}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
