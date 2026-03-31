export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type SolarTermImageBrief = {
  narrative: string
  visualElements: string[]
  mood: string
  palette: string[]
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
  sceneLine: string
  customs: string[]
  pentads: string[]
  poem?: {
    title?: string
    author?: string
    content: string
  }
  healthOrFarming: string[]
  imageSrc?: string
  imageBrief: SolarTermImageBrief
}
