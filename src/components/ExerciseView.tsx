import React, { useEffect, useState } from 'react';
import {
  Volume2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ArrowRight,
  Delete,
  BookOpen,
} from 'lucide-react';
import { ExerciseQuestion, TopicCategory } from '../types/curriculum';
import { SpeechSpeed } from '../utils/audio';
import { VisualIllustration } from './VisualIllustration';

interface ExerciseViewProps {
  topic: TopicCategory;
  activeAudioId: string | null;
  onPlayAudio: (text: string, id: string, customSpeed?: SpeechSpeed) => void;
  onBackToCards: () => void;
  onNextTopic?: () => void;
  nextTopicTitle?: string;
}

const typeLabelMap: Record<ExerciseQuestion['type'], string> = {
  meaning: 'Memilih Arti Kosakata',
  image_match: 'Mencocokkan Gambar & Kata',
  audio_pick: 'Menentukan dari Audio',
  letter_build: 'Menyusun Huruf Menjadi Kata',
  sentence_build: 'Menyusun Kata Menjadi Kalimat',
  fill_blank: 'Melengkapi Kalimat',
  concept_choice: 'Pemahaman Kaidah',
  reading_comp: 'Membaca & Memahami Teks',
};

export const ExerciseView: React.FC<ExerciseViewProps> = ({
  topic,
  activeAudioId,
  onPlayAudio,
  onBackToCards,
  onNextTopic,
  nextTopicTitle,
}) => {
  const questions = topic.exercises;
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [chosenIndices, setChosenIndices] = useState<number[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [understoodCount, setUnderstoodCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const resetAll = () => {
    setCurrentIdx(0);
    setSelectedOptionId(null);
    setChosenIndices([]);
    setIsSubmitted(false);
    setIsCorrect(false);
    setUnderstoodCount(0);
    setIsCompleted(false);
  };

  useEffect(() => {
    resetAll();
  }, [topic.id]);

  if (!questions || questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
        <p className="text-base font-semibold text-slate-800">
          Latihan untuk materi ini belum tersedia.
        </p>
        <button
          type="button"
          onClick={onBackToCards}
          className="mt-4 px-5 py-2.5 min-h-[44px] rounded-xl bg-sky-600 text-white text-sm font-semibold"
        >
          Kembali ke Kartu Belajar
        </button>
      </div>
    );
  }

  const question = questions[currentIdx];
  const isBuilder =
    question.type === 'letter_build' || question.type === 'sentence_build';

  const handleSelectOption = (optId: string) => {
    if (isSubmitted) return;
    setSelectedOptionId(optId);
    const correct = optId === question.correctOptionId;
    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) {
      setUnderstoodCount((c) => c + 1);
    }
  };

  const handleAddTile = (tileIdx: number) => {
    if (isSubmitted || chosenIndices.includes(tileIdx)) return;
    setChosenIndices((prev) => [...prev, tileIdx]);
  };

  const handleRemoveLastTile = () => {
    if (isSubmitted || chosenIndices.length === 0) return;
    setChosenIndices((prev) => prev.slice(0, -1));
  };

  const handleRemoveTileAt = (pos: number) => {
    if (isSubmitted) return;
    setChosenIndices((prev) => prev.filter((_, i) => i !== pos));
  };

  const handleCheckBuilder = () => {
    if (isSubmitted || !question.tiles || !question.correctSequence) return;
    const built = chosenIndices.map((idx) => question.tiles![idx]);
    const correct =
      built.length === question.correctSequence.length &&
      built.every((val, i) => val === question.correctSequence![i]);
    setIsCorrect(correct);
    setIsSubmitted(true);
    if (correct) {
      setUnderstoodCount((c) => c + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 >= questions.length) {
      setIsCompleted(true);
      return;
    }
    setCurrentIdx((prev) => prev + 1);
    setSelectedOptionId(null);
    setChosenIndices([]);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  if (isCompleted) {
    return (
      <div className="bg-white rounded-3xl border border-sky-100 shadow-sm p-6 sm:p-10 text-center max-w-2xl mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h2 className="font-display text-2xl font-bold text-slate-900">
          Latihan Selesai
        </h2>
        <p className="mt-2 text-base text-slate-600">
          <span className="font-bold text-sky-800 tabular-nums">
            {understoodCount} / {questions.length}
          </span>{' '}
          soal <span className="font-semibold text-slate-800">{topic.title}</span> terjawab tepat.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-semibold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Latihan</span>
          </button>

          <button
            type="button"
            onClick={onBackToCards}
            className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-sm font-semibold transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Tinjau Kartu</span>
          </button>

          {onNextTopic && nextTopicTitle && (
            <button
              type="button"
              onClick={onNextTopic}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors"
            >
              <span>Materi Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-sky-100 shadow-sm overflow-hidden max-w-3xl mx-auto">
      <div className="p-6 sm:p-8">
        {/* Question Header Metadata (unboxed) */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm text-slate-500 mb-5 tabular-nums">
          <span>
            Soal {currentIdx + 1} dari {questions.length}
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-sky-700 font-semibold">
              {typeLabelMap[question.type]}
            </span>
          </span>
        </div>

        {/* Question Prompt */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {question.prompt}
        </h3>

        {/* Optional Reading Passage Context */}
        {question.passageContext && (
          <div className="mt-4 p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-xl sm:text-2xl font-semibold text-slate-900"
            >
              {question.passageContext.arabic}
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              {question.passageContext.indonesian}
            </p>
          </div>
        )}

        {/* Optional Visual Image for image_match */}
        {question.visualKey && (
          <div className="mt-5 flex justify-center">
            <VisualIllustration
              visualKey={question.visualKey}
              label="Ilustrasi soal"
              size="lg"
            />
          </div>
        )}

        {/* Optional Arabic Display Prompt */}
        {question.arabicPrompt && (
          <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-center">
            <p
              dir="rtl"
              lang="ar"
              className="font-arabic text-3xl sm:text-4xl font-bold text-slate-900"
            >
              {question.arabicPrompt}
            </p>
          </div>
        )}

        {/* Audio Trigger if audioText is provided */}
        {question.audioText && (
          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => onPlayAudio(question.audioText!, `q-audio-${question.id}`)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl text-sm font-semibold transition-colors ${
                activeAudioId === `q-audio-${question.id}`
                  ? 'bg-sky-800 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>
                {activeAudioId === `q-audio-${question.id}` ? 'Memutar Audio...' : 'Putar Audio Soal'}
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                onPlayAudio(question.audioText!, `q-audio-slow-${question.id}`, 0.75)
              }
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 text-sm font-semibold transition-colors"
            >
              <Volume2 className="w-4 h-4" />
              <span>Putar Lambat (0.75x)</span>
            </button>
          </div>
        )}

        {/* Multiple Choice Options */}
        {!isBuilder && question.options && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isRightOption = opt.id === question.correctOptionId;

              let stateStyle =
                'bg-white border-slate-200 hover:border-sky-400 hover:bg-sky-50/40 text-slate-800';
              if (isSubmitted) {
                if (isRightOption) {
                  stateStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                } else if (isSelected && !isRightOption) {
                  stateStyle = 'bg-amber-50 border-amber-500 text-amber-950';
                } else {
                  stateStyle = 'bg-slate-50 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`text-left p-4 min-h-[56px] rounded-xl border-2 transition-all flex items-center justify-between gap-3 ${stateStyle}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {opt.visualKey && (
                      <VisualIllustration
                        visualKey={opt.visualKey}
                        label={opt.label}
                        size="sm"
                      />
                    )}
                    <div className="min-w-0">
                      {opt.arabic && (
                        <p
                          dir="rtl"
                          lang="ar"
                          className="font-arabic-compact text-xl sm:text-2xl font-bold text-right sm:text-left"
                        >
                          {opt.arabic}
                        </p>
                      )}
                      <p className="text-sm sm:text-base font-medium">
                        {opt.label}
                      </p>
                    </div>
                  </div>

                  {isSubmitted && isRightOption && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isRightOption && (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Letter / Sentence Builder */}
        {isBuilder && question.tiles && (
          <div className="mt-6 space-y-5">
            {question.targetTranslation && (
              <p className="text-sm text-slate-600">
                Target arti: <span className="font-semibold text-slate-900">{question.targetTranslation}</span>
              </p>
            )}

            {/* Answer Construction Area (RTL) */}
            <div
              dir="rtl"
              className="min-h-[76px] p-4 rounded-xl bg-sky-50/70 border-2 border-dashed border-sky-300 flex flex-wrap items-center gap-2.5"
            >
              {chosenIndices.length === 0 ? (
                <span dir="ltr" className="text-sm text-slate-500 mx-auto">
                  Ketuk potongan di bawah secara berurutan (kanan ke kiri)
                </span>
              ) : (
                chosenIndices.map((tileIdx, pos) => (
                  <button
                    key={`${tileIdx}-${pos}`}
                    type="button"
                    disabled={isSubmitted}
                    onClick={() => handleRemoveTileAt(pos)}
                    className="px-4 py-2 min-h-[44px] rounded-xl bg-white border border-sky-400 text-slate-900 font-arabic-compact text-xl sm:text-2xl font-bold shadow-xs hover:bg-rose-50 hover:border-rose-300 transition-colors"
                  >
                    {question.tiles![tileIdx]}
                  </button>
                ))
              )}
            </div>

            {/* Available Tiles */}
            <div dir="rtl" className="flex flex-wrap items-center gap-2.5">
              {question.tiles.map((tile, idx) => {
                const used = chosenIndices.includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={used || isSubmitted}
                    onClick={() => handleAddTile(idx)}
                    className={`px-4 py-2.5 min-h-[48px] min-w-[52px] rounded-xl border font-arabic-compact text-xl sm:text-2xl font-bold transition-all ${
                      used
                        ? 'bg-slate-100 border-slate-200 text-slate-300'
                        : 'bg-white border-slate-300 hover:border-sky-500 hover:bg-sky-50 text-slate-900 shadow-xs'
                    }`}
                  >
                    {tile}
                  </button>
                );
              })}
            </div>

            {!isSubmitted && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCheckBuilder}
                  disabled={chosenIndices.length !== question.tiles.length}
                  className="px-5 py-2.5 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  Periksa Susunan
                </button>
                <button
                  type="button"
                  onClick={handleRemoveLastTile}
                  disabled={chosenIndices.length === 0}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <Delete className="w-4 h-4" />
                  <span>Hapus Satu</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Immediate Calm Explanation Feedback */}
        {isSubmitted && (
          <div
            className={`mt-6 p-4 sm:p-5 rounded-xl border ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="font-semibold text-sm sm:text-base">
                  {isCorrect ? 'Tepat sekali!' : 'Perlu diperhatikan'}
                </p>
                {!isCorrect && question.correctSequence && (
                  <p
                    dir="rtl"
                    lang="ar"
                    className="font-arabic text-xl font-bold mt-1 text-slate-900"
                  >
                    {question.correctSequence.join(
                      question.type === 'letter_build' ? '' : ' '
                    )}
                  </p>
                )}
                <p className="mt-1 text-sm leading-relaxed opacity-90">
                  {question.explanation}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors"
              >
                <span>
                  {currentIdx + 1 >= questions.length
                    ? 'Lihat Ringkasan'
                    : 'Soal Berikutnya'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
