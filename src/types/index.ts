// Pronunciation info
export interface PronunciationData {
  ipa: string;           // IPA表記 (例: /əˈveɪləbəl/)
  audio?: string;        // 音声URL (オプション)
}

// Word model
export interface Word {
  id: string;
  english: string;
  japanese: string;
  pronunciation?: PronunciationData;  // 発音情報
  example?: string;
  examples?: string[];   // 複数の例文
  category?: string;
  difficulty: 1 | 2 | 3;
  createdAt: Date;
  updatedAt: Date;
}

// Study record
export interface StudyRecord {
  id: string;
  wordId: string;
  correct: boolean;
  studiedAt: Date;
}

// User progress statistics
export interface UserProgress {
  totalWords: number;
  masteredWords: number;
  learningWords: number;
  accuracy: number;
  streak: number;
  todayStudied: number;
}

// Study session
export interface StudySession {
  id: string;
  startedAt: Date;
  endedAt?: Date;
  wordsStudied: number;
  correctCount: number;
  incorrectCount: number;
}

// Word with study info
export interface WordWithStudyInfo extends Word {
  timesStudied: number;
  timesCorrect: number;
  lastStudied?: Date;
  nextReview?: Date;
  mastered: boolean;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Form types
export interface WordFormData {
  english: string;
  japanese: string;
  example?: string;
  category?: string;
  difficulty: 1 | 2 | 3;
}

// Filter options
export interface FilterOptions {
  category?: string;
  difficulty?: 1 | 2 | 3;
  mastered?: boolean;
  search?: string;
}

// Sort options
export type SortField = 'english' | 'japanese' | 'createdAt' | 'difficulty';
export type SortOrder = 'asc' | 'desc';

export interface SortOptions {
  field: SortField;
  order: SortOrder;
}
