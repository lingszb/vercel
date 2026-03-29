import { monthOptions, seasonOptions } from '@/data/solar-terms'
import type { SolarTermFilters } from '@/types/solar-term'

type FilterBarProps = {
  filters: SolarTermFilters
  onSeasonChange: (value?: SolarTermFilters['season']) => void
  onMonthChange: (value?: number) => void
  onReset: () => void
}

export function FilterBar({
  filters,
  onSeasonChange,
  onMonthChange,
  onReset,
}: FilterBarProps) {
  return (
    <section className="rounded-[1.5rem] border border-stone-200 bg-white/80 p-5 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-5">
        <div>
          <p className="mb-3 text-sm font-medium text-stone-500">按季节浏览</p>
          <div className="flex flex-wrap gap-2">
            {seasonOptions.map((option) => {
              const active = filters.season === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSeasonChange(active ? undefined : option.value)}
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    active
                      ? 'bg-stone-900 text-stone-50'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-stone-500">按月份浏览</p>
          <div className="flex flex-wrap gap-2">
            {monthOptions.map((month) => {
              const active = filters.month === month

              return (
                <button
                  key={month}
                  type="button"
                  onClick={() => onMonthChange(active ? undefined : month)}
                  className={`rounded-full px-3 py-2 text-sm transition ${
                    active
                      ? 'bg-amber-700 text-amber-50'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
                  }`}
                >
                  {month}月
                </button>
              )}
            )}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={onReset}
            className="text-sm text-stone-500 underline underline-offset-4 hover:text-stone-700"
          >
            重置筛选
          </button>
        </div>
      </div>
    </section>
  )
}
