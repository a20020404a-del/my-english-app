import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, GraduationCap, Target, Flame, TrendingUp, Award, ChevronRight, MessageCircle } from 'lucide-react'
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
    initializeSampleData()

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
      label: '登録単語',
      value: progress.totalWords,
      color: 'text-blue-600 dark:text-blue-400',
      bg: 'bg-blue-50 dark:bg-blue-500/10',
    },
    {
      icon: Award,
      label: '習得済み',
      value: progress.masteredWords,
      color: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50 dark:bg-emerald-500/10',
    },
    {
      icon: Target,
      label: '学習中',
      value: progress.learningWords,
      color: 'text-amber-600 dark:text-amber-400',
      bg: 'bg-amber-50 dark:bg-amber-500/10',
    },
    {
      icon: TrendingUp,
      label: '正答率',
      value: `${progress.accuracy}%`,
      color: 'text-purple-600 dark:text-purple-400',
      bg: 'bg-purple-50 dark:bg-purple-500/10',
    },
    {
      icon: Flame,
      label: '連続',
      value: `${progress.streak}日`,
      color: 'text-orange-600 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-500/10',
    },
    {
      icon: GraduationCap,
      label: '今日',
      value: progress.todayStudied,
      color: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50 dark:bg-indigo-500/10',
    },
  ]

  return (
    <div className="pb-24 md:pb-0">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
          Welcome back
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          ダッシュボード
        </h1>
      </div>

      {/* Stats Grid - 3x2 on mobile */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div
            key={label}
            className="bg-white dark:bg-slate-900 rounded-xl p-3 md:p-4 border border-slate-100 dark:border-slate-800"
          >
            <div className={`w-8 h-8 md:w-10 md:h-10 ${bg} rounded-lg flex items-center justify-center mb-2`}>
              <Icon className={`w-4 h-4 md:w-5 md:h-5 ${color}`} />
            </div>
            <p className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
              {value}
            </p>
            <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 truncate">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions - Stack on mobile */}
      <div className="space-y-3 mb-6">
        <Link
          to="/study"
          className="flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-4 md:p-5 shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-base md:text-lg">単語学習を始める</h3>
              <p className="text-indigo-200 text-xs md:text-sm">フラッシュカードで学習</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-indigo-200" />
        </Link>

        <Link
          to="/scenes"
          className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-4 md:p-5 border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">場面別英会話</h3>
              <p className="text-slate-500 text-xs md:text-sm">シチュエーション学習</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
        </Link>

        <Link
          to="/words"
          className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-xl p-4 md:p-5 border border-slate-100 dark:border-slate-800 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-base md:text-lg">単語を管理</h3>
              <p className="text-slate-500 text-xs md:text-sm">追加・編集・削除</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600" />
        </Link>
      </div>

      {/* Progress Bar */}
      {progress.totalWords > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 md:p-5 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
              習得進捗
            </h3>
            <span className="text-xs md:text-sm font-medium text-indigo-600 dark:text-indigo-400">
              {Math.round((progress.masteredWords / progress.totalWords) * 100)}%
            </span>
          </div>
          <div className="h-2 md:h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 rounded-full"
              style={{
                width: `${(progress.masteredWords / progress.totalWords) * 100}%`,
              }}
            />
          </div>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-2">
            {progress.masteredWords} / {progress.totalWords} 単語を習得
          </p>
        </div>
      )}
    </div>
  )
}
