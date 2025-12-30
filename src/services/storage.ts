import { Word, StudyRecord, WordWithStudyInfo } from '../types'
import { vocabularyData, getRandomWords } from '../data/vocabulary'

const WORDS_KEY = 'english-master-words'
const RECORDS_KEY = 'english-master-records'

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Words CRUD operations
export function getWords(): Word[] {
  const data = localStorage.getItem(WORDS_KEY)
  if (!data) return []
  const words = JSON.parse(data)
  return words.map((w: Word) => ({
    ...w,
    createdAt: new Date(w.createdAt),
    updatedAt: new Date(w.updatedAt),
  }))
}

export function saveWords(words: Word[]): void {
  localStorage.setItem(WORDS_KEY, JSON.stringify(words))
}

export function addWord(word: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>): Word {
  const words = getWords()
  const newWord: Word = {
    ...word,
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  words.push(newWord)
  saveWords(words)
  return newWord
}

export function updateWord(id: string, updates: Partial<Word>): Word | null {
  const words = getWords()
  const index = words.findIndex(w => w.id === id)
  if (index === -1) return null

  words[index] = {
    ...words[index],
    ...updates,
    updatedAt: new Date(),
  }
  saveWords(words)
  return words[index]
}

export function deleteWord(id: string): boolean {
  const words = getWords()
  const filtered = words.filter(w => w.id !== id)
  if (filtered.length === words.length) return false
  saveWords(filtered)
  return true
}

// Study records operations
export function getStudyRecords(): StudyRecord[] {
  const data = localStorage.getItem(RECORDS_KEY)
  if (!data) return []
  const records = JSON.parse(data)
  return records.map((r: StudyRecord) => ({
    ...r,
    studiedAt: new Date(r.studiedAt),
  }))
}

export function saveStudyRecords(records: StudyRecord[]): void {
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records))
}

export function addStudyRecord(wordId: string, correct: boolean): StudyRecord {
  const records = getStudyRecords()
  const newRecord: StudyRecord = {
    id: generateId(),
    wordId,
    correct,
    studiedAt: new Date(),
  }
  records.push(newRecord)
  saveStudyRecords(records)
  return newRecord
}

// Get words with study info
export function getWordsWithStudyInfo(): WordWithStudyInfo[] {
  const words = getWords()
  const records = getStudyRecords()

  return words.map(word => {
    const wordRecords = records.filter(r => r.wordId === word.id)
    const timesStudied = wordRecords.length
    const timesCorrect = wordRecords.filter(r => r.correct).length
    const lastStudied = wordRecords.length > 0
      ? new Date(Math.max(...wordRecords.map(r => r.studiedAt.getTime())))
      : undefined

    // Simple spaced repetition: mastered if correct 3+ times consecutively
    const recentRecords = wordRecords.slice(-3)
    const mastered = recentRecords.length >= 3 && recentRecords.every(r => r.correct)

    return {
      ...word,
      timesStudied,
      timesCorrect,
      lastStudied,
      mastered,
    }
  })
}

// Get next words for study (spaced repetition)
export function getStudyWords(limit: number = 10): WordWithStudyInfo[] {
  const words = getWordsWithStudyInfo()

  // Priority: new words > incorrect > due for review
  const newWords = words.filter(w => w.timesStudied === 0)
  const incorrectWords = words.filter(w => w.timesStudied > 0 && !w.mastered)
  const masteredWords = words.filter(w => w.mastered)

  // Sort incorrect by accuracy (lowest first)
  incorrectWords.sort((a, b) => {
    const aAccuracy = a.timesCorrect / a.timesStudied
    const bAccuracy = b.timesCorrect / b.timesStudied
    return aAccuracy - bAccuracy
  })

  // Combine and return
  return [...newWords, ...incorrectWords, ...masteredWords].slice(0, limit)
}

// Calculate streak
export function calculateStreak(): number {
  const records = getStudyRecords()
  if (records.length === 0) return 0

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Group records by date
  const studyDates = new Set(
    records.map(r => {
      const date = new Date(r.studiedAt)
      date.setHours(0, 0, 0, 0)
      return date.getTime()
    })
  )

  let streak = 0
  const currentDate = new Date(today)

  // Check if studied today
  if (!studyDates.has(currentDate.getTime())) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  // Count consecutive days
  while (studyDates.has(currentDate.getTime())) {
    streak++
    currentDate.setDate(currentDate.getDate() - 1)
  }

  return streak
}

// Get today's study count
export function getTodayStudyCount(): number {
  const records = getStudyRecords()
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return records.filter(r => {
    const recordDate = new Date(r.studiedAt)
    recordDate.setHours(0, 0, 0, 0)
    return recordDate.getTime() === today.getTime()
  }).length
}

// Initialize with sample data if empty (using vocabulary database with IPA)
export function initializeSampleData(): void {
  const words = getWords()
  if (words.length > 0) return

  // Use vocabulary database with IPA pronunciation and examples
  const sampleVocab = getRandomWords(100) // Start with 100 words

  const sampleWords: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>[] = sampleVocab.map(v => ({
    english: v.english,
    japanese: v.japanese,
    pronunciation: { ipa: v.ipa },
    example: v.examples[0],
    examples: v.examples,
    category: v.category,
    difficulty: v.difficulty,
  }))

  sampleWords.forEach(word => addWord(word))
}

// Reset and reload vocabulary from database
export function reloadVocabulary(count: number = 100): void {
  // Clear existing words
  saveWords([])
  saveStudyRecords([])

  // Load new vocabulary with IPA
  const vocab = getRandomWords(count)
  const newWords: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>[] = vocab.map(v => ({
    english: v.english,
    japanese: v.japanese,
    pronunciation: { ipa: v.ipa },
    example: v.examples[0],
    examples: v.examples,
    category: v.category,
    difficulty: v.difficulty,
  }))

  newWords.forEach(word => addWord(word))
}

// Get total vocabulary count
export function getVocabularyCount(): number {
  return vocabularyData.length
}
