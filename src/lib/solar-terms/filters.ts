import type { SolarTerm, SolarTermFilters } from '@/types/solar-term'

export function filterSolarTerms(items: SolarTerm[], filters: SolarTermFilters) {
  return items.filter((item) => {
    const matchesSeason = !filters.season || item.season === filters.season
    const matchesMonth = !filters.month || item.month === filters.month

    return matchesSeason && matchesMonth
  })
}
