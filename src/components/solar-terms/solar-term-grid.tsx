import type { SolarTerm } from '@/types/solar-term'
import { SolarTermCard } from './solar-term-card'

type SolarTermGridProps = {
  items: SolarTerm[]
  expandedId?: string
  onToggleExpand: (id: string) => void
}

export function SolarTermGrid({
  items,
  expandedId,
  onToggleExpand,
}: SolarTermGridProps) {
  if (items.length === 0) {
    return (
      <section className="rounded-[1.5rem] border border-dashed border-stone-300 bg-white/70 p-10 text-center text-stone-500">
        当前筛选下没有匹配的节气，试试切换季节、月份，或重置筛选。
      </section>
    )
  }

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <SolarTermCard
          key={item.id}
          item={item}
          expanded={expandedId === item.id}
          onToggle={(id) => onToggleExpand(expandedId === id ? '' : id)}
        />
      ))}
    </section>
  )
}
