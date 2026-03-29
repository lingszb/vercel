import { describe, expect, it } from 'vitest'
import { solarTerms } from '@/data/solar-terms'
import { filterSolarTerms } from './filters'

describe('filterSolarTerms', () => {
  it('returns all 24 items without filters', () => {
    expect(filterSolarTerms(solarTerms, {})).toHaveLength(24)
  })

  it('filters by season', () => {
    const result = filterSolarTerms(solarTerms, { season: 'spring' })

    expect(result.map((item) => item.name)).toEqual([
      '立春',
      '雨水',
      '惊蛰',
      '春分',
      '清明',
      '谷雨',
    ])
  })

  it('filters by month and season together', () => {
    const result = filterSolarTerms(solarTerms, {
      season: 'winter',
      month: 12,
    })

    expect(result.map((item) => item.name)).toEqual(['大雪', '冬至'])
  })
})
