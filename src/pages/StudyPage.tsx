import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, Check, X, BookOpen, Trophy, ArrowRight } from 'lucide-react'
import { WordWithStudyInfo } from '../types'
import { getStudyWords, addStudyRecord } from '../services/storage'

type StudyState = 'ready' | 'studying' | 'finished'

export default function StudyPage() {
  const [state, setState] = useState<StudyState>('ready')
  const [words, setWords] = useState<WordWithStudyInfo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [results, setResults] = useState<{ correct: number; incorrect: number }>({
    correct: 0,
    incorrect: 0,
  })

  const loadWords = () => {
    const studyWords = getStudyWords(10)
    setWords(studyWords)
  }

  useEffect(() => {
    loadWords()
  }, [])

  const startStudy = () => {
    if (words.length === 0) return
    setState('studying')
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults({ correct: 0, incorrect: 0 })
  }

  const handleAnswer = (correct: boolean) => {
    const currentWord = words[currentIndex]
    addStudyRecord(currentWord.id, correct)

    setResults(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      incorrect: prev.incorrect + (correct ? 0 : 1),
    }))

    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setIsFlipped(false)
    } else {
      setState('finished')
    }
  }

  const restartStudy = () => {
    loadWords()
    setState('ready')
    setCurrentIndex(0)
    setIsFlipped(false)
    setResults({ correct: 0, incorrect: 0 })
  }

  const currentWord = words[currentIndex]
  const progress = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0

  // Ready state
  if (state === 'ready') {
    return (
      <div className="sm:ml-64 pb-20 sm:pb-0">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-primary-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            学習を始めよう
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {words.length > 0
              ? `${words.length} 単語を学習します`
              : '学習する単語がありません'}
          </p>
          {words.length > 0 ? (
            <button
              onClick={startStudy}
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors"
            >
              スタート
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/words"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl text-lg font-semibold transition-colors"
            >
              単語を追加
              <ArrowRight className="w-5 h-5" />
            </Link>
          )}
        </div>
      </div>
    )
  }

  // Finished state
  if (state === 'finished') {
    const accuracy = Math.round(
      (results.correct / (results.correct + results.incorrect)) * 100
    )
    return (
      <div className="sm:ml-64 pb-20 sm:pb-0">
        <div className="max-w-md mx-auto text-center py-12">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            お疲れ様でした！
          </h1>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-3xl font-bold text-green-500">{results.correct}</p>
              <p className="text-sm text-gray-500">正解</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-3xl font-bold text-red-500">{results.incorrect}</p>
              <p className="text-sm text-gray-500">不正解</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <p className="text-3xl font-bold text-primary-500">{accuracy}%</p>
              <p className="text-sm text-gray-500">正答率</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={restartStudy}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              もう一度
            </button>
            <Link
              to="/"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white px-6 py-3 rounded-xl font-semibold transition-colors"
            >
              ホームへ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Studying state
  return (
    <div className="sm:ml-64 pb-20 sm:pb-0">
      <div className="max-w-md mx-auto">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>
              {currentIndex + 1} / {words.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="perspective cursor-pointer mb-8"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full h-64 transition-transform duration-500 preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 backface-hidden">
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  タップして答えを見る
                </p>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {currentWord?.english}
                </h2>
                {currentWord?.example && (
                  <p className="text-gray-500 dark:text-gray-400 mt-4 text-center italic">
                    "{currentWord.example}"
                  </p>
                )}
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180">
              <div className="w-full h-full bg-primary-500 rounded-2xl shadow-lg flex flex-col items-center justify-center p-6">
                <p className="text-primary-200 mb-4">答え</p>
                <h2 className="text-4xl font-bold text-white">
                  {currentWord?.japanese}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        {isFlipped && (
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(false)}
              className="flex-1 flex items-center justify-center gap-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <X className="w-6 h-6" />
              もう一度
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50 text-green-600 dark:text-green-400 px-6 py-4 rounded-xl font-semibold transition-colors"
            >
              <Check className="w-6 h-6" />
              覚えた
            </button>
          </div>
        )}

        {!isFlipped && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            カードをタップして答えを確認
          </p>
        )}
      </div>
    </div>
  )
}
