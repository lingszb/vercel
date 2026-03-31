# Solar Terms Illustration Preview Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an independent `/illustration-preview` page that presents the solar-term illustration production rules and three executable sample cards for 立春、清明、大雪 without changing the existing homepage scroll experience.

**Architecture:** Keep the current homepage route and long-scroll composition untouched. Extend the `SolarTerm` data model with an optional `imageSpec` field, populate it only for the three preview samples, and render a dedicated preview page component that reads those typed specs and explains the final insertion target `solar-term-panel__painting`.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, Vitest, Testing Library

---

## File Map

- Create: `src/data/solar-terms.test.ts` — verifies only the three preview samples expose `imageSpec`, and that the shared production contract matches the spec.
- Create: `src/components/solar-terms/illustration-preview-page.tsx` — renders the independent preview UI, global rules, insertion notes, and three sample cards.
- Create: `src/components/solar-terms/illustration-preview-page.test.tsx` — verifies the preview component content and the three sample cards.
- Create: `src/app/illustration-preview/page.tsx` — App Router entry for `/illustration-preview`.
- Create: `src/app/illustration-preview/page.test.tsx` — route-level smoke test.
- Modify: `src/types/solar-term.ts` — adds `SolarTermImageSpec` and wires `imageSpec?: SolarTermImageSpec` into `SolarTerm`.
- Modify: `src/data/solar-terms.ts` — adds `imageSpec` only to `lichun`, `qingming`, and `daxue`.
- Leave unchanged: `src/app/page.tsx`, `src/components/solar-terms/solar-scroll-page.tsx` — homepage remains the existing scroll page.

## Implementation Notes

- Treat `docs/superpowers/specs/2026-03-30-solar-terms-illustration-design.md` as the source of truth for copy and constraints.
- Do not wire real image assets yet. This plan only adds typed production specs and a preview page that explains them.
- Keep styling local to the new preview component with Tailwind classes. No global CSS changes are required for this scope.

---

### Task 1: Add the typed `imageSpec` contract and sample data

**Files:**
- Create: `src/data/solar-terms.test.ts`
- Modify: `src/types/solar-term.ts`
- Modify: `src/data/solar-terms.ts`

- [ ] **Step 1: Write the failing data contract test**

Create `src/data/solar-terms.test.ts` with this content:

```ts
import { solarTerms } from './solar-terms'

const previewIds = ['lichun', 'qingming', 'daxue'] as const

describe('solar term illustration specs', () => {
  it('provides imageSpec only for the three preview samples', () => {
    const previewItems = solarTerms.filter((item) =>
      previewIds.includes(item.id as (typeof previewIds)[number]),
    )
    const nonPreviewItems = solarTerms.filter(
      (item) => !previewIds.includes(item.id as (typeof previewIds)[number]),
    )

    previewItems.forEach((item) => {
      const imageSpec = (item as {
        imageSpec?: {
          aspectRatio?: string
          recommendedSize?: { width?: number; height?: number }
          insertionTarget?: { component?: string; slot?: string }
        }
      }).imageSpec

      expect(imageSpec?.aspectRatio).toBe('4:5')
      expect(imageSpec?.recommendedSize).toEqual({ width: 1536, height: 1920 })
      expect(imageSpec?.insertionTarget).toEqual({
        component: 'SolarTermPanel',
        slot: 'solar-term-panel__painting',
      })
    })

    nonPreviewItems.forEach((item) => {
      expect((item as { imageSpec?: unknown }).imageSpec).toBeUndefined()
    })
  })
})
```

- [ ] **Step 2: Run the data contract test to verify it fails**

Run:

```bash
npm run test -- src/data/solar-terms.test.ts
```

Expected: FAIL because `imageSpec` is currently `undefined` for `lichun`, `qingming`, and `daxue`.

- [ ] **Step 3: Add the `SolarTermImageSpec` types**

Replace `src/types/solar-term.ts` with this content:

```ts
export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type SolarTermImageBrief = {
  narrative: string
  visualElements: string[]
  mood: string
  palette: string[]
}

export type SolarTermImageSpec = {
  aspectRatio: '4:5'
  recommendedSize: {
    width: 1536
    height: 1920
  }
  safeArea: {
    top: '10%-12%'
    bottom: '12%-15%'
    leftRight: string
    subjectPlacement: string
  }
  composition: {
    subjectFocus: string
    foreground: string
    midground: string
    background: string
  }
  productionNotes: string[]
  negativeConstraints: string[]
  insertionTarget: {
    component: 'SolarTermPanel'
    slot: 'solar-term-panel__painting'
  }
  pagePlacementIntent: string
  filenameExample: string
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
  imageBrief: SolarTermImageBrief
  imageSpec?: SolarTermImageSpec
}
```

