import type { ComponentPropsWithoutRef } from 'react'

type SolarScrollIntroProps = ComponentPropsWithoutRef<'section'>

export function SolarScrollIntro({ className = '', ...props }: SolarScrollIntroProps) {
  return (
    <section
      {...props}
      className={`${className} solar-scroll-intro shrink-0 snap-center px-4 py-6 md:px-7 md:py-7`.trim()}
    >
      <div className="solar-scroll-intro__inner flex h-full min-h-[60vh] flex-col justify-between rounded-[2rem] border border-[color:var(--line-strong)] p-5 md:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-5 md:max-w-[42rem]">
            <div className="flex items-center gap-4 text-[color:var(--muted)]">
              <p className="rounded-full border border-[color:var(--line)] px-4 py-1 text-[11px] tracking-[0.38em]">
                卷首小引
              </p>
              <p className="text-[11px] tracking-[0.45em]">TWENTY-FOUR SOLAR TERMS</p>
            </div>

            <div className="space-y-3.5">
              <p className="text-sm tracking-[0.42em] text-[color:var(--muted)]">二十四节气</p>
              <h1 className="text-4xl leading-none tracking-[0.18em] md:text-6xl">岁时纪事图卷</h1>
              <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)] md:text-base">
                点击当前画卷左右半侧可前后翻页，也可直接点入相邻节气页继续展开。卷首不作喧哗导览，只留一纸素引，邀你顺着节令起笔，慢慢把春生、夏长、秋收、冬藏读完。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 md:gap-6">
            <div className="hidden min-h-52 md:flex md:items-center">
              <div className="seal-badge flex h-32 w-32 items-center justify-center rounded-full border border-[color:rgba(140,42,30,0.42)] bg-[color:rgba(142,44,33,0.92)] text-lg tracking-[0.38em] text-stone-50 shadow-[0_18px_40px_rgba(85,32,20,0.2)]">
                风物人间
              </div>
            </div>
            <div className="hidden rounded-[999px] border border-[color:var(--line)] px-3 py-5 text-center text-xs leading-6 tracking-[0.35em] text-[color:var(--muted)] md:block">
              顺时
              <br />
              展卷
            </div>
          </div>
        </div>

        <div className="grid gap-4 border-t border-[color:var(--line)] pt-5 text-sm text-[color:var(--muted)] md:grid-cols-[1.15fr_0.85fr] md:gap-6">
          <div className="space-y-3">
            <p className="text-xs tracking-[0.38em]">阅读提示</p>
            <p className="leading-7">
              从立春起，至大寒止。请点当前画卷左右半侧翻页，或点相邻节气页切入，让每一折纸面都像翻看旧时节令图册一样，先望一眼画境，再读一段题跋。
            </p>
          </div>
          <div className="space-y-3 md:text-right">
            <p className="text-xs tracking-[0.38em]">卷轴次第</p>
            <p className="leading-8">卷首小引 → 二十四节气 → 收卷余韵</p>
          </div>
        </div>
      </div>
    </section>
  )
}
