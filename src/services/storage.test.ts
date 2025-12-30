import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateId, getWords, addWord, updateWord, deleteWord } from './storage'

describe('storage service', () => {
  beforeEach(() => {
    vi.mocked(localStorage.getItem).mockReturnValue(null)
  })

  describe('generateId', () => {
    it('should generate unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
    })

    it('should generate string IDs', () => {
      const id = generateId()
      expect(typeof id).toBe('string')
    })
  })

  describe('getWords', () => {
    it('should return empty array when no words exist', () => {
      vi.mocked(localStorage.getItem).mockReturnValue(null)
      const words = getWords()
      expect(words).toEqual([])
    })

    it('should parse stored words', () => {
      const storedWords = [
        {
          id: '1',
          english: 'test',
          japanese: 'テスト',
          difficulty: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(storedWords))

      const words = getWords()
      expect(words).toHaveLength(1)
      expect(words[0].english).toBe('test')
      expect(words[0].createdAt).toBeInstanceOf(Date)
    })
  })

  describe('addWord', () => {
    it('should add a new word', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('[]')

      const newWord = addWord({
        english: 'hello',
        japanese: 'こんにちは',
        difficulty: 1,
      })

      expect(newWord.english).toBe('hello')
      expect(newWord.japanese).toBe('こんにちは')
      expect(newWord.id).toBeDefined()
      expect(localStorage.setItem).toHaveBeenCalled()
    })
  })

  describe('updateWord', () => {
    it('should update an existing word', () => {
      const existingWords = [
        {
          id: '1',
          english: 'old',
          japanese: '古い',
          difficulty: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(existingWords))

      const updated = updateWord('1', { english: 'new' })
      expect(updated?.english).toBe('new')
    })

    it('should return null for non-existent word', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('[]')
      const result = updateWord('999', { english: 'test' })
      expect(result).toBeNull()
    })
  })

  describe('deleteWord', () => {
    it('should delete an existing word', () => {
      const existingWords = [
        {
          id: '1',
          english: 'test',
          japanese: 'テスト',
          difficulty: 1,
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z',
        },
      ]
      vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(existingWords))

      const result = deleteWord('1')
      expect(result).toBe(true)
    })

    it('should return false for non-existent word', () => {
      vi.mocked(localStorage.getItem).mockReturnValue('[]')
      const result = deleteWord('999')
      expect(result).toBe(false)
    })
  })
})