- [ ] **Step 4: Add shared preview metadata and the three sample `imageSpec` blocks**

In `src/data/solar-terms.ts`, add this constant immediately after the import:

```ts
const sharedPreviewImageSpec = {
  aspectRatio: '4:5' as const,
  recommendedSize: {
    width: 1536 as const,
    height: 1920 as const,
  },
  insertionTarget: {
    component: 'SolarTermPanel' as const,
    slot: 'solar-term-panel__painting' as const,
  },
}
```

Then add this `imageSpec` block to the `lichun` item, immediately after its existing `imageBrief`:

```ts
    imageSpec: {
      ...sharedPreviewImageSpec,
      safeArea: {
        top: '10%-12%',
        bottom: '12%-15%',
        leftRight: '左右边缘仅保留辅助枝叶、空气和风感，不放主芽点与人物面部。',
        subjectPlacement: '主体视觉中心位于画面中段略偏上。',
      },
      composition: {
        subjectFocus: '以刚萌芽的树枝或主树作为视觉中心，强调寒意未退、春意初动。',
        foreground: '枝条、湿土、零星草芽、薄薄残雪边缘。',
        midground: '主树、田埂、小路、可选的小体量人物或归燕。',
        background: '淡远山、浅灰天空、稀薄晨雾、未完全苏醒的村落轮廓。',
      },
      productionNotes: [
        '光线保持早晨或薄云散光，避免正午高亮。',
        '嫩绿只作为局部信号色，不铺满整张图。',
        '若出现人物，服饰保持低饱和中性色。',
      ],
      negativeConstraints: [
        '禁止大面积盛开桃花、樱花、油菜花海。',
        '禁止人物过大、过精致、过时装化。',
        '禁止把画面做成初夏旅游宣传照。',
      ],
      pagePlacementIntent: '嵌入画境区后应先让读者感知早春开篇感，而不是被繁花吸引。',
      filenameExample: 'solar-term-lichun-illustration-final-v1.png',
    },
```

Add this `imageSpec` block to the `qingming` item, immediately after its existing `imageBrief`:

```ts
    imageSpec: {
      ...sharedPreviewImageSpec,
      safeArea: {
        top: '10%-12%',
        bottom: '12%-15%',
        leftRight: '左右边缘仅保留雨幕、雾气和次要枝条，不放主伞、人物头部和桥拱核心。',
        subjectPlacement: '主体人物或主路径位于画面中段偏下到中段位置。',
      },
      composition: {
        subjectFocus: '用行路人物、柳线和水岸关系建立烟雨清明的情绪中心。',
        foreground: '低垂柳枝、细雨、水边草叶、湿石、伞沿局部。',
        midground: '主行人、小径、石桥、水岸、坡地或村口。',
        background: '雾中屋舍、浅山、朦胧天色、远树。',
      },
      productionNotes: [
        '雨表现为可感知的湿，不做暴雨特效。',
        '柳色保持灰绿、嫩绿，不做高饱和晴景。',
        '画面必须同时成立“雨”和“清”，湿而不脏、雾而不糊。',
      ],
      negativeConstraints: [
        '禁止暴雨、雷电、乌云压城式戏剧天气。',
        '禁止红伞、艳服、鲜花堆叠造成节日海报感。',
        '禁止建筑主导全画面，挤压清明的空气与湿度表达。',
      ],
      pagePlacementIntent: '嵌入画境区后应先读到烟雨中的清明，再读到具体人物与建筑。',
      filenameExample: 'solar-term-qingming-illustration-final-v1.png',
    },
```

Add this `imageSpec` block to the `daxue` item, immediately after its existing `imageBrief`:

