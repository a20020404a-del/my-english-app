// AI Assistant types

export type LearnerLevel = 'beginner' | 'intermediate' | 'advanced'

export interface PronunciationInfo {
  ipa: string
  katakana: string
  tips: string
  syllables: string
  accentPosition: number
}

export interface ExampleSentence {
  english: string
  japanese: string
  grammar: string
  scene: string
}

export interface WordMeaning {
  primary: string
  partOfSpeech: string
  synonyms: string[]
  antonyms: string[]
}

export interface LearningAdvice {
  memorization: string
  commonMistakes: string
  relatedExpressions: string[]
}

export interface WordAnalysis {
  word: string
  level: LearnerLevel
  pronunciation: PronunciationInfo
  meaning: WordMeaning
  examples: ExampleSentence[]
  advice: LearningAdvice
}
