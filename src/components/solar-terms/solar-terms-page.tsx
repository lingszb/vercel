'use client'

import { usePathname, useRouter } from 'next/navigation'
import { solarTerms } from '@/data/solar-terms'
import { toSearchParams } from '@/lib/solar-terms/query'
import type { SolarTermFilters } from '@/types/solar-term'
import { SolarTermsExplorer } from './solar-terms-explorer'

type SolarTermsPageProps = {
  initialFilters: SolarTermFilters
}

export function SolarTermsPage({ initialFilters }: SolarTermsPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const initialFiltersKey = toSearchParams(initialFilters).toString() || 'all'

  return (
    <SolarTermsExplorer
      key={initialFiltersKey}
      items={solarTerms}
      initialFilters={initialFilters}
      onFiltersChange={(filters) => {
        const params = toSearchParams(filters)
        const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
        router.replace(nextUrl, { scroll: false })
      }}
    />
  )
}
