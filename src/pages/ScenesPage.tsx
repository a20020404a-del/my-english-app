import { useState, useEffect } from 'react'
import { ArrowLeft, Volume2, ChevronRight, Check, RotateCcw, Play } from 'lucide-react'
import { scenesData, Scene, SubScene, Phrase } from '../data/scenes'
import { speakText, initSpeechSynthesis } from '../services/assistant'

type ViewMode = 'scenes' | 'subscenes' | 'phrases' | 'practice'

export default function ScenesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('scenes')
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null)
  const [selectedSubScene, setSelectedSubScene] = useState<SubScene | null>(null)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [completedPhrases, setCompletedPhrases] = useState<Set<string>>(new Set())
  const [speechReady, setSpeechReady] = useState(false)

  useEffect(() => {
    initSpeechSynthesis().then(() => setSpeechReady(true))
  }, [])

  const playAudio = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (speechReady) {
      speakText(text, 0.8)
    }
  }

  const handleSceneSelect = (scene: Scene) => {
    setSelectedScene(scene)
    setViewMode('subscenes')
  }

  const handleSubSceneSelect = (subScene: SubScene) => {
    setSelectedSubScene(subScene)
    setCurrentPhraseIndex(0)
    setShowAnswer(false)
    setViewMode('phrases')
  }

  const handleStartPractice = () => {
    setCurrentPhraseIndex(0)
    setShowAnswer(false)
    setCompletedPhrases(new Set())
    setViewMode('practice')
  }

  const handleBack = () => {
    if (viewMode === 'practice') {
      setViewMode('phrases')
    } else if (viewMode === 'phrases') {
      setViewMode('subscenes')
      setSelectedSubScene(null)
    } else if (viewMode === 'subscenes') {
      setViewMode('scenes')
      setSelectedScene(null)
    }
  }

  const handleNextPhrase = () => {
    if (selectedSubScene && currentPhraseIndex < selectedSubScene.phrases.length - 1) {
      setCurrentPhraseIndex(prev => prev + 1)
      setShowAnswer(false)
    }
  }

  const handlePrevPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(prev => prev - 1)
      setShowAnswer(false)
    }
  }

  const handleMarkComplete = (phraseId: string) => {
    setCompletedPhrases(prev => {
      const newSet = new Set(prev)
      if (newSet.has(phraseId)) {
        newSet.delete(phraseId)
      } else {
        newSet.add(phraseId)
      }
      return newSet
    })
  }

  // Scene Grid View
  if (viewMode === 'scenes') {
    return (
      <div className="max-w-5xl mx-auto pb-20 md:pb-0">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 tracking-wide uppercase">
            Situational English
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
            場面別英会話
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            実際のシチュエーションで使える表現を学ぼう
          </p>
        </div>

        {/* Scene Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {scenesData.map(scene => {
            const phraseCount = scene.subScenes.reduce((acc, sub) => acc + sub.phrases.length, 0)
            return (
              <button
                key={scene.id}
                onClick={() => handleSceneSelect(scene)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 text-left transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50 hover:-translate-y-1 border border-slate-100 dark:border-slate-800"
              >
                <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {scene.icon}
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-base mb-1 leading-tight">
                  {scene.name}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-3">
                  {scene.nameEn}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                    {phraseCount}
                  </span>
                  <span className="text-xs text-slate-400">フレーズ</span>
                </div>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </button>
            )
          })}
        </div>

        {/* Tips Card */}
        <div className="mt-10 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-2xl border border-indigo-100/50 dark:border-indigo-900/30">
          <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xs">💡</span>
            学習のコツ
          </h3>
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>まずは場面を選んで、状況をイメージしながら学習</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>音声を聞いて、声に出して練習すると効果的</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-400 mt-1">•</span>
              <span>練習モードでフラッシュカード形式の復習ができます</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  // SubScene List View
  if (viewMode === 'subscenes' && selectedScene) {
    return (
      <div className="max-w-3xl mx-auto pb-20 md:pb-0">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">戻る</span>
        </button>

        {/* Scene Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 mb-5 shadow-sm">
            <span className="text-4xl">{selectedScene.icon}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            {selectedScene.name}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {selectedScene.description}
          </p>
        </div>

        {/* SubScene List */}
        <div className="space-y-3">
          {selectedScene.subScenes.map((subScene, index) => (
            <button
              key={subScene.id}
              onClick={() => handleSubSceneSelect(subScene)}
              className="group w-full p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-200 flex items-center justify-between hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-slate-900/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-semibold text-sm">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-0.5">
                    {subScene.name}
                  </h3>
                  <p className="text-sm text-slate-400 dark:text-slate-500">
                    {subScene.phrases.length} フレーズ
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Phrase List View
  if (viewMode === 'phrases' && selectedSubScene) {
    return (
      <div className="max-w-3xl mx-auto pb-20 md:pb-0">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">{selectedScene?.name}</span>
        </button>

        {/* Header with Practice Button */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {selectedSubScene.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              {selectedSubScene.phrases.length} フレーズ
            </p>
          </div>
          <button
            onClick={handleStartPractice}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-500/25"
          >
            <Play className="w-4 h-4" />
            <span>練習する</span>
          </button>
        </div>

        {/* Phrase Cards */}
        <div className="space-y-3">
          {selectedSubScene.phrases.map((phrase, index) => (
            <PhraseCard
              key={index}
              phrase={phrase}
              onPlayAudio={playAudio}
              speechReady={speechReady}
            />
          ))}
        </div>
      </div>
    )
  }

  // Practice Mode View
  if (viewMode === 'practice' && selectedSubScene) {
    const currentPhrase = selectedSubScene.phrases[currentPhraseIndex]
    const phraseId = `${selectedSubScene.id}-${currentPhraseIndex}`
    const progress = ((currentPhraseIndex + 1) / selectedSubScene.phrases.length) * 100
    const isCompleted = completedPhrases.has(phraseId)

    return (
      <div className="max-w-xl mx-auto pb-20 md:pb-0">
        <button
          onClick={handleBack}
          className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">フレーズ一覧</span>
        </button>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-600 dark:text-slate-400 font-medium">{selectedSubScene.name}</span>
            <span className="text-slate-400 dark:text-slate-500 tabular-nums">
              {currentPhraseIndex + 1} / {selectedSubScene.phrases.length}
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Flashcard */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50">
          {/* Situation Tag */}
          <div className="px-6 pt-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-800/30">
              {currentPhrase.situation}
            </span>
          </div>

          {/* Question */}
          <div className="p-8">
            <p className="text-xl md:text-2xl text-slate-900 dark:text-white font-medium text-center leading-relaxed">
              {currentPhrase.japanese}
            </p>
          </div>

          {/* Answer */}
          {showAnswer ? (
            <div className="p-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <p className="text-xl md:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {currentPhrase.english}
                  </p>
                  <button
                    onClick={(e) => playAudio(currentPhrase.english, e)}
                    className="p-2.5 rounded-full bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 transition-colors"
                    disabled={!speechReady}
                  >
                    <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </button>
                </div>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                  {currentPhrase.pronunciation}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors font-semibold text-lg"
              >
                答えを見る
              </button>
            </div>
          )}
        </div>

        {/* Actions */}
        {showAnswer && (
          <div className="mt-6 space-y-4">
            <button
              onClick={() => handleMarkComplete(phraseId)}
              className={`w-full py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                isCompleted
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
              }`}
            >
              <Check className={`w-5 h-5 ${isCompleted ? 'text-emerald-500' : ''}`} />
              {isCompleted ? '覚えた！' : '覚えたらチェック'}
            </button>

            <div className="flex gap-3">
              <button
                onClick={handlePrevPhrase}
                disabled={currentPhraseIndex === 0}
                className="flex-1 py-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium"
              >
                前へ
              </button>
              <button
                onClick={handleNextPhrase}
                disabled={currentPhraseIndex === selectedSubScene.phrases.length - 1}
                className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed font-medium shadow-lg shadow-indigo-500/25"
              >
                次へ
              </button>
            </div>

            {currentPhraseIndex === selectedSubScene.phrases.length - 1 && (
              <div className="mt-4 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎉</span>
                </div>
                <p className="text-emerald-800 dark:text-emerald-200 font-semibold mb-1">
                  セクション完了！
                </p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-4">
                  {completedPhrases.size} / {selectedSubScene.phrases.length} フレーズを覚えました
                </p>
                <button
                  onClick={() => {
                    setCurrentPhraseIndex(0)
                    setShowAnswer(false)
                  }}
                  className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  もう一度練習する
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return null
}

// Phrase Card Component
function PhraseCard({
  phrase,
  onPlayAudio,
  speechReady
}: {
  phrase: Phrase
  onPlayAudio: (text: string, e?: React.MouseEvent) => void
  speechReady: boolean
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 overflow-hidden cursor-pointer transition-all duration-200 hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-lg hover:shadow-slate-100/50 dark:hover:shadow-slate-900/50"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {phrase.situation}
              </span>
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
              {phrase.english}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">
              {phrase.japanese}
            </p>
          </div>
          <button
            onClick={(e) => onPlayAudio(phrase.english, e)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors flex-shrink-0 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30"
            disabled={!speechReady}
          >
            <Volume2 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-1 font-medium uppercase tracking-wider">発音</p>
            <p className="text-base text-indigo-600 dark:text-indigo-400 font-medium">
              {phrase.pronunciation}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
