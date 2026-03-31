import type { ComponentPropsWithoutRef } from 'react'
import Image from 'next/image'
import { getSolarTermAnchorId } from '@/lib/solar-terms/anchors'
import type { SolarTerm } from '@/types/solar-term'

type SolarTermPanelProps = ComponentPropsWithoutRef<'article'> & {
  item: SolarTerm
}

export function SolarTermPanel({ item, className = '', ...props }: SolarTermPanelProps) {
  return (
    <article
      {...props}
      id={getSolarTermAnchorId(item.id)}
      className={`${className} solar-term-panel shrink-0 snap-center px-2 py-5 md:min-h-[72vh] md:w-[82vw] md:max-w-[1180px] md:px-3 md:py-6`.trim()}
    >
      <div className="solar-term-panel__sheet grid h-full gap-6 rounded-[2.2rem] border border-[color:var(--line-strong)] p-4 md:grid-cols-[minmax(0,1.18fr)_minmax(280px,0.78fr)] md:gap-8 md:p-7">
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4 text-[color:var(--muted)]">
            <p className="text-[11px] tracking-[0.38em]">岁时画境</p>
            <p className="text-[11px] tracking-[0.35em]">{String(item.order).padStart(2, '0')}</p>
          </div>

          <div className="solar-term-panel__painting rounded-[1.9rem] border border-[color:var(--line)] p-4 md:p-6">
            <div className="flex h-full min-h-[21rem] flex-col justify-between gap-6 md:min-h-[32rem]">
              <div className="space-y-3">
                <div className="space-y-2.5">
                  <p className="text-sm tracking-[0.2em] text-[color:var(--muted)]">{item.month}月画境</p>
                  <p className="text-xl leading-relaxed tracking-[0.1em] md:text-[2rem]">
                    {item.sceneLine}
                  </p>
                </div>

                {item.imageSrc ? (
                  <div className="solar-term-panel__image-wrap relative overflow-hidden rounded-[1.75rem] border border-[color:rgba(113,84,56,0.14)] bg-[color:rgba(255,248,238,0.4)]">
                    <Image
                      src={item.imageSrc}
                      alt={`${item.name}节气插画`}
                      width={1600}
                      height={900}
                      className="solar-term-panel__image h-auto w-full object-cover"
                      priority={item.order <= 2}
                    />
                  </div>
                ) : null}

                <section className="rounded-[1.35rem] border border-[color:rgba(124,96,66,0.18)] bg-[color:rgba(255,248,238,0.62)] p-4 md:p-[1.1rem]">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-[color:var(--muted)]">
                    <p className="text-[11px] tracking-[0.35em]">叙事画稿</p>
                    <p className="text-[11px] tracking-[0.24em]">{item.imageBrief.mood}</p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--ink)] md:text-[15px]">
                    {item.imageBrief.narrative}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2 text-xs tracking-[0.18em] text-[color:var(--muted)]">
                    {item.imageBrief.visualElements.map((entry) => (
                      <li
                        key={entry}
                        className="rounded-full border border-[color:rgba(124,96,66,0.16)] bg-[color:rgba(255,250,244,0.72)] px-3 py-1.5"
                      >
                        {entry}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <div className="grid gap-3.5 md:grid-cols-[1fr_auto] md:items-end">
                <section className="rounded-[1.5rem] border border-[color:rgba(124,96,66,0.16)] bg-[color:rgba(255,249,241,0.56)] p-4">
                  <p className="text-[11px] tracking-[0.35em] text-[color:var(--muted)]">物候边注</p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--ink)]">
                    {item.pentads.map((pentad) => (
                      <li key={pentad}>{pentad}</li>
                    ))}
                  </ul>
                </section>

                <div className="flex flex-col items-start gap-3">
                  <div className="seal-badge self-start rounded-[999px] border border-[color:rgba(137,47,34,0.3)] bg-[color:rgba(142,44,33,0.9)] px-4 py-3 text-xs tracking-[0.34em] text-stone-50 shadow-[0_12px_30px_rgba(85,32,20,0.18)]">
                    {item.name}
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] tracking-[0.16em] text-[color:var(--muted)] md:max-w-[11rem] md:justify-end">
                    {item.imageBrief.palette.map((color) => (
                      <span
                        key={color}
                        className="rounded-full border border-[color:rgba(124,96,66,0.16)] bg-[color:rgba(255,249,241,0.7)] px-3 py-1"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <header className="flex flex-col justify-between gap-5 border-t border-[color:var(--line)] pt-5 md:border-t-0 md:border-l md:pt-0 md:pl-6">
          <div className="space-y-4 md:text-right">
            <div className="space-y-2.5">
              <p className="text-[11px] tracking-[0.34em] text-[color:var(--muted)]">节令题跋</p>
              <h2 className="text-3xl tracking-[0.18em] md:text-5xl">{item.name}</h2>
              <p className="text-sm uppercase tracking-[0.32em] text-[color:var(--muted)]">{item.pinyin}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm leading-7 text-[color:var(--muted)]">{item.approximateDate} · {item.month}月</p>
              <p className="text-base leading-7 text-[color:var(--ink)] md:text-[1.05rem]">{item.summary}</p>
            </div>
          </div>

          {item.poem ? (
            <blockquote className="border-l-2 border-[color:var(--line-strong)] pl-4 text-sm leading-8 text-[color:var(--muted)] md:border-l-0 md:border-r-2 md:pr-4 md:pl-0 md:text-right">
              <p>{item.poem.content}</p>
              <footer className="mt-2 text-xs tracking-[0.24em] text-[color:var(--muted)]/90">
                {item.poem.author}《{item.poem.title}》
              </footer>
            </blockquote>
          ) : null}

          <div className="grid gap-4">
            <section className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:rgba(255,250,244,0.62)] p-4 md:text-right">
              <p className="text-[11px] tracking-[0.35em] text-[color:var(--muted)]">习俗</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--ink)]">
                {item.customs.map((custom) => (
                  <li key={custom}>{custom}</li>
                ))}
              </ul>
            </section>

            <section className="rounded-[1.4rem] border border-dashed border-[color:var(--line-strong)] bg-[color:rgba(244,235,221,0.72)] p-4 md:text-right">
              <p className="text-[11px] tracking-[0.35em] text-[color:var(--muted)]">农事</p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--ink)]">
                {item.healthOrFarming.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </section>
          </div>
        </header>
      </div>
    </article>
  )
}
