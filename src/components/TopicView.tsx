import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Layers,
  BookOpen,
  ClipboardCheck,
  Info,
} from 'lucide-react';
import { EducationLevel, TopicCategory } from '../types/curriculum';
import { useArabicAudio } from '../utils/audio';
import { FlashcardDeck } from './FlashcardDeck';
import { StudyOverview } from './StudyOverview';
import { ExerciseView } from './ExerciseView';

interface TopicViewProps {
  level: EducationLevel;
  topic: TopicCategory;
  onBackToLevel: () => void;
  onSelectTopic: (topic: TopicCategory) => void;
}

type StudyMode = 'cards' | 'overview' | 'exercise';

export const TopicView: React.FC<TopicViewProps> = ({
  level,
  topic,
  onBackToLevel,
  onSelectTopic,
}) => {
  const [mode, setMode] = useState<StudyMode>('cards');
  const audio = useArabicAudio();

  useEffect(() => {
    setMode('cards');
    audio.stop();
  }, [topic.id]);

  const currentIdx = level.topics.findIndex((t) => t.id === topic.id);
  const prevTopic = currentIdx > 0 ? level.topics[currentIdx - 1] : undefined;
  const nextTopic =
    currentIdx >= 0 && currentIdx < level.topics.length - 1
      ? level.topics[currentIdx + 1]
      : undefined;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Compact Top Navigation + Title + Segmented Mode Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <button
            type="button"
            onClick={() => {
              audio.stop();
              onBackToLevel();
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-900 min-h-[40px] mb-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{level.shortTitle}</span>
          </button>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            {topic.title}
          </h1>
        </div>

        {/* Segmented Study Mode Switcher */}
        <div
          role="tablist"
          aria-label="Mode belajar"
          className="inline-flex items-center gap-1 p-1 bg-white border border-sky-100 rounded-2xl shadow-xs w-full md:w-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'cards'}
            onClick={() => {
              audio.stop();
              setMode('cards');
            }}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[42px] rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              mode === 'cards'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:text-sky-700'
            }`}
          >
            <Layers className="w-4 h-4 shrink-0" />
            <span>Kartu</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'overview'}
            onClick={() => {
              audio.stop();
              setMode('overview');
            }}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[42px] rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              mode === 'overview'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:text-sky-700'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span>Ringkasan</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={mode === 'exercise'}
            onClick={() => {
              audio.stop();
              setMode('exercise');
            }}
            className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 min-h-[42px] rounded-xl text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 ${
              mode === 'exercise'
                ? 'bg-sky-600 text-white'
                : 'text-slate-600 hover:text-sky-700'
            }`}
          >
            <ClipboardCheck className="w-4 h-4 shrink-0" />
            <span>Latihan</span>
          </button>
        </div>
      </div>

      {/* Audio Notice if device lacks Arabic TTS */}
      {audio.audioNotice && (
        <div className="mb-5 flex items-start gap-2.5 p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs sm:text-sm text-sky-900">
          <Info className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
          <span>{audio.audioNotice}</span>
        </div>
      )}

      {/* Active Mode Content */}
      {mode === 'cards' && (
        <FlashcardDeck
          topic={topic}
          activeAudioId={audio.activeId}
          isRepeating={audio.isRepeating}
          speed={audio.speed}
          onChangeSpeed={audio.setSpeed}
          onPlayAudio={audio.play}
          onRepeatAudio={(text, id) => audio.playRepeat(text, id, 3)}
          onStopAudio={audio.stop}
          onGoToExercises={() => {
            audio.stop();
            setMode('exercise');
          }}
          onNextTopic={nextTopic ? () => onSelectTopic(nextTopic) : undefined}
          nextTopicTitle={nextTopic?.title}
        />
      )}

      {mode === 'overview' && (
        <StudyOverview
          topic={topic}
          activeAudioId={audio.activeId}
          onPlayAudio={audio.play}
        />
      )}

      {mode === 'exercise' && (
        <ExerciseView
          topic={topic}
          activeAudioId={audio.activeId}
          onPlayAudio={audio.play}
          onBackToCards={() => {
            audio.stop();
            setMode('cards');
          }}
          onNextTopic={nextTopic ? () => onSelectTopic(nextTopic) : undefined}
          nextTopicTitle={nextTopic?.title}
        />
      )}

      {/* Bottom Topic Navigation */}
      <nav
        aria-label="Navigasi antar materi"
        className="mt-8 pt-5 border-t border-sky-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
      >
        {prevTopic ? (
          <button
            type="button"
            onClick={() => onSelectTopic(prevTopic)}
            className="inline-flex items-center gap-2 px-4 py-3 min-h-[46px] rounded-2xl bg-white border border-sky-100 hover:border-sky-300 text-sm font-semibold text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="truncate">{prevTopic.title}</span>
          </button>
        ) : (
          <div />
        )}

        {nextTopic && (
          <button
            type="button"
            onClick={() => onSelectTopic(nextTopic)}
            className="inline-flex items-center justify-end gap-2 px-4 py-3 min-h-[46px] rounded-2xl bg-sky-50 border border-sky-200 hover:bg-sky-100 text-sm font-semibold text-sky-900 transition-colors"
          >
            <span className="truncate">{nextTopic.title}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        )}
      </nav>
    </main>
  );
};
