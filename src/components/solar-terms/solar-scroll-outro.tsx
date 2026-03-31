import type { ComponentPropsWithoutRef } from 'react'

type SolarScrollOutroProps = ComponentPropsWithoutRef<'section'>

export function SolarScrollOutro({ className = '', ...props }: SolarScrollOutroProps) {
  return (
    <section
      {...props}
      className={`${className} solar-scroll-outro shrink-0 snap-center px-4 py-6 md:px-7 md:py-7`.trim()}
    >
      <div className="flex min-h-[60vh] flex-col justify-between rounded-[2rem] border border-[color:var(--line-strong)] p-5 md:p-7">
        <div className="flex flex-1 flex-col justify-between gap-7 md:flex-row md:items-center">
          <div className="space-y-5">
            <p className="inline-flex rounded-full border border-[color:var(--line)] px-4 py-1 text-[11px] tracking-[0.42em] text-[color:var(--muted)]">
              收卷余韵
            </p>
            <p className="max-w-md text-2xl leading-relaxed tracking-[0.12em] md:text-4xl">
              长卷至此，周而复始。
            </p>
            <p className="max-w-lg text-sm leading-8 text-[color:var(--muted)] md:text-base">
              四时更迭，草木有信，人与天地的往来，仍在下一个节令里继续铺展。卷尾不写终章，只留木轴、余墨与空白，让下一轮节序自己接上来。
            </p>
          </div>

          <div className="flex items-end gap-4 self-end md:self-auto">
            <div className="hidden rounded-[999px] border border-[color:var(--line)] px-3 py-5 text-center text-xs leading-6 tracking-[0.35em] text-[color:var(--muted)] md:block">
              合卷
              <br />
              回春
            </div>
            <div
              aria-hidden="true"
              className="h-44 w-5 rounded-full bg-[linear-gradient(180deg,#d4b182_0%,#8d6742_48%,#5c4029_100%)] shadow-[0_0_0_1px_rgba(93,65,39,0.2),0_10px_30px_rgba(86,58,31,0.18)] md:h-60"
            />
          </div>
        </div>

        <div className="grid gap-4 border-t border-[color:var(--line)] pt-5 text-sm text-[color:var(--muted)] md:grid-cols-[0.95fr_1.05fr] md:gap-6">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.38em]">卷尾题识</p>
            <p className="leading-8">收卷处保留大片留白，让读者在离开页面时仍记得纸色、朱印与节令余音。</p>
          </div>
          <div className="space-y-3 md:text-right">
            <p className="text-xs tracking-[0.38em]">四时未止</p>
            <p className="leading-8">草木有信，风土有声，来岁仍从立春再起一卷。</p>
          </div>
        </div>
      </div>
    </section>
  )
}
