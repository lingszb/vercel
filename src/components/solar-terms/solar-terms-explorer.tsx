'use client'

import { useMemo, useState } from 'react'
import { filterSolarTerms } from '@/lib/solar-terms/filters'
import type { SolarTerm, SolarTermFilters } from '@/types/solar-term'
import { FilterBar } from './filter-bar'
import { Hero } from './hero'
import { PageFooter } from './page-footer'
import { SolarTermGrid } from './solar-term-grid'
import { TimelineNav } from './timeline-nav'

type SolarTermsExplorerProps = {
  items: SolarTerm[]
  initialFilters: SolarTermFilters
  onFiltersChange: (filters: SolarTermFilters) => void
}

export function SolarTermsExplorer({
  items,
  initialFilters,
  onFiltersChange,
}: SolarTermsExplorerProps) {
  const [filters, setFilters] = useState<SolarTermFilters>(initialFilters)
  const [expandedId, setExpandedId] = useState<string | undefined>()

  const visibleItems = useMemo(() => filterSolarTerms(items, filters), [items, filters])
  const visibleIds = useMemo(
    () => new Set(visibleItems.map((item) => item.id)),
    [visibleItems],
  )

  function updateFilters(nextFilters: SolarTermFilters) {
    setFilters(nextFilters)
    setExpandedId(undefined)
    onFiltersChange(nextFilters)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 md:px-6 lg:px-8">
      <Hero />
      <FilterBar
        filters={filters}
        onSeasonChange={(season) => updateFilters({ ...filters, season })}
        onMonthChange={(month) => updateFilters({ ...filters, month })}
        onReset={() => updateFilters({})}
      />
      <TimelineNav items={items} visibleIds={visibleIds} />
      <SolarTermGrid
        items={visibleItems}
        expandedId={expandedId}
        onToggleExpand={(id) => setExpandedId(id || undefined)}
      />
      <PageFooter />
    </div>
  )
}
