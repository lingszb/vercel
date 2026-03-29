import type { Season, SolarTermFilters } from '@/types/solar-term'

const seasons = new Set<Season>(['spring', 'summer', 'autumn', 'winter'])

function getFirstValue(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
  key: string,
) {
  if (source instanceof URLSearchParams) {
    return source.get(key) ?? undefined
  }

  const value = source[key]

  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

export function parseFiltersFromSearchParams(
  source: URLSearchParams | Record<string, string | string[] | undefined>,
): SolarTermFilters {
  const seasonValue = getFirstValue(source, 'season')
  const monthValue = getFirstValue(source, 'month')
  const result: SolarTermFilters = {}

  if (seasonValue && seasons.has(seasonValue as Season)) {
    result.season = seasonValue as Season
  }

  if (monthValue) {
    const parsedMonth = Number(monthValue)

    if (Number.isInteger(parsedMonth) && parsedMonth >= 1 && parsedMonth <= 12) {
      result.month = parsedMonth
    }
  }

  return result
}

export function toSearchParams(filters: SolarTermFilters) {
  const searchParams = new URLSearchParams()

  if (filters.season) {
    searchParams.set('season', filters.season)
  }

  if (filters.month) {
    searchParams.set('month', String(filters.month))
  }

  return searchParams
}
