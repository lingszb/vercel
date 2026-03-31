import { solarTerms } from '@/data/solar-terms'
import { SolarScrollIntro } from './solar-scroll-intro'
import { SolarScrollOutro } from './solar-scroll-outro'
import { SolarScrollTrack } from './solar-scroll-track'
import { SolarTermPanel } from './solar-term-panel'

export function SolarScrollPage() {
  const items = [...solarTerms].sort((left, right) => left.order - right.order)

  return (
    <main className="solar-scroll-page min-h-screen py-6 md:py-8">
      <SolarScrollTrack>
        <SolarScrollIntro />
        {items.map((item) => (
          <SolarTermPanel key={item.id} item={item} />
        ))}
        <SolarScrollOutro />
      </SolarScrollTrack>
    </main>
  )
}
