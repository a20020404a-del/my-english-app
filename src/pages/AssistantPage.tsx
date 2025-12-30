import { useState } from 'react'
import { Search, Volume2, BookOpen, Lightbulb, MessageCircle, Loader2, Sparkles } from 'lucide-react'
import { WordAnalysis, LearnerLevel } from '../types/assistant'
import { analyzeWord, getLevelLabel } from '../services/assistant'

export default function AssistantPage() {
  const [input, setInput] = useState('')
  const [level, setLevel] = useState<LearnerLevel>('intermediate')
  const [analysis, setAnalysis] = useState<WordAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setError('')
    setAnalysis(null)

    try {
      const result = await analyzeWord(input, level)
      setAnalysis(result)
    } catch {
      setError('分析中にエラーが発生しました。もう一度お試しください。')
    } finally {
      setLoading(false)
    }
  }

  const speakWord = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.8
    speechSynthesis.speak(utterance)
  }

  return (
    <div className="sm:ml-64 pb-20 sm:pb-0">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            AI学習アシスタント
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          英単語を入力すると、発音・意味・例文・学習アドバイスを提供します
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="英単語を入力... (例: available, comfortable)"
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
            />
          </div>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as LearnerLevel)}
            className="px-4 py-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500"
          >
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                分析
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-xl">
          {error}
        </div>
      )}

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm mb-1">{getLevelLabel(analysis.level)}レベル</p>
                <h2 className="text-4xl font-bold">{analysis.word}</h2>
              </div>
              <button
                onClick={() => speakWord(analysis.word)}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                title="発音を聞く"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Pronunciation */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Volume2 className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">発音情報</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">IPA表記</p>
                <p className="text-xl font-mono text-gray-900 dark:text-white">{analysis.pronunciation.ipa}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">カタカナ発音</p>
                <p className="text-xl text-gray-900 dark:text-white">{analysis.pronunciation.katakana}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">音節・アクセント</p>
                <p className="text-lg text-gray-900 dark:text-white">{analysis.pronunciation.syllables}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">発音のポイント</p>
                <p className="text-gray-700 dark:text-gray-300 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                  💡 {analysis.pronunciation.tips}
                </p>
              </div>
            </div>
          </div>

          {/* Meaning */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">意味と用法</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">品詞</p>
                <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                  {analysis.meaning.partOfSpeech}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">主な意味</p>
                <p className="text-lg text-gray-900 dark:text-white">{analysis.meaning.primary}</p>
              </div>
              {analysis.meaning.synonyms.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">類義語</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.meaning.synonyms.map((syn, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm cursor-pointer hover:bg-green-200 dark:hover:bg-green-900/50"
                        onClick={() => {
                          setInput(syn)
                          speakWord(syn)
                        }}
                      >
                        {syn}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {analysis.meaning.antonyms.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">対義語</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.meaning.antonyms.map((ant, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-sm cursor-pointer hover:bg-red-200 dark:hover:bg-red-900/50"
                        onClick={() => {
                          setInput(ant)
                          speakWord(ant)
                        }}
                      >
                        {ant}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Examples */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <MessageCircle className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                実用例文 ({getLevelLabel(analysis.level)})
              </h3>
            </div>
            <div className="space-y-4">
              {analysis.examples.map((example, i) => (
                <div
                  key={i}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="text-lg text-gray-900 dark:text-white font-medium">
                      {example.english}
                    </p>
                    <button
                      onClick={() => speakWord(example.english)}
                      className="p-2 text-gray-400 hover:text-purple-500 transition-colors flex-shrink-0"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {example.japanese}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
                      📝 {example.grammar}
                    </span>
                    <span className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded">
                      🎬 {example.scene}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Advice */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">学習アドバイス</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                <p className="text-sm font-medium text-yellow-800 dark:text-yellow-400 mb-1">
                  💡 覚えるコツ
                </p>
                <p className="text-gray-700 dark:text-gray-300">{analysis.advice.memorization}</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                <p className="text-sm font-medium text-red-800 dark:text-red-400 mb-1">
                  ⚠️ よくある間違い
                </p>
                <p className="text-gray-700 dark:text-gray-300">{analysis.advice.commonMistakes}</p>
              </div>
              {analysis.advice.relatedExpressions.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">🔗 関連表現</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.advice.relatedExpressions.map((expr, i) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm"
                      >
                        {expr}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!analysis && !loading && (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            単語を入力してください
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            英単語を入力すると、AIが詳しい学習情報を提供します
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['available', 'comfortable', 'important', 'beautiful'].map((word) => (
              <button
                key={word}
                onClick={() => {
                  setInput(word)
                }}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
