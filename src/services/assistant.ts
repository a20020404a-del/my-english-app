import { WordAnalysis, LearnerLevel, PronunciationInfo, WordMeaning, ExampleSentence, LearningAdvice } from '../types/assistant'

// Pronunciation database for common words
const pronunciationDB: Record<string, PronunciationInfo> = {
  'photograph': {
    ipa: '/ˈfoʊ.tə.ɡræf/',
    katakana: 'フォウタグラフ',
    tips: '第一音節にアクセント。"ph"は「フ」の音。最後の"graph"は「グラフ」ではなく短く発音。',
    syllables: 'PHO-to-graph',
    accentPosition: 1,
  },
  'available': {
    ipa: '/əˈveɪ.lə.bəl/',
    katakana: 'アヴェイラブル',
    tips: '第二音節にアクセント。"vai"は「ヴェイ」と二重母音。最後の"ble"は軽く。',
    syllables: 'a-VAI-la-ble',
    accentPosition: 2,
  },
  'comfortable': {
    ipa: '/ˈkʌmf.tə.bəl/',
    katakana: 'カンフタブル',
    tips: '注意！4音節ではなく3音節。"fort"は弱く発音。日本人は「コンフォータブル」と言いがちだが間違い。',
    syllables: 'COMF-ta-ble',
    accentPosition: 1,
  },
  'schedule': {
    ipa: '/ˈskedʒ.uːl/ (米) /ˈʃedʒ.uːl/ (英)',
    katakana: 'スケジュール（米）/ シェジュール（英）',
    tips: 'アメリカ英語は「スケ」、イギリス英語は「シェ」で始まる。どちらも正しい。',
    syllables: 'SCHED-ule',
    accentPosition: 1,
  },
  'important': {
    ipa: '/ɪmˈpɔːr.tənt/',
    katakana: 'インポータント',
    tips: '第二音節にアクセント。"por"を強く長めに発音。最後の"tant"は軽く。',
    syllables: 'im-POR-tant',
    accentPosition: 2,
  },
  'beautiful': {
    ipa: '/ˈbjuː.tɪ.fəl/',
    katakana: 'ビューティフル',
    tips: '第一音節にアクセント。"beau"は「ビュー」と発音。"ti"は軽く。',
    syllables: 'BEAU-ti-ful',
    accentPosition: 1,
  },
  'opportunity': {
    ipa: '/ˌɑː.pərˈtuː.nə.ti/',
    katakana: 'アパチューニティ',
    tips: '第三音節にアクセント。"tu"は「チュー」と発音。5音節ある長い単語。',
    syllables: 'op-por-TU-ni-ty',
    accentPosition: 3,
  },
  'environment': {
    ipa: '/ɪnˈvaɪ.rən.mənt/',
    katakana: 'インヴァイランメント',
    tips: '第二音節にアクセント。"vi"は「ヴァイ」と二重母音。"ron"は軽く。',
    syllables: 'en-VI-ron-ment',
    accentPosition: 2,
  },
}

// Generate pronunciation for unknown words
function generatePronunciation(word: string): PronunciationInfo {
  return {
    ipa: `/${word}/`,
    katakana: word.toUpperCase(),
    tips: 'この単語の詳細な発音情報は準備中です。辞書で確認することをお勧めします。',
    syllables: word.toUpperCase(),
    accentPosition: 1,
  }
}

// Meaning database
const meaningDB: Record<string, WordMeaning> = {
  'available': {
    primary: '利用可能な、入手できる、（人が）都合がつく',
    partOfSpeech: '形容詞',
    synonyms: ['accessible', 'obtainable', 'free'],
    antonyms: ['unavailable', 'occupied', 'busy'],
  },
  'important': {
    primary: '重要な、大切な',
    partOfSpeech: '形容詞',
    synonyms: ['significant', 'essential', 'crucial'],
    antonyms: ['unimportant', 'trivial', 'minor'],
  },
  'beautiful': {
    primary: '美しい、きれいな',
    partOfSpeech: '形容詞',
    synonyms: ['gorgeous', 'stunning', 'lovely'],
    antonyms: ['ugly', 'unattractive', 'plain'],
  },
  'comfortable': {
    primary: '快適な、心地よい',
    partOfSpeech: '形容詞',
    synonyms: ['cozy', 'relaxed', 'pleasant'],
    antonyms: ['uncomfortable', 'uneasy', 'awkward'],
  },
}

// Generate meaning for unknown words
function generateMeaning(_word: string): WordMeaning {
  return {
    primary: 'この単語の意味情報は準備中です',
    partOfSpeech: '不明',
    synonyms: [],
    antonyms: [],
  }
}

