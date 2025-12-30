import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, GraduationCap, Target, Flame, TrendingUp, Award } from 'lucide-react'
import { getWordsWithStudyInfo, calculateStreak, getTodayStudyCount, initializeSampleData } from '../services/storage'
import { UserProgress } from '../types'

export default function DashboardPage() {
  const [progress, setProgress] = useState<UserProgress>({
    totalWords: 0,
    masteredWords: 0,
    learningWords: 0,
    accuracy: 0,
    streak: 0,
    todayStudied: 0,
  })

  useEffect(() => {
    // Initialize sample data on first load
    initializeSampleData()

    // Calculate progress
    const words = getWordsWithStudyInfo()
    const totalWords = words.length
    const masteredWords = words.filter(w => w.mastered).length
    const learningWords = words.filter(w => w.timesStudied > 0 && !w.mastered).length

    const totalStudied = words.reduce((sum, w) => sum + w.timesStudied, 0)
    const totalCorrect = words.reduce((sum, w) => sum + w.timesCorrect, 0)
    const accuracy = totalStudied > 0 ? Math.round((totalCorrect / totalStudied) * 100) : 0

    const streak = calculateStreak()
    const todayStudied = getTodayStudyCount()

    setProgress({
      totalWords,
      masteredWords,
      learningWords,
      accuracy,
      streak,
      todayStudied,
    })
  }, [])

  const stats = [
    {
      icon: BookOpen,
      label: '登録単語数',
      value: progress.totalWords,
      color: 'text-blue-500',
      bg: 'bg-blue-100 dark:bg-blue-900/30',
    },
    {
      icon: Award,
      label: '習得済み',
      value: progress.masteredWords,
      color: 'text-green-500',
      bg: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      icon: Target,
      label: '学習中',
      value: progress.learningWords,
      color: 'text-yellow-500',
      bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    },
    {
      icon: TrendingUp,
      label: '正答率',
      value: `${progress.accuracy}%`,
      color: 'text-purple-500',
      bg: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      icon: Flame,
      label: '連続学習',
      value: `${progress.streak}日`,
      color: 'text-orange-500',
      bg: 'bg-orange-100 dark:bg-orange-900/30',
    },
    {
      icon: GraduationCap,
      label: '今日の学習',
      value: progress.todayStudied,
      color: 'text-indigo-500',
      bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
  ]

  return (
    <div className="sm:ml-64 pb-20 sm:pb-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ダッシュボード
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          学習の進捗を確認しましょう
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Link
          to="/study"
          className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl p-6 flex items-center gap-4 transition-colors"
        >
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">学習を始める</h3>
            <p className="text-primary-100">フラッシュカードで学習</p>
          </div>
        </Link>

        <Link
          to="/words"
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl p-6 flex items-center gap-4 border border-gray-200 dark:border-gray-700 transition-colors"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">単語を管理</h3>
            <p className="text-gray-500 dark:text-gray-400">単語の追加・編集</p>
          </div>
        </Link>
      </div>

      {/* Progress Bar */}
      {progress.totalWords > 0 && (
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            習得進捗
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary-500 to-green-500 transition-all duration-500"
                style={{
                  width: `${(progress.masteredWords / progress.totalWords) * 100}%`,
                }}
              />
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {Math.round((progress.masteredWords / progress.totalWords) * 100)}%
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {progress.masteredWords} / {progress.totalWords} 単語を習得
          </p>
        </div>
      )}
    </div>
  )
}