```ts
    imageSpec: {
      ...sharedPreviewImageSpec,
      safeArea: {
        top: '10%-12%',
        bottom: '12%-15%',
        leftRight: '左右边缘只放雪枝延展、雾气和围墙边角，不放主屋檐、主树干和人物头部。',
        subjectPlacement: '主主体位于画面中部略偏下，强调雪压下来的稳定感。',
      },
      composition: {
        subjectFocus: '以被厚雪压覆的树、屋檐或院落为主体，强调深冬覆盖感。',
        foreground: '雪枝、积雪石块、矮墙、雪堆边缘、地表积雪起伏。',
        midground: '主树、屋舍、村道、可选的小体量行人。',
        background: '冷灰天空、远山、雪雾、被雪软化的林线。',
      },
      productionNotes: [
        '至少保留高光雪面、冷灰阴影、深色承重物体三种明度层次。',
        '允许少量木色、土色、暖窗纸色作为克制平衡点。',
        '优先测试雪枝、屋檐、小径组合，确保缩小后仍可识别。',
      ],
      negativeConstraints: [
        '禁止高白度无层次白片。',
        '禁止蓝色滤镜过重导致雪景失真。',
        '禁止暴风雪、灾难片、极寒求生式戏剧叙事。',
      ],
      pagePlacementIntent: '嵌入画境区后应先感知厚雪压境，再读到屋舍、树木或人物。',
      filenameExample: 'solar-term-daxue-illustration-final-v1.png',
    },
```

- [ ] **Step 5: Run the data contract test again**

Run:

```bash
npm run test -- src/data/solar-terms.test.ts
```

Expected: PASS.

- [ ] **Step 6: Commit the typed data contract**

Run:

```bash
git add src/types/solar-term.ts src/data/solar-terms.ts src/data/solar-terms.test.ts
git commit -m "feat: add illustration spec metadata"
```

---

### Task 2: Build the preview component for the three sample cards

**Files:**
- Create: `src/components/solar-terms/illustration-preview-page.test.tsx`
- Create: `src/components/solar-terms/illustration-preview-page.tsx`

- [ ] **Step 1: Write the failing preview component test**

Create `src/components/solar-terms/illustration-preview-page.test.tsx` with this content:

```tsx
import { render, screen, within } from '@testing-library/react'
import { IllustrationPreviewPage } from './illustration-preview-page'

describe('IllustrationPreviewPage', () => {
  it('renders the global illustration rules and the three sample cards', () => {
    render(<IllustrationPreviewPage />)

    expect(screen.getByRole('heading', { name: '节气插画规格预览' })).toBeInTheDocument()
    expect(screen.getByText('4:5')).toBeInTheDocument()
    expect(screen.getByText('1536 × 1920')).toBeInTheDocument()
    expect(screen.getByText('solar-term-panel__painting')).toBeInTheDocument()
    expect(screen.getByText('imageBrief / imageSpec')).toBeInTheDocument()

    const sampleCards = screen.getAllByRole('article')
    expect(sampleCards).toHaveLength(3)

    const lichunCard = within(screen.getByRole('article', { name: '立春插画样本卡' }))
    expect(lichunCard.getByText('晨光落在仍带薄冰的溪岸，东风推开寒意，草芽初醒，田畴边的人家正备下迎春小席，整幅画面有万物将启的舒展感。')).toBeInTheDocument()
    expect(lichunCard.getByText('solar-term-lichun-illustration-final-v1.png')).toBeInTheDocument()

    const qingmingCard = within(screen.getByRole('article', { name: '清明插画样本卡' }))
    expect(qingmingCard.getByText('嵌入画境区后应先读到烟雨中的清明，再读到具体人物与建筑。')).toBeInTheDocument()

    const daxueCard = within(screen.getByRole('article', { name: '大雪插画样本卡' }))
    expect(daxueCard.getByText('禁止高白度无层次白片。')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the preview component test to verify it fails**

Run:

```bash
npm run test -- src/components/solar-terms/illustration-preview-page.test.tsx
```

Expected: FAIL with a module resolution error because `./illustration-preview-page` does not exist yet.

- [ ] **Step 3: Implement the preview component**

Create `src/components/solar-terms/illustration-preview-page.tsx` with this content:

```tsx
import { solarTerms } from '@/data/solar-terms'
import type { SolarTerm, SolarTermImageSpec } from '@/types/solar-term'

const previewIds = ['lichun', 'qingming', 'daxue'] as const

type PreviewSolarTerm = SolarTerm & { imageSpec: SolarTermImageSpec }

function hasImageSpec(item: SolarTerm | undefined): item is PreviewSolarTerm {
  return Boolean(item?.imageSpec)
}