// Example sentences database
const examplesDB: Record<string, Record<LearnerLevel, ExampleSentence[]>> = {
  'available': {
    beginner: [
      {
        english: 'Is this seat available?',
        japanese: 'この席は空いていますか？',
        grammar: '"Is ~ available?"で「〜は空いていますか」と尋ねる基本パターン',
        scene: 'カフェやレストランで席を探すとき',
      },
      {
        english: 'The book is available at the library.',
        japanese: 'その本は図書館で借りられます。',
        grammar: '"be available at ~"で「〜で入手可能」',
        scene: '本や商品がどこで手に入るか説明するとき',
      },
      {
        english: 'I am available tomorrow.',
        japanese: '明日は空いています。',
        grammar: '人が主語の場合「都合がつく」の意味',
        scene: '予定を聞かれたとき',
      },
    ],
    intermediate: [
      {
        english: "I'm available for a meeting tomorrow afternoon.",
        japanese: '明日の午後なら会議に参加できます。',
        grammar: '"available for ~"で「〜に参加できる、〜の都合がつく」',
        scene: 'ビジネスでスケジュール調整をするとき',
      },
      {
        english: 'This product is only available online.',
        japanese: 'この製品はオンラインでのみ購入可能です。',
        grammar: '"only available ~"で限定的な入手方法を示す',
        scene: '商品の販売方法を説明するとき',
      },
      {
        english: 'She made herself available for questions.',
        japanese: '彼女は質問に答える時間を設けました。',
        grammar: '"make oneself available"で「時間を作る、対応可能にする」',
        scene: 'プレゼン後のQ&Aセッション',
      },
    ],
    advanced: [
      {
        english: 'The data will be made available to researchers upon request.',
        japanese: 'データは要請に応じて研究者に公開されます。',
        grammar: '受動態 + "upon request"で正式な表現',
        scene: '研究機関での情報公開ポリシー',
      },
      {
        english: 'We need to leverage all available resources.',
        japanese: '利用可能なすべてのリソースを活用する必要があります。',
        grammar: '"available"を名詞の前に置く形容詞的用法',
        scene: 'ビジネス戦略会議での議論',
      },
      {
        english: 'The position is available to qualified candidates only.',
        japanese: 'このポジションは資格を持つ候補者のみに開かれています。',
        grammar: '"available to ~"で「〜に対して開かれている」',
        scene: '求人情報の条件説明',
      },
    ],
  },
}

// Generate examples for unknown words
function generateExamples(word: string, _level: LearnerLevel): ExampleSentence[] {
  return [
    {
      english: `This is an example sentence with "${word}".`,
      japanese: `これは"${word}"を使った例文です。`,
      grammar: 'この単語の例文は準備中です。',
      scene: '一般的な会話',
    },
  ]
}

// Learning advice database
const adviceDB: Record<string, LearningAdvice> = {
  'available': {
    memorization: '"a-vail-able"と分解して覚える。"avail"（役に立つ）+ "-able"（可能）で「利用可能」と覚えると忘れにくい。',
    commonMistakes: '「アベイラブル」ではなく「アヴェイラブル」と発音。また、"available"の後に"for"か"to"か迷うが、行動には"for"、人には"to"を使う。',
    relatedExpressions: ['availability（名詞：利用可能性）', 'unavailable（形容詞：利用不可）', 'readily available（すぐに入手可能）'],
  },
  'comfortable': {
    memorization: '"comfort"（快適）+ "-able"（〜できる）で「快適にできる→快適な」。名詞形"comfort"と合わせて覚える。',
    commonMistakes: '発音注意！「コンフォータブル」ではなく「カンフタブル」。4音節ではなく3音節。',
    relatedExpressions: ['comfort（名詞/動詞：快適/慰める）', 'uncomfortable（形容詞：不快な）', 'comfortably（副詞：快適に）'],
  },
}

// Generate advice for unknown words
function generateAdvice(_word: string): LearningAdvice {
  return {
    memorization: 'この単語の覚え方は準備中です。繰り返し声に出して練習しましょう。',
    commonMistakes: 'よくある間違いの情報は準備中です。',
    relatedExpressions: [],
  }
}

// Main analysis function
export async function analyzeWord(word: string, level: LearnerLevel): Promise<WordAnalysis> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const normalizedWord = word.toLowerCase().trim()

  const pronunciation = pronunciationDB[normalizedWord] || generatePronunciation(normalizedWord)
  const meaning = meaningDB[normalizedWord] || generateMeaning(normalizedWord)
  const examples = examplesDB[normalizedWord]?.[level] || generateExamples(normalizedWord, level)
  const advice = adviceDB[normalizedWord] || generateAdvice(normalizedWord)

  return {
    word: normalizedWord,
    level,
    pronunciation,
    meaning,
    examples,
    advice,
  }
}

// Get level label in Japanese
export function getLevelLabel(level: LearnerLevel): string {
  switch (level) {
    case 'beginner': return '初級'
    case 'intermediate': return '中級'
    case 'advanced': return '上級'
  }
}
