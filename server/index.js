import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Initialize Anthropic client
const anthropic = new Anthropic()

// AI Word Analysis Endpoint
app.post('/api/analyze', async (req, res) => {
  const { word, level } = req.body

  if (!word) {
    return res.status(400).json({ error: 'Word is required' })
  }

  const levelText = {
    beginner: '初級（TOEIC 400点程度、基本的な文法のみ使用）',
    intermediate: '中級（TOEIC 600点程度、やや複雑な文法も使用）',
    advanced: '上級（TOEIC 800点以上、ビジネス・学術的な表現も使用）'
  }[level] || '中級'

  const prompt = `あなたは英語教育の専門家です。以下の英単語について、日本人学習者向けの詳細な学習情報を提供してください。

単語: "${word}"
学習者レベル: ${levelText}

以下のJSON形式で正確に出力してください（他の文章は一切含めないでください）:

{
  "pronunciation": {
    "ipa": "IPA表記（例: /əˈveɪ.lə.bəl/）",
    "katakana": "カタカナ発音（日本人が発音しやすい表記）",
    "tips": "発音のポイント（日本人が間違えやすい点を具体的に）",
    "syllables": "音節区切りとアクセント（例: a-VAI-la-ble、大文字がアクセント）",
    "accentPosition": 2
  },
  "meaning": {
    "primary": "主な意味（複数ある場合はカンマ区切り）",
    "partOfSpeech": "品詞",
    "synonyms": ["類義語1", "類義語2", "類義語3"],
    "antonyms": ["対義語1", "対義語2"]
  },
  "examples": [
    {
      "english": "実用的な英語例文1",
      "japanese": "自然な日本語訳1",
      "grammar": "この例文のポイント・文法解説",
      "scene": "使用シーン（どんな場面で使うか）"
    },
    {
      "english": "実用的な英語例文2",
      "japanese": "自然な日本語訳2",
      "grammar": "この例文のポイント・文法解説",
      "scene": "使用シーン"
    },
    {
      "english": "実用的な英語例文3",
      "japanese": "自然な日本語訳3",
      "grammar": "この例文のポイント・文法解説",
      "scene": "使用シーン"
    }
  ],
  "advice": {
    "memorization": "この単語を効果的に覚えるコツ（語源、連想法など）",
    "commonMistakes": "日本人がよくする間違い（発音、用法など）",
    "relatedExpressions": ["関連表現1", "関連表現2", "関連表現3"]
  }
}

重要:
- 例文は実際の会話やビジネスで使える実用的なものにしてください
- 学習者レベルに合わせた難易度にしてください
- 日本語は自然な表現にしてください
- JSONのみを出力し、他の説明は含めないでください`

  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })

    // Extract text content
    const textContent = message.content.find(c => c.type === 'text')
    if (!textContent || textContent.type !== 'text') {
      throw new Error('No text content in response')
    }

    // Parse JSON from response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON found in response')
    }

    const analysis = JSON.parse(jsonMatch[0])

    res.json({
      success: true,
      data: {
        word: word.toLowerCase(),
        level,
        ...analysis
      }
    })
  } catch (error) {
    console.error('AI Analysis Error:', error)
    res.status(500).json({
      success: false,
      error: 'AI分析中にエラーが発生しました',
      details: error.message
    })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.listen(PORT, () => {
  console.log(`🚀 AI Server running on http://localhost:${PORT}`)
  console.log(`📚 API endpoint: http://localhost:${PORT}/api/analyze`)
})