export function IllustrationPreviewPage() {
  const previewItems = previewIds
    .map((id) => solarTerms.find((item) => item.id === id))
    .filter(hasImageSpec)

  const globalSpec = previewItems[0]!.imageSpec

  return (
    <main className="min-h-screen bg-[color:var(--paper)] px-4 py-8 text-[color:var(--ink)] md:px-8 md:py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="rounded-[2rem] border border-[color:var(--line-strong)] bg-[color:rgba(255,250,244,0.88)] p-6 shadow-[0_24px_70px_rgba(60,39,19,0.08)] md:p-8">
          <p className="text-xs tracking-[0.35em] text-[color:var(--muted)]">SOLAR TERMS ILLUSTRATION</p>
          <h1 className="mt-3 text-3xl tracking-[0.18em] md:text-5xl">节气插画规格预览</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-[color:var(--muted)] md:text-base">
            本页用于集中展示二十四节气插画生成阶段的统一规格、Safe Area 规则、最终插入位置说明，以及立春、清明、大雪三张代表样本的执行卡。
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:rgba(255,249,241,0.82)] p-5">
            <p className="text-[11px] tracking-[0.3em] text-[color:var(--muted)]">主规格</p>
            <p className="mt-3 text-2xl tracking-[0.16em]">{globalSpec.aspectRatio}</p>
            <p className="mt-2 text-sm text-[color:var(--muted)]">推荐尺寸</p>
            <p className="mt-1 text-lg">1536 × 1920</p>
          </div>

          <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:rgba(255,249,241,0.82)] p-5">
            <p className="text-[11px] tracking-[0.3em] text-[color:var(--muted)]">最终插入位置</p>
            <p className="mt-3 text-lg">SolarTermPanel</p>
            <p className="mt-1 text-sm text-[color:var(--muted)]">{globalSpec.insertionTarget.slot}</p>
          </div>

          <div className="rounded-[1.6rem] border border-[color:var(--line)] bg-[color:rgba(255,249,241,0.82)] p-5">
            <p className="text-[11px] tracking-[0.3em] text-[color:var(--muted)]">数据分层</p>
            <p className="mt-3 text-lg">imageBrief / imageSpec</p>
            <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
              `imageBrief` 负责叙事意象，`imageSpec` 负责尺寸、构图、Safe Area、禁忌项与回填约束。
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-[color:var(--line-strong)] bg-[color:rgba(255,250,244,0.86)] p-6 md:p-8">
          <h2 className="text-2xl tracking-[0.14em]">全局规则</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:rgba(244,235,221,0.5)] p-5">
              <p className="text-sm tracking-[0.22em] text-[color:var(--muted)]">Safe Area</p>
              <ul className="mt-4 space-y-2 text-sm leading-7">
                <li>顶部留白：{globalSpec.safeArea.top}</li>
                <li>底部留白：{globalSpec.safeArea.bottom}</li>
                <li>左右原则：{globalSpec.safeArea.leftRight}</li>
                <li>主体位置：{globalSpec.safeArea.subjectPlacement}</li>
              </ul>
            </div>

            <div className="rounded-[1.4rem] border border-[color:var(--line)] bg-[color:rgba(244,235,221,0.5)] p-5">
              <p className="text-sm tracking-[0.22em] text-[color:var(--muted)]">页面落位说明</p>
              <ul className="mt-4 space-y-2 text-sm leading-7">
                <li>预览页不替代首页，仅服务插画生成与接入说明。</li>
                <li>未来插画继续回填到 `solar-term-panel__painting`。</li>
                <li>允许轻裁边缘环境，但不能裁掉主体与主季候信号。</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-5">
          <h2 className="text-2xl tracking-[0.14em]">代表节气样本卡</h2>

          <div className="grid gap-6 lg:grid-cols-3">
            {previewItems.map((item) => (
              <article
                key={item.id}
                aria-label={`${item.name}插画样本卡`}
                className="rounded-[2rem] border border-[color:var(--line-strong)] bg-[color:rgba(255,250,244,0.92)] p-6 shadow-[0_20px_52px_rgba(60,39,19,0.07)]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] tracking-[0.28em] text-[color:var(--muted)]">{item.pinyin.toUpperCase()}</p>
                    <h3 className="mt-2 text-2xl tracking-[0.16em]">{item.name}</h3>
                  </div>
                  <span className="rounded-full border border-[color:var(--line)] px-3 py-1 text-xs tracking-[0.18em] text-[color:var(--muted)]">
                    {item.imageSpec.aspectRatio}
                  </span>
                </div>

                <section className="mt-6 space-y-3">
                  <p className="text-[11px] tracking-[0.28em] text-[color:var(--muted)]">IMAGE BRIEF</p>
                  <p className="text-sm leading-7">{item.imageBrief.narrative}</p>
                </section>

                <section className="mt-6 space-y-3">
                  <p className="text-[11px] tracking-[0.28em] text-[color:var(--muted)]">构图说明</p>
                  <ul className="space-y-2 text-sm leading-7">
                    <li>主体：{item.imageSpec.composition.subjectFocus}</li>
                    <li>前景：{item.imageSpec.composition.foreground}</li>
                    <li>中景：{item.imageSpec.composition.midground}</li>
                    <li>背景：{item.imageSpec.composition.background}</li>
                  </ul>
                </section>

                <section className="mt-6 space-y-3">
                  <p className="text-[11px] tracking-[0.28em] text-[color:var(--muted)]">Production Notes</p>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-7">
                    {item.imageSpec.productionNotes.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6 space-y-3">
                  <p className="text-[11px] tracking-[0.28em] text-[color:var(--muted)]">Negative Constraints</p>
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-7">
                    {item.imageSpec.negativeConstraints.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </section>

                <section className="mt-6 space-y-3 rounded-[1.3rem] border border-[color:var(--line)] bg-[color:rgba(244,235,221,0.45)] p-4">
                  <p className="text-[11px] tracking-[0.28em] text-[color:var(--muted)]">页面嵌入预期</p>
                  <p className="text-sm leading-7">{item.imageSpec.pagePlacementIntent}</p>
                  <p className="text-xs tracking-[0.18em] text-[color:var(--muted)]">{item.imageSpec.filenameExample}</p>
                </section>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Run the preview component test again**

Run:

```bash
npm run test -- src/components/solar-terms/illustration-preview-page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Commit the preview component**

Run:

```bash
git add src/components/solar-terms/illustration-preview-page.tsx src/components/solar-terms/illustration-preview-page.test.tsx
git commit -m "feat: add illustration preview component"
```

---

### Task 3: Add the `/illustration-preview` route and run final verification

**Files:**
- Create: `src/app/illustration-preview/page.test.tsx`
- Create: `src/app/illustration-preview/page.tsx`

- [ ] **Step 1: Write the failing route smoke test**

Create `src/app/illustration-preview/page.test.tsx` with this content:

```tsx
import { render, screen } from '@testing-library/react'
import IllustrationPreviewRoute from './page'

describe('illustration preview route', () => {
  it('renders the illustration preview page route', () => {
    render(<IllustrationPreviewRoute />)

    expect(screen.getByRole('heading', { name: '节气插画规格预览' })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run the route smoke test to verify it fails**

Run:

```bash
npm run test -- src/app/illustration-preview/page.test.tsx
```

Expected: FAIL with a module resolution error because `src/app/illustration-preview/page.tsx` does not exist yet.

- [ ] **Step 3: Implement the route wrapper**

Create `src/app/illustration-preview/page.tsx` with this content:

```tsx
import { IllustrationPreviewPage } from '@/components/solar-terms/illustration-preview-page'

export default function IllustrationPreviewRoute() {
  return <IllustrationPreviewPage />
}
```

- [ ] **Step 4: Run the route smoke test again**

Run:

```bash
npm run test -- src/app/illustration-preview/page.test.tsx
```

Expected: PASS.

- [ ] **Step 5: Run the changed-file test suite**

Run:

```bash
npm run test -- src/data/solar-terms.test.ts src/components/solar-terms/illustration-preview-page.test.tsx src/app/illustration-preview/page.test.tsx
```

Expected: PASS for all three test files.

- [ ] **Step 6: Run lint for the full repository**

Run:

```bash
npm run lint
```

Expected: PASS with no ESLint errors.

- [ ] **Step 7: Run the production build**

Run:

```bash
npm run build
```

Expected: PASS and Next.js builds successfully with the new route.

- [ ] **Step 8: Commit the route and verified implementation**

Run:

```bash
git add src/app/illustration-preview/page.tsx src/app/illustration-preview/page.test.tsx
git commit -m "feat: add illustration preview route"
```

---

## Self-Review Checklist

- Spec coverage: This plan covers the independent preview route, the three representative samples, the `imageBrief` / `imageSpec` split, global spec display, Safe Area rules, insertion target messaging, and leaves the homepage untouched.
- Placeholder scan: No `TODO`, `TBD`, or “similar to previous task” instructions remain.
- Type consistency: `SolarTermImageSpec`, `imageSpec`, `insertionTarget.component`, and `insertionTarget.slot` use the same names in tests, implementation, and route wiring.

---

Plan complete and saved to `docs/superpowers/plans/2026-03-30-solar-terms-illustration-preview-page.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
