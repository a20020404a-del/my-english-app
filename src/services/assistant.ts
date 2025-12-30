import { WordAnalysis, LearnerLevel } from '../types/assistant'

const API_URL = '/api'

// Call AI API for word analysis
export async function analyzeWord(word: string, level: LearnerLevel): Promise<WordAnalysis> {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ word, level }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error(result.error || 'Analysis failed')
    }

    return result.data as WordAnalysis
  } catch (error) {
    console.error('API call failed, using fallback:', error)
    // Fallback to local data if API fails
    return generateFallbackAnalysis(word, level)
  }
}

// Fallback local analysis for when API is unavailable
function generateFallbackAnalysis(word: string, level: LearnerLevel): WordAnalysis {
  const fallbackData = getFallbackData(word.toLowerCase())

  if (fallbackData) {
    return {
      word: word.toLowerCase(),
      level,
      ...fallbackData[level] || fallbackData.intermediate,
    }
  }

  // Generic fallback
  return {
    word: word.toLowerCase(),
    level,
    pronunciation: {
      ipa: `/${word}/`,
      katakana: 'カタカナ表記は準備中',
      tips: 'この単語の発音情報はAI分析をお待ちください。サーバーが起動していることを確認してください。',
      syllables: word.toUpperCase(),
      accentPosition: 1,
    },
    meaning: {
      primary: 'AI分析中...',
      partOfSpeech: '不明',
      synonyms: [],
      antonyms: [],
    },
    examples: [
      {
        english: `Example with "${word}" is being generated...`,
        japanese: 'AI分析をお待ちください',
        grammar: 'サーバー起動: npm run server',
        scene: 'API接続待ち',
      },
    ],
    advice: {
      memorization: 'AI分析機能を使用するには、別ターミナルで npm run server を実行してください。',
      commonMistakes: '',
      relatedExpressions: [],
    },
  }
}

