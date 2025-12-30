import { Word, StudyRecord, WordWithStudyInfo } from '../types'

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

// Initialize with sample data if empty
export function initializeSampleData(): void {
  const words = getWords()
  if (words.length > 0) return

  const sampleWords: Omit<Word, 'id' | 'createdAt' | 'updatedAt'>[] = [
    { english: 'apple', japanese: 'りんご', example: 'I eat an apple every day.', category: '食べ物', difficulty: 1 },
    { english: 'beautiful', japanese: '美しい', example: 'The sunset is beautiful.', category: '形容詞', difficulty: 2 },
    { english: 'challenge', japanese: '挑戦', example: 'This is a big challenge for me.', category: '名詞', difficulty: 2 },
    { english: 'determine', japanese: '決定する', example: 'We need to determine the cause.', category: '動詞', difficulty: 3 },
    { english: 'essential', japanese: '必要不可欠な', example: 'Water is essential for life.', category: '形容詞', difficulty: 3 },
    { english: 'friend', japanese: '友達', example: 'She is my best friend.', category: '名詞', difficulty: 1 },
    { english: 'gradually', japanese: '徐々に', example: 'The weather is gradually improving.', category: '副詞', difficulty: 2 },
    { english: 'happiness', japanese: '幸福', example: 'Money cannot buy happiness.', category: '名詞', difficulty: 2 },
    { english: 'important', japanese: '重要な', example: 'This is an important decision.', category: '形容詞', difficulty: 1 },
    { english: 'journey', japanese: '旅', example: 'Life is a long journey.', category: '名詞', difficulty: 2 },
  ]

  sampleWords.forEach(word => addWord(word))
}
