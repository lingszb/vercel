import { describe, expect, it } from 'vitest'
import { parseFiltersFromSearchParams, toSearchParams } from './query'

describe('parseFiltersFromSearchParams', () => {
  it('parses valid season and month values', () => {
    const result = parseFiltersFromSearchParams(
      new URLSearchParams('season=spring&month=2'),
    )

    expect(result).toEqual({ season: 'spring', month: 2 })
  })

  it('drops invalid values', () => {
    const result = parseFiltersFromSearchParams(
      new URLSearchParams('season=storm&month=13'),
    )

    expect(result).toEqual({})
  })
})

describe('toSearchParams', () => {
  it('serializes the selected filters', () => {
    const result = toSearchParams({ season: 'winter', month: 12 })

    expect(result.toString()).toBe('season=winter&month=12')
  })

  it('keeps only season when month is cleared', () => {
    const result = toSearchParams({ season: 'autumn' })

    expect(result.toString()).toBe('season=autumn')
  })

  it('omits empty filters', () => {
    const result = toSearchParams({})

    expect(result.toString()).toBe('')
  })
})