// Comprehensive fallback data for common words
function getFallbackData(word: string): Record<LearnerLevel, Omit<WordAnalysis, 'word' | 'level'>> | null {
  const data: Record<string, Record<LearnerLevel, Omit<WordAnalysis, 'word' | 'level'>>> = {
    'available': {
      beginner: {
        pronunciation: {
          ipa: '/əˈveɪ.lə.bəl/',
          katakana: 'アヴェイラブル',
          tips: '「ア」は軽く、「ヴェイ」を強く発音。「ラブル」は軽く添える程度に。',
          syllables: 'a-VAI-la-ble',
          accentPosition: 2,
        },
        meaning: {
          primary: '利用可能な、空いている、手に入る',
          partOfSpeech: '形容詞',
          synonyms: ['free', 'open', 'ready'],
          antonyms: ['unavailable', 'busy', 'occupied'],
        },
        examples: [
          {
            english: 'Is this seat available?',
            japanese: 'この席は空いていますか？',
            grammar: 'Is + 名詞 + available? で「〜は空いていますか？」',
            scene: 'カフェやレストランで席を探すとき',
          },
          {
            english: 'The book is available at the library.',
            japanese: 'その本は図書館にあります。',
            grammar: 'be available at + 場所 で「〜で手に入る」',
            scene: '本や商品がどこにあるか伝えるとき',
          },
          {
            english: 'I am available tomorrow.',
            japanese: '明日は空いています。',
            grammar: '人 + be available で「都合がつく」',
            scene: '予定を聞かれたとき',
          },
        ],
        advice: {
          memorization: '「a-vail-able」と分解。avail（役に立つ）+ able（可能）＝利用可能',
          commonMistakes: '「アベイラブル」ではなく「アヴェイラブル」。vの音を忘れずに。',
          relatedExpressions: ['availability（利用可能性）', 'unavailable（利用不可）'],
        },
      },
      intermediate: {
        pronunciation: {
          ipa: '/əˈveɪ.lə.bəl/',
          katakana: 'アヴェイラブル',
          tips: '第2音節にストレス。schwa(ə)の音が3回出てくる点に注意。',
          syllables: 'a-VAI-la-ble',
          accentPosition: 2,
        },
        meaning: {
          primary: '利用可能な、入手可能な、（人が）都合がつく',
          partOfSpeech: '形容詞',
          synonyms: ['accessible', 'obtainable', 'at hand'],
          antonyms: ['unavailable', 'inaccessible', 'occupied'],
        },
        examples: [
          {
            english: "I'm available for a meeting anytime this week.",
            japanese: '今週ならいつでも会議に参加できます。',
            grammar: 'available for + 行動 で「〜に参加できる状態」',
            scene: 'ビジネスでスケジュール調整するとき',
          },
          {
            english: 'This product is only available online.',
            japanese: 'この商品はオンラインでのみ購入可能です。',
            grammar: 'only available + 場所/方法 で限定を表す',
            scene: '商品の販売方法を説明するとき',
          },
          {
            english: 'Let me check if the manager is available.',
            japanese: 'マネージャーの都合を確認させてください。',
            grammar: 'if + 人 + is available で「〜の都合がつくかどうか」',
            scene: 'オフィスで取り次ぎをするとき',
          },
        ],
        advice: {
          memorization: 'avail（利益・効果）+ able で「利用できる状態」と覚える',
          commonMistakes: 'available to と available for の使い分け。人にはto、目的にはfor。',
          relatedExpressions: ['make available（利用可能にする）', 'readily available（すぐ手に入る）'],
        },
      },
      advanced: {
        pronunciation: {
          ipa: '/əˈveɪ.lə.bəl/',
          katakana: 'アヴェイラブル',
          tips: '速い会話では「əˈveɪləbl」と短縮されることも。フォーマルな場面では全音節を明瞭に。',
          syllables: 'a-VAI-la-ble',
          accentPosition: 2,
        },
        meaning: {
          primary: '利用可能な、入手可能な、応じられる状態の',
          partOfSpeech: '形容詞',
          synonyms: ['accessible', 'obtainable', 'at one\'s disposal'],
          antonyms: ['unavailable', 'inaccessible', 'engaged'],
        },
        examples: [
          {
            english: 'We need to leverage all available resources to meet the deadline.',
            japanese: '締め切りに間に合わせるため、利用可能なすべてのリソースを活用する必要があります。',
            grammar: 'all available + 名詞 で「利用可能なすべての〜」',
            scene: 'プロジェクト管理の議論',
          },
          {
            english: 'The data will be made available to researchers upon request.',
            japanese: 'データは要請に応じて研究者に公開されます。',
            grammar: 'be made available to + 人 で「〜に公開される」（受動態）',
            scene: '学術・研究機関でのデータ共有',
          },
          {
            english: 'She made herself available for consultation throughout the process.',
            japanese: '彼女はプロセス全体を通じて相談に応じる姿勢を見せた。',
            grammar: 'make oneself available for で「〜に応じる用意がある」',
            scene: 'リーダーシップを示す場面',
          },
        ],
        advice: {
          memorization: '語源はラテン語のvalere（価値がある）から。valuable（価値ある）と同根。',
          commonMistakes: 'available of は誤り。available to/for/at を正しく使い分ける。',
          relatedExpressions: ['availability window（利用可能期間）', 'subject to availability（在庫状況による）'],
        },
      },
    },
  }

  return data[word] || null
}

// Get level label in Japanese
export function getLevelLabel(level: LearnerLevel): string {
  switch (level) {
    case 'beginner': return '初級'
    case 'intermediate': return '中級'
    case 'advanced': return '上級'
  }
}

// Text-to-speech function
export function speakText(text: string, rate: number = 0.8): void {
  // Cancel any ongoing speech
  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  utterance.pitch = 1
  utterance.volume = 1

  // Try to get a good English voice
  const voices = speechSynthesis.getVoices()
  const englishVoice = voices.find(v =>
    v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Google'))
  ) || voices.find(v => v.lang.startsWith('en-US'))

  if (englishVoice) {
    utterance.voice = englishVoice
  }

  speechSynthesis.speak(utterance)
}

// Initialize voices (needed for some browsers)
export function initSpeechSynthesis(): Promise<void> {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices()
    if (voices.length > 0) {
      resolve()
    } else {
      speechSynthesis.onvoiceschanged = () => resolve()
    }
  })
}
