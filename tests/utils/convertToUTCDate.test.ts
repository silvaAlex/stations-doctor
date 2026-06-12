import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { convertToUTCDate } from '../../src/utils/convertToUTCDate'

describe('Utils', () => {
  describe('convertToUTCDate', () => {
    it('should correctly convert date and time to a UTC Date object', () => {
      const dataAgendamento = new Date('2023-10-15T00:00:00Z')
      const time = '14:30'

      const result = convertToUTCDate(dataAgendamento, time)

      assert.strictEqual(result.getUTCHours(), 14)
      assert.strictEqual(result.getUTCMinutes(), 30)
      assert.strictEqual(result.getUTCSeconds(), 0)
      assert.strictEqual(result.getUTCMilliseconds(), 0)
      assert.strictEqual(result.toISOString().startsWith('2023-10-15T14:30:00'), true)
    })

    it('should handle different time formats like 08:05', () => {
      const dataAgendamento = new Date('2024-01-01T00:00:00Z')
      const time = '08:05'

      const result = convertToUTCDate(dataAgendamento, time)

      assert.strictEqual(result.getUTCHours(), 8)
      assert.strictEqual(result.getUTCMinutes(), 5)
      assert.strictEqual(result.toISOString().startsWith('2024-01-01T08:05:00'), true)
    })
  })
})
