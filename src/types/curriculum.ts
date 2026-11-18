export type LevelId = 'sd' | 'smp' | 'sma' | 'pt';

export interface LearningItem {
  id: string;
  arabic: string;
  transliteration: string;
  indonesian: string;
  visualKey: string;
  categoryLabel?: string;
  explanation: string;
  exampleArabic?: string;
  exampleTransliteration?: string;
  exampleIndonesian?: string;
  exampleVisualKey?: string;
  morphologicalNote?: string;
  kaidahSummary?: string;
  kaidahSource?: string;
}

export interface GrammarRule {
  title: string;
  sourceBook?: string;
  arabicFormula?: string;
  explanation: string;
  examples: {
    arabic: string;
    transliteration: string;
    indonesian: string;
    highlightNote?: string;
  }[];
}

export interface DialogueLine {
  speaker: string;
  arabic: string;
  transliteration: string;
  indonesian: string;
}

export interface ReadingPassage {
  titleArabic: string;
  titleIndonesian: string;
  paragraphs: {
    arabic: string;
    transliteration?: string;
    indonesian: string;
  }[];
  keyVocabulary: {
    arabic: string;
    indonesian: string;
  }[];
}

export type ExerciseType =
  | 'meaning'
  | 'image_match'
  | 'audio_pick'
  | 'letter_build'
  | 'sentence_build'
  | 'fill_blank'
  | 'concept_choice'
  | 'reading_comp';

export interface ExerciseOption {
  id: string;
  label: string;
  arabic?: string;
  visualKey?: string;
}

export interface ExerciseQuestion {
  id: string;
  type: ExerciseType;
  prompt: string;
  arabicPrompt?: string;
  audioText?: string;
  visualKey?: string;
  passageContext?: {
    arabic: string;
    indonesian: string;
  };
  options?: ExerciseOption[];
  correctOptionId?: string;
  /** For letter_build and sentence_build */
  tiles?: string[];
  correctSequence?: string[];
  targetTranslation?: string;
  explanation: string;
}

export interface TopicCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  levelId: LevelId;
  focusTag: string;
  discipline?: 'nahwu' | 'sharaf' | 'nahwu_sharaf';
  intro: string;
  items: LearningItem[];
  grammarRules?: GrammarRule[];
  dialogue?: DialogueLine[];
  passage?: ReadingPassage;
  exercises: ExerciseQuestion[];
}

export interface EducationLevel {
  id: LevelId;
  shortTitle: string;
  fullTitle: string;
  focusTitle: string;
  description: string;
  methodSummary: string;
  heroImage: string;
  topics: TopicCategory[];
}
