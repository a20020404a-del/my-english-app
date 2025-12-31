import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { RotateCcw, Check, X, BookOpen, Trophy, ArrowRight, Volume2 } from 'lucide-react'
import { WordWithStudyInfo } from '../types'
import { getStudyWords, addStudyRecord } from '../services/storage'
import { speakText, initSpeechSynthesis } from '../services/assistant'

type StudyState = 'ready' | 'studying' | 'finished'

export default function StudyPage() {
  const [state, setState] = useState<StudyState>('ready')
  const [words, setWords] = useState<WordWithStudyInfo[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [speechReady, setSpeechReady] = useState(false)
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
    initSpeechSynthesis().then(() => setSpeechReady(true))
  }, [])

  const playPronunciation = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentWord && speechReady) {
      speakText(currentWord.english, 0.8)
    }
  }

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
      <div className="pb-24 md:pb-0 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4 w-full max-w-sm">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            単語学習
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6 text-sm md:text-base">
            {words.length > 0
              ? `${words.length} 単語を学習します`
              : '学習する単語がありません'}
          </p>
          {words.length > 0 ? (
            <button
              onClick={startStudy}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              スタート
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <Link
              to="/words"
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-colors"
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
      <div className="pb-24 md:pb-0 min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-4 w-full max-w-sm">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-8 h-8 md:w-10 md:h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            お疲れ様でした！
          </h1>

          <div className="grid grid-cols-3 gap-2 md:gap-3 mb-6">
            <div className="bg-white dark:bg-slate-900 rounded-xl p-3 md:p-4 border border-slate-100 dark:border-slate-800">
              <p className="text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400">{results.correct}</p>
              <p className="text-xs text-slate-500">正解</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-3 md:p-4 border border-slate-100 dark:border-slate-800">
              <p className="text-2xl md:text-3xl font-bold text-red-500 dark:text-red-400">{results.incorrect}</p>
              <p className="text-xs text-slate-500">不正解</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-xl p-3 md:p-4 border border-slate-100 dark:border-slate-800">
              <p className="text-2xl md:text-3xl font-bold text-indigo-600 dark:text-indigo-400">{accuracy}%</p>
              <p className="text-xs text-slate-500">正答率</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={restartStudy}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-indigo-500/25 active:scale-[0.98]"
            >
              <RotateCcw className="w-5 h-5" />
              もう一度
            </button>
            <Link
              to="/"
              className="w-full flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3.5 rounded-xl font-semibold transition-colors active:scale-[0.98]"
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
    <div className="pb-24 md:pb-0">
      <div className="max-w-md mx-auto">
        {/* Progress */}
        <div className="mb-4 md:mb-6">
          <div className="flex justify-between text-xs md:text-sm text-slate-500 dark:text-slate-400 mb-2">
            <span className="font-medium">{currentIndex + 1} / {words.length}</span>
            <span className="tabular-nums">{Math.round(progress)}%</span>
          </div>
          <div className="h-1.5 md:h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div
          className="perspective cursor-pointer mb-6"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div
            className={`relative w-full aspect-[4/3] md:h-72 transition-transform duration-500 preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
          >
            {/* Front */}
            <div className="absolute inset-0 card-front">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-4 md:p-6">
                <p className="text-[10px] md:text-xs text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-wider">
                  タップして答えを見る
                </p>

                {/* Word with Audio */}
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white">
                    {currentWord?.english}
                  </h2>
                  <button
                    onClick={playPronunciation}
                    disabled={!speechReady}
                    className="p-2 md:p-2.5 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-full transition-colors disabled:opacity-50"
                  >
                    <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </div>

                {/* IPA Pronunciation */}
                {currentWord?.pronunciation?.ipa && (
                  <p className="text-sm md:text-lg font-mono text-indigo-600 dark:text-indigo-400 mb-2">
                    {currentWord.pronunciation.ipa}
                  </p>
                )}

                {/* Example Sentences */}
                {currentWord?.examples && currentWord.examples.length > 0 ? (
                  <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 text-center space-y-1 max-h-16 md:max-h-20 overflow-y-auto px-2">
                    {currentWord.examples.slice(0, 2).map((ex, i) => (
                      <p key={i} className="italic leading-relaxed">"{ex}"</p>
                    ))}
                  </div>
                ) : currentWord?.example && (
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2 text-center italic px-2">
                    "{currentWord.example}"
                  </p>
                )}
              </div>
            </div>

            {/* Back */}
            <div className={`absolute inset-0 card-back ${isFlipped ? 'flipped' : ''}`}>
              <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 md:p-6">
                <p className="text-indigo-200 mb-3 text-xs md:text-sm">答え</p>
                <h2 className="text-2xl md:text-4xl font-bold text-white text-center">
                  {currentWord?.japanese}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        {isFlipped && (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleAnswer(false)}
              className="flex items-center justify-center gap-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 px-4 py-4 md:py-5 rounded-xl font-semibold transition-colors active:scale-[0.98]"
            >
              <X className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">もう一度</span>
            </button>
            <button
              onClick={() => handleAnswer(true)}
              className="flex items-center justify-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-4 md:py-5 rounded-xl font-semibold transition-colors active:scale-[0.98]"
            >
              <Check className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">覚えた</span>
            </button>
          </div>
        )}

        {!isFlipped && (
          <p className="text-center text-xs md:text-sm text-slate-400 dark:text-slate-500">
            カードをタップして答えを確認
          </p>
        )}
      </div>
    </div>
  )
}
