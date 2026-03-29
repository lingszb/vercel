import { getSolarTermAnchorId } from '@/lib/solar-terms/anchors'
import type { SolarTerm } from '@/types/solar-term'

type SolarTermCardProps = {
  item: SolarTerm
  expanded: boolean
  onToggle: (id: string) => void
}

export function SolarTermCard({ item, expanded, onToggle }: SolarTermCardProps) {
  return (
    <article
      id={getSolarTermAnchorId(item.id)}
      className="rounded-[1.75rem] border border-stone-200 bg-white/90 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400">{item.pinyin}</p>
          <h2 className="mt-2 text-2xl font-semibold text-stone-900">{item.name}</h2>
          <p className="mt-2 text-sm text-stone-500">
            {item.approximateDate} · {item.month}月
          </p>
        </div>
        <button
          type="button"
          onClick={() => onToggle(item.id)}
          aria-expanded={expanded}
          aria-controls={`${item.id}-panel`}
          className="rounded-full bg-stone-900 px-4 py-2 text-sm text-stone-50"
        >
          {expanded ? `收起${item.name}详情` : `展开${item.name}详情`}
        </button>
      </div>

      <p className="mt-4 text-sm leading-7 text-stone-700">{item.summary}</p>

      {expanded ? (
        <div
          id={`${item.id}-panel`}
          className="mt-6 space-y-4 border-t border-stone-200 pt-5 text-sm leading-7 text-stone-700"
        >
          <section>
            <h3 className="text-base font-semibold text-stone-900">习俗</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {item.customs.map((custom) => (
                <li key={custom}>{custom}</li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-base font-semibold text-stone-900">三候</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {item.pentads.map((pentad) => (
                <li key={pentad}>{pentad}</li>
              ))}
            </ul>
          </section>

          {item.poem ? (
            <section>
              <h3 className="text-base font-semibold text-stone-900">诗句</h3>
              <blockquote className="mt-2 rounded-2xl bg-stone-50 p-4 text-stone-700">
                <p>{item.poem.content}</p>
                <footer className="mt-2 text-xs text-stone-500">
                  {item.poem.author}《{item.poem.title}》
                </footer>
              </blockquote>
            </section>
          ) : null}

          <section>
            <h3 className="text-base font-semibold text-stone-900">养生 / 农事</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {item.healthOrFarming.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}
    </article>
  )
}
