import { getSolarTermAnchorId } from '@/lib/solar-terms/anchors'
import type { SolarTerm } from '@/types/solar-term'

type TimelineNavProps = {
  items: SolarTerm[]
  visibleIds: Set<string>
}

export function TimelineNav({ items, visibleIds }: TimelineNavProps) {
  return (
    <nav
      aria-label="节气时间轴"
      className="overflow-x-auto rounded-[1.5rem] border border-stone-200 bg-white/80 p-4 shadow-sm backdrop-blur"
    >
      <ol className="flex min-w-max gap-3">
        {items.map((item) => {
          const visible = visibleIds.has(item.id)

          return (
            <li key={item.id}>
              <a
                href={visible ? `#${getSolarTermAnchorId(item.id)}` : undefined}
                aria-disabled={!visible}
                aria-label={item.name}
                className={`block rounded-full border px-3 py-2 text-sm transition ${
                  visible
                    ? 'border-stone-300 bg-stone-50 text-stone-800 hover:border-stone-500'
                    : 'border-stone-200 bg-stone-50/40 text-stone-400'
                }`}
              >
                {String(item.order).padStart(2, '0')} {item.name}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
