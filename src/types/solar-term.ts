export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type SolarTermFilters = {
  season?: Season
  month?: number
}

export type SolarTerm = {
  id: string
  name: string
  pinyin: string
  season: Season
  month: number
  order: number
  approximateDate: string
  summary: string
  customs: string[]
  pentads: string[]
  poem?: {
    title?: string
    author?: string
    content: string
  }
  healthOrFarming: string[]
}
