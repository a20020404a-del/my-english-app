import { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, X, Volume2 } from 'lucide-react'
import { Word, WordFormData } from '../types'
import { getWords, addWord, updateWord, deleteWord } from '../services/storage'
import { speakText, initSpeechSynthesis } from '../services/assistant'

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingWord, setEditingWord] = useState<Word | null>(null)
  const [speechReady, setSpeechReady] = useState(false)
  const [formData, setFormData] = useState<WordFormData>({
    english: '',
    japanese: '',
    example: '',
    category: '',
    difficulty: 1,
  })

  useEffect(() => {
    loadWords()
    initSpeechSynthesis().then(() => setSpeechReady(true))
  }, [])

  const loadWords = () => {
    setWords(getWords())
  }

  const filteredWords = words.filter(
    w =>
      w.english.toLowerCase().includes(search.toLowerCase()) ||
      w.japanese.includes(search)
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingWord) {
      updateWord(editingWord.id, formData)
    } else {
      addWord(formData)
    }
    resetForm()
    loadWords()
  }

  const handleEdit = (word: Word) => {
    setEditingWord(word)
    setFormData({
      english: word.english,
      japanese: word.japanese,
      example: word.example || '',
      category: word.category || '',
      difficulty: word.difficulty,
    })
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('この単語を削除しますか？')) {
      deleteWord(id)
      loadWords()
    }
  }

  const resetForm = () => {
    setShowForm(false)
    setEditingWord(null)
    setFormData({
      english: '',
      japanese: '',
      example: '',
      category: '',
      difficulty: 1,
    })
  }

  const playWord = (word: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (speechReady) {
      speakText(word, 0.8)
    }
  }

  const difficultyLabel = (d: number) => {
    switch (d) {
      case 1: return '初級'
      case 2: return '中級'
      case 3: return '上級'
      default: return ''
    }
  }

  const difficultyColor = (d: number) => {
    switch (d) {
      case 1: return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
      case 2: return 'bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400'
      case 3: return 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'
      default: return ''
    }
  }

  return (
    <div className="pb-24 md:pb-0">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">単語帳</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {words.length} 単語
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 md:px-4 md:py-2.5 rounded-xl transition-colors text-sm font-medium shadow-lg shadow-indigo-500/20 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">追加</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        <input
          type="text"
          placeholder="単語を検索..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 md:pl-10 pr-4 py-2.5 md:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
        />
      </div>

      {/* Word List */}
      <div className="space-y-2 md:space-y-3">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12 text-slate-500 dark:text-slate-400">
            <p className="text-sm">{search ? '検索結果がありません' : '単語がまだ登録されていません'}</p>
          </div>
        ) : (
          filteredWords.map(word => (
            <div
              key={word.id}
              className="bg-white dark:bg-slate-900 rounded-xl p-3.5 md:p-4 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white">
                      {word.english}
                    </h3>
                    <button
                      onClick={(e) => playWord(word.english, e)}
                      disabled={!speechReady}
                      className="p-1 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span className={`text-[10px] md:text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor(word.difficulty)}`}>
                      {difficultyLabel(word.difficulty)}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{word.japanese}</p>
                  {word.category && (
                    <span className="inline-block mt-1.5 text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      {word.category}
                    </span>
                  )}
                  {word.example && (
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 italic line-clamp-2">
                      "{word.example}"
                    </p>
                  )}
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(word)}
                    className="p-2 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(word.id)}
                    className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Form Modal - Full screen on mobile */}
      {showForm && (
        <div className="fixed inset-0 z-50 md:bg-slate-900/50 md:flex md:items-center md:justify-center md:p-4">
          <div className="h-full md:h-auto bg-white dark:bg-slate-900 md:rounded-2xl w-full md:max-w-md md:max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                {editingWord ? '単語を編集' : '単語を追加'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  英単語 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.english}
                  onChange={e => setFormData({ ...formData, english: e.target.value })}
                  required
                  autoFocus
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 text-base"
                  placeholder="apple"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  日本語訳 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.japanese}
                  onChange={e => setFormData({ ...formData, japanese: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 text-base"
                  placeholder="りんご"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  例文
                </label>
                <input
                  type="text"
                  value={formData.example}
                  onChange={e => setFormData({ ...formData, example: e.target.value })}
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 text-base"
                  placeholder="I eat an apple every day."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  カテゴリ
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="名詞、動詞、形容詞..."
                  className="w-full px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  難易度
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, difficulty: level as 1 | 2 | 3 })}
                      className={`py-2.5 rounded-xl text-sm font-medium transition-all ${
                        formData.difficulty === level
                          ? level === 1
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 ring-2 ring-emerald-500'
                            : level === 2
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 ring-2 ring-amber-500'
                            : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 ring-2 ring-red-500'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {difficultyLabel(level)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium text-slate-700 dark:text-slate-300"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors font-medium shadow-lg shadow-indigo-500/25"
                >
                  {editingWord ? '更新' : '追加'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
