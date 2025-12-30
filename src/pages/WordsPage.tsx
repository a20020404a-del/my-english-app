import { useState, useEffect } from 'react'
import { Plus, Search, Edit2, Trash2, X } from 'lucide-react'
import { Word, WordFormData } from '../types'
import { getWords, addWord, updateWord, deleteWord } from '../services/storage'

export default function WordsPage() {
  const [words, setWords] = useState<Word[]>([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingWord, setEditingWord] = useState<Word | null>(null)
  const [formData, setFormData] = useState<WordFormData>({
    english: '',
    japanese: '',
    example: '',
    category: '',
    difficulty: 1,
  })

  useEffect(() => {
    loadWords()
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
      case 1: return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 2: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 3: return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default: return ''
    }
  }

  return (
    <div className="sm:ml-64 pb-20 sm:pb-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">単語帳</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {words.length} 単語を登録中
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          単語を追加
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="単語を検索..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        />
      </div>

      {/* Word List */}
      <div className="grid gap-4">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {search ? '検索結果がありません' : '単語がまだ登録されていません'}
          </div>
        ) : (
          filteredWords.map(word => (
            <div
              key={word.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {word.english}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor(word.difficulty)}`}>
                      {difficultyLabel(word.difficulty)}
                    </span>
                    {word.category && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                        {word.category}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">{word.japanese}</p>
                  {word.example && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2 italic">
                      "{word.example}"
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(word)}
                    className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(word.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {editingWord ? '単語を編集' : '単語を追加'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  英単語 *
                </label>
                <input
                  type="text"
                  value={formData.english}
                  onChange={e => setFormData({ ...formData, english: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  日本語訳 *
                </label>
                <input
                  type="text"
                  value={formData.japanese}
                  onChange={e => setFormData({ ...formData, japanese: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  例文
                </label>
                <input
                  type="text"
                  value={formData.example}
                  onChange={e => setFormData({ ...formData, example: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  カテゴリ
                </label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  placeholder="例: 動詞、名詞、形容詞..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  難易度
                </label>
                <select
                  value={formData.difficulty}
                  onChange={e => setFormData({ ...formData, difficulty: Number(e.target.value) as 1 | 2 | 3 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:ring-2 focus:ring-primary-500"
                >
                  <option value={1}>初級</option>
                  <option value={2}>中級</option>
                  <option value={3}>上級</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
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
