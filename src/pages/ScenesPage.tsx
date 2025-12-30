import { useState, useEffect } from 'react'
import { ArrowLeft, Volume2, ChevronRight, Check, RotateCcw } from 'lucide-react'
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            場面別英会話
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            日常のシチュエーションで使える英語フレーズを学習しましょう
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {scenesData.map(scene => (
            <button
              key={scene.id}
              onClick={() => handleSceneSelect(scene)}
              className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all hover:scale-105 text-center group"
            >
              <div className="text-4xl mb-3">{scene.icon}</div>
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                {scene.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {scene.nameEn}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                {scene.subScenes.reduce((acc, sub) => acc + sub.phrases.length, 0)} フレーズ
              </p>
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            使い方
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>1. 学習したい場面を選択</li>
            <li>2. サブシーンを選んでフレーズを確認</li>
            <li>3. 音声ボタンで発音を確認</li>
            <li>4. 練習モードでマスターしましょう</li>
          </ul>
        </div>
      </div>
    )
  }

  // SubScene List View
  if (viewMode === 'subscenes' && selectedScene) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          場面一覧に戻る
        </button>

        <div className="mb-8 text-center">
          <div className="text-5xl mb-4">{selectedScene.icon}</div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedScene.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {selectedScene.description}
          </p>
        </div>

        <div className="space-y-4">
          {selectedScene.subScenes.map(subScene => (
            <button
              key={subScene.id}
              onClick={() => handleSubSceneSelect(subScene)}
              className="w-full p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {subScene.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {subScene.phrases.length} フレーズ
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Phrase List View
  if (viewMode === 'phrases' && selectedSubScene) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          {selectedScene?.name}に戻る
        </button>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {selectedSubScene.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {selectedSubScene.phrases.length} フレーズ
            </p>
          </div>
          <button
            onClick={handleStartPractice}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            練習モード
          </button>
        </div>

        <div className="space-y-4">
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
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          フレーズ一覧に戻る
        </button>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{selectedSubScene.name}</span>
            <span>{currentPhraseIndex + 1} / {selectedSubScene.phrases.length}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          {/* Situation Badge */}
          <div className="px-6 pt-6">
            <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm rounded-full">
              {currentPhrase.situation}
            </span>
          </div>

          {/* Japanese (Question) */}
          <div className="p-6">
            <p className="text-xl text-gray-900 dark:text-white font-medium text-center">
              {currentPhrase.japanese}
            </p>
          </div>

          {/* Answer Section */}
          {showAnswer ? (
            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {currentPhrase.english}
                  </p>
                  <button
                    onClick={(e) => playAudio(currentPhrase.english, e)}
                    className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
                    disabled={!speechReady}
                  >
                    <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </button>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {currentPhrase.pronunciation}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-6 border-t dark:border-gray-700">
              <button
                onClick={() => setShowAnswer(true)}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
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
              className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                isCompleted
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Check className="w-5 h-5" />
              {isCompleted ? '覚えた！' : '覚えたらチェック'}
            </button>

            <div className="flex gap-4">
              <button
                onClick={handlePrevPhrase}
                disabled={currentPhraseIndex === 0}
                className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                前へ
              </button>
              <button
                onClick={handleNextPhrase}
                disabled={currentPhraseIndex === selectedSubScene.phrases.length - 1}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                次へ
              </button>
            </div>

            {currentPhraseIndex === selectedSubScene.phrases.length - 1 && (
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <p className="text-green-800 dark:text-green-200 font-medium mb-2">
                  このセクション完了！
                </p>
                <p className="text-sm text-green-600 dark:text-green-300 mb-4">
                  {completedPhrases.size} / {selectedSubScene.phrases.length} フレーズを覚えました
                </p>
                <button
                  onClick={() => {
                    setCurrentPhraseIndex(0)
                    setShowAnswer(false)
                  }}
                  className="flex items-center justify-center gap-2 mx-auto text-green-700 dark:text-green-300 hover:underline"
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
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
                {phrase.situation}
              </span>
            </div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {phrase.english}
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {phrase.japanese}
            </p>
          </div>
          <button
            onClick={(e) => onPlayAudio(phrase.english, e)}
            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors ml-4"
            disabled={!speechReady}
          >
            <Volume2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </button>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">発音</p>
            <p className="text-lg text-blue-600 dark:text-blue-400">
              {phrase.pronunciation}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
