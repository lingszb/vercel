import { SolarTermsPage } from '@/components/solar-terms/solar-terms-page'
import { parseFiltersFromSearchParams } from '@/lib/solar-terms/query'

type HomePageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams
  const initialFilters = parseFiltersFromSearchParams(resolvedSearchParams)

  return <SolarTermsPage initialFilters={initialFilters} />
}
